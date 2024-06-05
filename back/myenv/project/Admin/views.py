from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404, render
from django.db.models import Q
from django.http import HttpResponse
from django.core.serializers import serialize
import smtplib 
from email.mime.text import MIMEText 
from email.mime.multipart import MIMEMultipart

from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import * 
from django.http import JsonResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction
from rest_framework import status
from django.utils import timezone
from datetime import datetime, time
from django.db import IntegrityError

import pandas as pd
from django.apps import apps

# import datetime 
import schedule

# export  pdf
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, landscape
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle


@api_view(['GET'])
def teacher_list(request):
    teachers = Enseignant.objects.all() #select * from enseignant
    serTeach = EnseignantSerializer(teachers, context = {'request' : request}, many=True)
    return Response(serTeach.data)


@api_view(['DELETE'])
def delete_enseignants(request, matricule): 
        if matricule:
            try:
                with transaction.atomic():
                    # Supprimer les lignes correspondantes dans la table 'enseigne'
                    Enseigne.objects.filter(Matric_id__in=matricule).delete()
                    # Supprimer les enseignants
                    Enseignant.objects.filter(Matricule__in=matricule).delete()
                return Response({'success': True, 'message': 'Les enseignants ont été supprimés avec succès.'})
            except Exception as e:
                return Response({'success': False, 'message': str(e)}, status=500)
        else:
            return Response({'success': False, 'message': 'Aucun matricule fourni.'}, status=400)

    

@api_view(['GET'])
def modules_list(request):
    modules = Module.objects.all() #select * from enseignant
    serModule = ModuleSerializer(modules, context = {'request' : request}, many=True)
    return Response(serModule.data)


@api_view(['DELETE'])
def delete_modules(request, code): 
    if request.method == 'DELETE':
        if code:
            try:
                with transaction.atomic():
                    # Supprimer les lignes enseigne
                    Enseigne.objects.filter(Codee_id=code).delete()  # Assuming Codee_id is the correct field name
                    # Supprimer les séances
                    Seance.objects.filter(Code_id=code).update(Code_id=None)  
                    # Supprimer le module
                    Module.objects.filter(Code=code).delete()
                return Response({'success': True, 'message': 'Le module a été supprimé avec succès.'})
            except Exception as e:
                return Response({'success': False, 'message': str(e)}, status=500)
        else:
            return Response({'success': False, 'heureessage': 'Aucun code fourni.'}, status=400)
    else:
        return Response({'success': False, 'deleteessage': 'delete-heureéthode non autorisée.'}, status=405)


        
@api_view(['GET'])
def salles_list(request):
    salles = Salle.objects.all()
    serSalles = SalleSerializer(salles, context={'request': request}, many=True)
    return Response(serSalles.data)

@api_view(['DELETE'])
def delete_salles(request, id_salle):
    if id_salle:
        try:
            with transaction.atomic():
                Seance.objects.filter(idSalle_id=id_salle).update(idSalle_id=None)  
                # Supprimer les salles
                Salle.objects.filter(IdSalle__in=id_salle).delete()
            return Response({'success': True, 'message': 'Les salles ont été supprimées avec succès.'})
        except Exception as e:
            return Response({'success': False, 'message': str(e)}, status=500)
    else:
        return Response({'success': False, 'message': 'Aucun identifiant de salle fourni.'}, status=400)


@api_view(['DELETE'])
def delete_groupes(request, ids_groupes):
   
    
    if ids_groupes:
        try:
            with transaction.atomic():
                
                Seance.objects.filter(idGroupe_id = ids_groupes).update(idGroupe_id=None)
                # Supprimer les groupes
                Groupe.objects.filter(idGroupe__in=ids_groupes).delete()
                
            return JsonResponse({'success': True, 'message': 'Les groupes et les séances associées ont été supprimés avec succès.'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=500)
    else:
        return JsonResponse({'success': False, 'message': 'Aucun identifiant de groupe fourni.'}, status=400)
    

@api_view(['DELETE'])
def deleteHeure(request, ids_Heures):
   
    
    if ids_Heures:
        try:
            with transaction.atomic():

              heure.objects.filter(idHeure = ids_Heures).delete()
            
            return JsonResponse({'success': True, 'message': 'Les groupes et les séances associées ont été supprimés avec succès.'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=500)
    else:
        return JsonResponse({'success': False, 'message': 'Aucun identifiant de groupe fourni.'}, status=400)
    
@api_view(['DELETE'])
def delete_seance(request, seance_id):
    try:
       with transaction.atomic():

        heure.objects.filter(idSeance_id=seance_id).delete()
        Seances.objects.filter(idSeance_id=seance_id).delete()
        Seance.objects.get(IdSeance=seance_id).delete()
        
       
        return Response({'success': True, 'message': 'La séance a été supprimée avec succès.'})
    except Seance.DoesNotExist:
        return Response({'success': False, 'message': 'La séance spécifiée n\'existe pas.'}, status=404)
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=500)
    




@api_view(['GET'])
def promotions_list(request):
    promotions = promotions.objects.all()
    serPromotions = PromotionSerializer(promotions, context={'request': request}, many=True)
    return Response(serPromotions.data)



def delete_promotion(request, nom_promo):
    try:
        with transaction.atomic():
            # Trouver toutes les sections référençant cette promotion
            sections_referencing_promo = section.objects.filter(nomP_id=nom_promo)

            # Supprimer tous les groupes associés à ces sections
            for section_ref in sections_referencing_promo:
                Groupe.objects.filter(idSection_id=section_ref.idSection).delete()

            # Ensuite, supprimer toutes les sections référençant cette promotion
            sections_referencing_promo.delete()

            # Ensuite, supprimer la promotion elle-même
            Promotion.objects.filter(NomPromo=nom_promo).delete()
            
            return JsonResponse({'success': True, 'message': 'La promotion a été supprimée avec succès.'})
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=500)
@api_view(['GET'])
def sections_list(request):
    sections = section.objects.all()
    serSections = SectionSerializer(sections, context={'request': request}, many=True)
    return Response(serSections.data)



@api_view(['DELETE'])
def delete_sections(request, section_id):
    try:
        with transaction.atomic():
            Seance.objects.filter(idSection_id = section_id ).update(idGroupe_id = None)
            Seance.objects.filter(idSection_id = section_id ).update(idSection_id = None)
            Specialite.objects.filter(idSection_id = section_id ).delete()
            Groupe.objects.filter(idSection_id=section_id).delete()
            section.objects.get(idSection = section_id ).delete()
            
        return Response({'success': True, 'message': 'La section a été supprimée avec succès.'})
    except Exception as e:
        return Response({'success': False, 'message': str(e)}, status=500)
   
    
    


    
@api_view(['GET'])
def specialites_list(request):
    specialites = Specialite.objects.all()
    serSpecialites =SpecialiteSerializer(specialites, context={'request': request}, many=True)
    return Response(serSpecialites.data)


@api_view(['DELETE'])

def delete_specialites(request, ids_specialites):
   
    if ids_specialites:
        try:
            with transaction.atomic():
                # Supprimer les spécialités
                SpecPromo.objects.filter(idSpecialite_id= ids_specialites).delete()
                Specialite.objects.get(idSpecialite = ids_specialites).delete()

               
            return Response({'success': True, 'message': 'Les spécialités ont été supprimées avec succès.'})
        except Exception as e:
            return Response({'success': False, 'message': str(e)}, status=500)
    else:
        return Response({'success': False, 'message': 'Aucun identifiant de spécialité fourni.'}, status=400)

@api_view(['GET'])
def groupes_list(request):
    groupes = Groupe.objects.all()
    serGroupes = GroupeSerializer(groupes, context={'request': request}, many=True)
    return Response(serGroupes.data)



@api_view(['GET'])
def teacher_detail(request, teacher_id):
    # Récupérer l'enseignant avec l'identifiant spécifié
    teacher = get_object_or_404(Enseignant, pk=teacher_id)
    # Sérialiser les données de l'enseignant
    serTeach = EnseignantSerializer(teacher)

    # Récupérer les données liées à l'enseignant
    enseignes = Enseigne.objects.filter(Matric_id=teacher_id)
    modules = Module.objects.filter(Code__in=enseignes.values_list('Codee_id', flat=True)).distinct()
    absences = Abcence.objects.filter(IdProf_id=teacher_id)
    # Sérialiser les données liées à l'enseignant
    serModules = ModuleSerializer(modules, many=True)
    serAbceences = AbcenceSerializer(absences, many=True)
    seances = Seance.objects.filter(Matricule_id = teacher_id)
    serSeances = SeanceSerializer(seances,many = True)   
    # Renvoyer les données sérialisées
    return Response({"teacher": serTeach.data, "modules": serModules.data, "absences": serAbceences.data,"seances":serSeances.data})

@api_view(['GET'])
def addSeance(request, teacher_id,semestre):
    # Récupérer l'enseignant avec l'identifiant spécifié
    teacher = get_object_or_404(Enseignant, pk=teacher_id)
    # Sérialiser les données de l'enseignant
    serTeach = EnseignantSerializer(teacher)
    enseignes = Enseigne.objects.filter(Matric_id=teacher_id)
    modules = Module.objects.filter(
    Q(Code__in=enseignes.values_list('Codee_id', flat=True)) & Q(Semestre=semestre)
).distinct()
    serModules = ModuleSerializer(modules, many=True)
    seanceType = Seance.mySeanceTypes
    seanceJours = Seance.myJours
    promos = Promotion.objects.all()
    serPromos = PromotionSerializer(promos, many=True)
    salles = Salle.objects.all()
    serSalles = SalleSerializer(salles, many=True)
    groupes = Groupe.objects.all()
    serGroupes = GroupeSerializer(groupes, many=True)

    sections = section.objects.all()
    serSections = SectionSerializer(sections, many=True)

    specialites = Specialite.objects.all()
    serSpecialites = SpecialiteSerializer(specialites, many=True)

    return Response({"teacher": serTeach.data, "modules": serModules.data,"seanceType":seanceType,
    "seanceJours":seanceJours,"promos":serPromos.data,"salles":serSalles.data,"specialites":serSpecialites.data,"sections":serSections.data,"groupes":serGroupes.data} )
   

@api_view(['DELETE'])
def deleteAbsence(request,teacher_id,abs_id):
    if request.method == 'DELETE':
        myAbs = get_object_or_404(Abcence, pk=abs_id)
        date = DateSeance.objects.get(date = myAbs.DateAbs)
        Seances.objects.filter(date_id = date.IddatteS).update(present = True)
        myAbs.delete()
        return Response({'success': True, 'message': 'L absence a été supprimée avec succès.'})


from datetime import datetime, time
from django.utils import timezone

@api_view(['POST', 'GET'])
def insertSeance(request, teacher_id, semestre):
    if request.method == 'POST':
        heure_debut = timezone.make_aware(datetime.combine(datetime.now().date(), time(8, 0)))
        heure_fin_limite = timezone.make_aware(datetime.combine(datetime.now().date(), time(17, 30)))

        serializer = SeanceSerializer(data=request.data)
        if serializer.is_valid():
            heure_debut_seance_str = serializer.validated_data['HeureDebut']
            if isinstance(heure_debut_seance_str, str):
                heure_debut_seance = timezone.make_aware(datetime.strptime(heure_debut_seance_str, "%H:%M:%S").time())
            else:
                heure_debut_seance = timezone.make_aware(datetime.combine(datetime.now().date(), heure_debut_seance_str))

            heure_fin_seance_str = serializer.validated_data['HeureFin']
            if isinstance(heure_fin_seance_str, str):
                heure_fin_seance = timezone.make_aware(datetime.strptime(heure_fin_seance_str, "%H:%M:%S").time())
            else:
                heure_fin_seance = timezone.make_aware(datetime.combine(datetime.now().date(), heure_fin_seance_str))

            # Vérification des heures de début et de fin
            error_messages = []
            if heure_debut_seance < heure_debut:
                error_messages.append("L'heure de début doit être après 8:00 AM.")
            if heure_fin_seance > heure_fin_limite:
                error_messages.append("L'heure de fin doit être avant 5:30 PM.")
            if heure_fin_seance <= heure_debut_seance:
                error_messages.append("L'heure de début doit être inférieure à l'heure de fin.")

            # Vérification des conflits de séances pour le même enseignant et semestre
            if error_messages:
                return Response({"error": ", ".join(error_messages)}, status=400)

            NouveauIdSalle = serializer.validated_data.get('idSalle')
            NouveauJour = serializer.validated_data.get('Jour')
            NouveauHRdeb = serializer.validated_data.get('HeureDebut')
            NouveauHRfin = serializer.validated_data.get('HeureFin')
            NouveauIdSection = serializer.validated_data.get('idSection')
            NouveauIdGroupe = serializer.validated_data.get('idGroupe')
            matr = teacher_id

            # Vérification de l'heure de début et de fin
            if NouveauHRdeb and NouveauHRdeb < time(8, 0):
                return Response({"error": "L'heure de début doit être à partir de 08:00 am."}, status=400)
            if NouveauHRfin and NouveauHRfin > time(17, 30):
                return Response({"error": "L'heure de fin doit être avant 17:30 pm."}, status=400)

            # Vérification des conflits de séances pour le même groupe
            if NouveauIdGroupe:
                seanGroup = Seance.objects.filter(idGroupe=NouveauIdGroupe, HeureDebut=NouveauHRdeb, HeureFin=NouveauHRfin, Jour=NouveauJour)
                if seanGroup:
                    return Response({"error": "Ce groupe a une séance à cette date."}, status=400)

            # Vérification des conflits de séances pour le même jour, heure de début et fin
            if NouveauJour and NouveauHRdeb and NouveauHRfin:
                seanSJour = Seance.objects.filter(Matricule=matr, Jour=NouveauJour, HeureDebut=NouveauHRdeb, HeureFin=NouveauHRfin)
                if seanSJour:
                    return Response({"error": "Impossible."}, status=400)

            # Vérification des conflits de réservation pour la salle
            if NouveauIdSalle is not None:
                seanSalle = Seance.objects.filter(idSalle=NouveauIdSalle, HeureDebut=NouveauHRdeb, HeureFin=NouveauHRfin, Jour=NouveauJour)
                if seanSalle:
                    return Response({"error": "Cette salle est déjà réservée pour une autre séance à ce moment. Veuillez choisir une autre salle pour cette séance."}, status=400)

            serializer.validated_data['Matricule_id'] = teacher_id
            serializer.validated_data['Semestre'] = semestre
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    elif request.method == 'GET':
        # Handle GET request if needed
        seances = Seance.objects.filter(Matricule_id=teacher_id, Semestre=semestre)
        serializer = SeanceSerializer(seances, many=True)
        return Response(serializer.data, status=200)
    else:
        return Response({"message": "Method not allowed"}, status=405)






@api_view(['POST'])
def insertSpecialite(request):
    if request.method == 'POST':
        serializer = SpecialiteSerializer(data=request.data)
        if serializer.is_valid():
            # Add the new choice to the list
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
   


# @api_view(['POST', 'GET'])
#   
# def insertEnseignant(request):
#     if request.method == 'POST':
#         serializer = EnseignantSerializer(data=request.data)
#         if serializer.is_valid():
#             teacher = serializer.save()
#             selected_modules_ids = request.data.get('modules', [])
#             teacher_id = teacher.Matricule  # Assuming Matricule is the primary key of the Enseignant model
#             for module_id in selected_modules_ids:
#                 try:
#                     module = Module.objects.get(Code=module_id)
#                     Enseigne.objects.create(Matric_id=teacher_id, Codee_id=module_id)
#                 except Module.DoesNotExist:
#                     print(f"Module with ID {module_id} does not exist.")
#                     return Response({"error": f"Module with ID {module_id} does not exist."}, status=400)
#                 except Exception as e:
#                     print(f"An error occurred while creating Enseigne: {e}")
#                     return Response({"error": f"An error occurred while creating Enseigne: {e}"}, status=500)
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)
#     elif request.method == 'GET':
#         # Handle GET request if needed
#         enseignants = Enseignant.objects.all()
#         serializer = EnseignantSerializer(enseignants, many=True)
#         return Response(serializer.data, status=200)
#     else:
#         return Response({"message": "Method not allowed"}, status=405)



@api_view(['POST', 'GET'])
def insertEnseignant(request):
    if request.method == 'POST':
        serializer = EnseignantSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('Email')
            
            # Vérification si l'email existe déjà dans la base de données
            if Enseignant.objects.filter(Email=email).exists():
                return Response({"error": f"L'email {email} est déjà utilisé."}, status=400)
            
            # Vérification si l'email se termine par '@esi-sba.dz'
            if not email.endswith('@esi-sba.dz'):
                return Response({"error": "L'email doit se terminer par '@esi-sba.dz'."}, status=400)
            
            # Insérer l'enseignant dans la base de données
            teacher = serializer.save()
            teacher_id = teacher.Matricule  # Assuming Matricule is the primary key of the Enseignant model
            
            selected_modules_ids = request.data.get('modules', [])
            for module_id in selected_modules_ids:
                try:
                    module = Module.objects.get(Code=module_id)
                    Enseigne.objects.create(Matric_id=teacher_id, Codee_id=module_id)
                except Module.DoesNotExist:
                    print(f"Module with ID {module_id} does not exist.")
                    return Response({"error": f"Module with ID {module_id} does not exist."}, status=400)
                except Exception as e:
                    print(f"An error occurred while creating Enseigne: {e}")
                    return Response({"error": f"An error occurred while creating Enseigne: {e}"}, status=500)
            
            # Récupérer le mot de passe depuis l'objet enseignant
            password = teacher.MotDePasse
            
            # Envoi du mot de passe par email
            try:
                send_password_email(email, password)
            except Exception as e:
                print(f"An error occurred while sending password email: {e}")
                # Gérer les erreurs d'envoi d'email ici
            
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    elif request.method == 'GET':
        # Handle GET request if needed
        enseignants = Enseignant.objects.all()
        serializer = EnseignantSerializer(enseignants, many=True)
        return Response(serializer.data, status=200)
    else:
        return Response({"message": "Method not allowed"}, status=405)

def send_password_email(receiver_email, password):
    sender_email = "EMAIL TA3KOUM TESTIW BIH "
    sender_password = "MDP TA3KOUM"
    
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = receiver_email
    message['Subject'] = "Votre mot de passe"

    body = f"Votre mot de passe est : {password}"
    message.attach(MIMEText(body, 'plain'))

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(sender_email, sender_password)
        text = message.as_string()
        server.sendmail(sender_email, receiver_email, text)







@api_view(['POST'])
def inscription(request):
    email = request.data.get('Email', None)
    mot_de_passe = request.data.get('MotDePasse', None)

    if email is None or mot_de_passe is None:
        return Response({'message': 'Veuillez fournir à la fois Email et MotDePasse.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Vérifie si un enseignant avec cet email existe déjà dans la base de données
        enseignant = Enseignant.objects.get(Email=email)
        
        # Vérifie si le mot de passe correspond
        if enseignant.MotDePasse != mot_de_passe:
            return Response({'message': 'Le mot de passe est incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
    except Enseignant.DoesNotExist:
        # Si aucun enseignant correspondant n'est trouvé, retourne une réponse d'erreur
        return Response({'message': 'L\'email fourni n\'existe pas.'}, status=status.HTTP_400_BAD_REQUEST)



    return Response({'message': 'Inscription réussie.'}, status=status.HTTP_201_CREATED)



@api_view(['POST'])
def inscription_ecole_administration(request):
    email = request.data.get('Email', None)
    mot_de_passe = request.data.get('mot_de_passe', None)  # Renommer le champ mot_de_passe

    if email is None or mot_de_passe is None:
        return Response({'message': 'Veuillez fournir à la fois Email et mot_de_passe.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Vérifie si un EcoleAdministration avec cet email existe déjà dans la base de données
        ecole_administration = EcoleAdministration.objects.get(Email=email)
        
        # Vérifie si le mot de passe correspond
        if ecole_administration.mot_de_passe != mot_de_passe:
            return Response({'message': 'Le mot de passe est incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
    except EcoleAdministration.DoesNotExist:
        # Si aucun EcoleAdministration correspondant n'est trouvé, retourne une réponse d'erreur
        return Response({'message': 'L\'email fourni n\'existe pas.'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'message': 'Inscription réussie.'}, status=status.HTTP_201_CREATED)



@api_view(['POST'])
def changer_mot_de_passe_enseignant(request):
    email = request.data.get('Email', None)
    mot_de_passe_actuel = request.data.get('MotDePasseActuel', None)
    nouveau_mot_de_passe = request.data.get('NouveauMotDePasse', None)

    if email is None or mot_de_passe_actuel is None or nouveau_mot_de_passe is None:
        return Response({'message': 'Veuillez fournir Email, MotDePasseActuel et NouveauMotDePasse.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Vérifie si un enseignant avec cet email existe déjà dans la base de données
        enseignant = Enseignant.objects.get(Email=email)
        
        # Vérifie si le mot de passe actuel correspond
        if enseignant.MotDePasse != mot_de_passe_actuel:
            return Response({'message': 'Le mot de passe actuel est incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Met à jour le mot de passe avec le nouveau mot de passe
        enseignant.MotDePasse = nouveau_mot_de_passe
        enseignant.save()

    except Enseignant.DoesNotExist:
        # Si aucun enseignant correspondant n'est trouvé, retourne une réponse d'erreur
        return Response({'message': 'L\'email fourni n\'existe pas.'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'message': 'Mot de passe changé avec succès.'}, status=status.HTTP_200_OK)




@api_view(['POST'])
def changer_mot_de_passe_ecole_administration(request):
    email = request.data.get('Email', None)
    mot_de_passe_actuel = request.data.get('MotDePasseActuel', None)
    nouveau_mot_de_passe = request.data.get('NouveauMotDePasse', None)

    if email is None or mot_de_passe_actuel is None or nouveau_mot_de_passe is None:
        return Response({'message': 'Veuillez fournir Email, MotDePasseActuel et NouveauMotDePasse.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Vérifie si un EcoleAdministration avec cet email existe déjà dans la base de données
        ecole_administration = EcoleAdministration.objects.get(Email=email)
        
        # Vérifie si le mot de passe actuel correspond
        if ecole_administration.mot_de_passe != mot_de_passe_actuel:
            return Response({'message': 'Le mot de passe actuel est incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Met à jour le mot de passe avec le nouveau mot de passe
        ecole_administration.mot_de_passe = nouveau_mot_de_passe
        ecole_administration.save()

    except EcoleAdministration.DoesNotExist:
        # Si aucun EcoleAdministration correspondant n'est trouvé, retourne une réponse d'erreur
        return Response({'message': 'L\'email fourni n\'existe pas.'}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'message': 'Mot de passe changé avec succès.'}, status=status.HTTP_200_OK)



@api_view(['POST', 'GET'])
def insert_ecole_administration(request):
    if request.method == 'POST':
        serializer = EcoleAdministrationSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('Email')
            
            # Vérification si l'email existe déjà dans la base de données
            if EcoleAdministration.objects.filter(Email=email).exists():
                return Response({"error": f"L'email {email} est déjà utilisé."}, status=400)
            
            # Insérer l'école d'administration dans la base de données
            ecole_administration = serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        # Handle GET request if needed
        ecole_administrations = EcoleAdministration.objects.all()
        serializer = EcoleAdministrationSerializer(ecole_administrations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Méthode non autorisée"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)




@api_view(['DELETE'])
def delete_ecole_administration(request, matricule):
    try:
        ecole_administration = EcoleAdministration.objects.get(matricule=matricule)
    except EcoleAdministration.DoesNotExist:
        return Response({"error": f"L'école d'administration avec le matricule {matricule} n'existe pas."}, status=status.HTTP_404_NOT_FOUND)

    ecole_administration.delete()
    return Response({"message": f"L'école d'administration avec le matricule {matricule} a été supprimée."}, status=status.HTTP_204_NO_CONTENT)


@api_view(['PUT'])
def update_ecole_administration(request, matricule):
    try:
        ecole_administration = EcoleAdministration.objects.get(matricule=matricule)
    except EcoleAdministration.DoesNotExist:
        return Response({"error": f"L'école d'administration avec le matricule {matricule} n'existe pas."}, status=status.HTTP_404_NOT_FOUND)

    # Récupérer les données envoyées dans la requête
    data = request.data

    # Mettre à jour les champs spécifiés dans les données
    serializer = EcoleAdministrationSerializer(ecole_administration, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST','GET'])
  
def insertAbs(request, teacher_id):
    if request.method == 'POST':
        serializer = AbcenceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['IdProf_id'] = teacher_id
            date = DateSeance.objects.get(date = request.data.get('DateAbs'))
            Seances.objects.filter(date_id = date.IddatteS).update(present = False)
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    elif request.method == 'GET':
        # Handle GET request if needed
        absences = Abcence.objects.filter(IdProf_id=teacher_id)
        serializer = AbcenceSerializer(absences, many=True)
        return Response(serializer.data, status=200)
    else:
        return Response({"message": "Method not allowed"}, status=405)
    
@api_view(['POST'])
  
def insertSection(request,idPromo):
    if request.method == 'POST':
        serializer = SectionSerializer(data=request.data)
        if serializer.is_valid():
            # Add the new choice to the list
            serializer.validated_data['nomP_id'] = idPromo
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    


@api_view(['POST'])
def insertHeure(request,idSeance):
    if request.method == 'POST':
        serializer = HeureSerializer(data=request.data)
        if serializer.is_valid():
            # Add the new choice to the list
            serializer.validated_data['idSeance_id'] = idSeance
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
@api_view(['POST'])
  
def insertGroupe(request,idSection):
    if request.method == 'POST':
        serializer = GroupeSerializer(data=request.data)
        if serializer.is_valid():
            # Add the new choice to the list
            serializer.validated_data['idSection_id'] = idSection
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    

@api_view(['PUT'])
  
def updateHeure(request, idHeure):
    try:
        Heure = heure.objects.get(pk=idHeure)
    except heure.DoesNotExist:
        return Response({"error": "Heure non trouvée"}, status=404)

    if request.method == 'PUT':
        serializer = HeureSerializer(Heure, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)


@api_view(['PUT'])
  
def updateGroupe(request, idGroupe):
    if request.method == 'PUT':
        try:
            groupe = Groupe.objects.get(pk=idGroupe)
        except Groupe.DoesNotExist:
            return Response({"error": "Groupe not found"}, status=404)

        serializer = GroupeSerializer(groupe, data=request.data)
        if serializer.is_valid():
            serializer.save()  # Ceci sauvegarde les modifications dans le modèle Groupe
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

@api_view(['PUT'])
  
def updateSpecialite(request, idSpecialite):
    try:
        specialite = Specialite.objects.get(idSpecialite=idSpecialite)
    except Specialite.DoesNotExist:
        return Response({"error": "La spécialité spécifiée n'existe pas."}, status=404)

    if request.method == 'PUT':
        serializer = SpecialiteSerializer(specialite, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

@api_view(['PUT'])
  
def updateSection(request, idSection):
    try:
        Section = section.objects.get(idSection=idSection)
    except section.DoesNotExist:
        return Response({"error": "La section spécifiée n'existe pas."}, status=404)

    if request.method == 'PUT':
        serializer = SectionSerializer(Section, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    



from datetime import datetime, timedelta


@api_view(['PUT'])
def updateEnseignant(request, matricule):
    try:
        enseignant = Enseignant.objects.get(Matricule=matricule)
    except Enseignant.DoesNotExist:
        return Response({"error": "L'enseignant spécifié n'existe pas."}, status=404)

    if request.method == 'PUT':
        serializer = EnseignantSerializer(enseignant, data=request.data, partial=True)
        if serializer.is_valid():
            # Vérifier si le champ Email est modifié et s'il se termine par "esi-sba.dz"
            if 'Email' in serializer.validated_data:
                email = serializer.validated_data['Email']
                if not email.endswith('esi-sba.dz'):
                    return Response({"error": "L'email doit se terminer par 'esi-sba.dz'."}, status=400)

            # Vérifier si le champ NumeroTelephone est modifié et s'il contient uniquement des chiffres et respecte le format requis
            if 'NumeroTelephone' in serializer.validated_data:
                numero_telephone = serializer.validated_data['NumeroTelephone']
                if not numero_telephone.isdigit() or len(numero_telephone) != 10 or not numero_telephone.startswith(('05', '06', '07')):
                    return Response({"error": "Le numéro de téléphone doit contenir exactement 10 chiffres et commencer par '05', '06' ou '07'."}, status=400)

            # Vérifier si le champ DateNaissance est modifié et s'il est inférieur à 25 ans
            if 'DateNaissance' in serializer.validated_data:
                date_naissance = serializer.validated_data['DateNaissance']
                # Convertir la date de naissance en objet datetime
                date_naissance = datetime.combine(date_naissance, datetime.min.time())
                age_minimum = datetime.now() - timedelta(days=25*365)  # calculer la date il y a 25 ans
                if date_naissance > age_minimum:
                    return Response({"error": "L'enseignant doit avoir au moins 25 ans."}, status=400)

            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)


@api_view(['PUT'])
  
def updateAbsence(request, idAbs):
    try:
        absence = Abcence.objects.get(IdAbs=idAbs)
    except Abcence.DoesNotExist:
        return Response({"error": "L'absence spécifiée n'existe pas."}, status=404)

    if request.method == 'PUT':
        serializer = AbcenceSerializer(absence, data=request.data)
        if serializer.is_valid():
            heure_debut = serializer.validated_data.get('HeureDebut')
            heure_fin = serializer.validated_data.get('HeureFin')

            # Vérification de l'heure de début et de fin
            if heure_debut and heure_debut < time(8, 0):
                return Response({"error": "L'heure de début doit être a partir du  08:00 am."}, status=400)
            if heure_fin and heure_fin > time(17, 30):
                return Response({"error": "L'heure de fin doit être avant 17:30 pm."}, status=400)
            if heure_fin <= heure_debut:
                return Response({"error": "L'heure de debut doit etre inferieur au heure fin "}, status=400)
            try:
                serializer.save()
                return Response(serializer.data, status=200)
            except IntegrityError:
                return Response({"error": "Erreur lors de la sauvegarde des données."}, status=400)
        return Response(serializer.errors, status=400)

@api_view(['PUT'])
  
def updateSalle(request, id_salle):
    try:
        salle = Salle.objects.get(IdSalle=id_salle)
    except Salle.DoesNotExist:
        return Response({"error": "La salle spécifiée n'existe pas."}, status=404)

    if request.method == 'PUT':
        serializer = SalleSerializer(salle, data=request.data, partial=True)
        if serializer.is_valid():
            new_nom_salle = serializer.validated_data.get('NomSalle', salle.NomSalle)
            new_zone_salle = serializer.validated_data.get('Zone', salle.Zone)
            
            # Vérifier si une autre salle avec le même nom existe déjà dans la même zone
            if new_nom_salle != salle.NomSalle:  # Vérifier si le nom de la salle a été modifié
                if Salle.objects.exclude(IdSalle=id_salle).filter(NomSalle=new_nom_salle, Zone=new_zone_salle).exists():
                    return Response({"error": "Une salle avec le même nom existe déjà dans la même zone."}, status=400)

            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

        return Response(serializer.errors, status=400)


@api_view(['PUT'])
  
def updateModule(request, code):
    try:
        module = Module.objects.get(Code=code)
    except Module.DoesNotExist:
        return Response({"error": "Le module spécifié n'existe pas."}, status=404)

    if request.method == 'PUT':
        serializer = ModuleSerializer(module, data=request.data, partial=True)
        if serializer.is_valid():
            new_nom_module = serializer.validated_data.get('NomModule')
            # Vérifier si le nom du module est déjà utilisé par un autre module
            if new_nom_module and Module.objects.exclude(Code=code).filter(NomModule=new_nom_module).exists():
                return Response({"error": "Ce nom de module est déjà utilisé par un autre module."}, status=400)
            
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)





@api_view(['PUT'])
  
def updateSeance(request, idSeance):
    try:
        seance = Seance.objects.get(IdSeance=idSeance)
    except Seance.DoesNotExist:
        return Response({"error": "La séance spécifiée n'existe pas."}, status=404)

    if request.method == 'PUT':
        serializer = SeanceSerializer(seance, data=request.data, partial=True)
        if serializer.is_valid():
            NouveauIdSalle = serializer.validated_data.get('idSalle')
            NouveauJour= serializer.validated_data.get('Jour')
            NouveauHRdeb = serializer.validated_data.get('HeureDebut')
            NouveauHRfin= serializer.validated_data.get('HeureFin')
            NouveauIdSection= serializer.validated_data.get('idSection')
            NouveauIdGroupe= serializer.validated_data.get('idGroupe')
            matr = seance.Matricule
          # Vérification de l'heure de début et de fin
            if NouveauHRdeb and NouveauHRdeb < time(8, 0):
                return Response({"error": "L'heure de début doit être à partir de 08:00 am."}, status=400)
            if NouveauHRfin and NouveauHRfin > time(17, 30):
                return Response({"error": "L'heure de fin doit être avant 17:30 pm."}, status=400)
            # if NouveauHRdeb and NouveauHRfin and NouveauHRfin <= NouveauHRdeb:
            #     return Response({"error": "L'heure de début doit être antérieure à l'heure de fin."}, status=400)
            if NouveauIdGroupe :
                heure_debut = seance.HeureDebut
                heure_fin =seance.HeureFin
                jour = seance.Jour
                seanGroup = Seance.objects.filter(IdGroupe = NouveauIdGroupe,HeureDebut =heure_debut ,HeureFin = heure_fin ,Jour = jour)
                if seanGroup :
                    return Response({"error": "Ce groupe a une seanca cette datte ."}, status=400)
                
            if NouveauJour and NouveauHRdeb and NouveauHRfin :
                seanSJour = Seance.objects.filter(Matricule=matr,Jour = NouveauJour ,HeureDebut =NouveauHRdeb ,HeureFin = NouveauHRfin)
                if seanSJour :
                    return Response({"error": "impossible."}, status=400)
            if NouveauIdSalle != None :
                heure_debut = seance.HeureDebut
                heure_fin =seance.HeureFin
                jour = seance.Jour
                seanSalle = Seance.objects.filter(idSalle=NouveauIdSalle,HeureDebut =heure_debut ,HeureFin = heure_fin ,Jour = jour )
                if seanSalle :
                    return Response({"error": "Cette salle est déjà réservée pour une autre séance à ce moment. Veuillez choisir une autre salle pour cette séance."}, status=400)
                

            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)





# from datetime import datetime
# from django.utils.translation import gettext as _
# import schedule
# import time 
# def translate_day_to_french(day):
#     if day.lower() == "monday":
#         return _("Lundi")
#     elif day.lower() == "tuesday":
#         return _("Mardi")
#     elif day.lower() == "wednesday":
#         return _("Mercredi")
#     elif day.lower() == "thursday":
#         return _("Jeudi")
#     elif day.lower() == "friday":
#         return _("Vendredi")
#     elif day.lower() == "saturday":
#         return _("Samedi")
#     elif day.lower() == "sunday":
#         return _("Dimanche")
#     else:
#         return None  # Handle error or return None if day is not recognized


# def createDate():
#     now = datetime.now()
#     today = translate_day_to_french(now.strftime("%A"))

#     if not today:
#         print("Day translation not found.")
#         return

#     if not DateSeance.objects.filter(date=now.date()).exists():
#         DateSeance.objects.create(date=now.date())

#     seances = Seance.objects.filter(Jour__iexact=today)
#     dateId = DateSeance.objects.get(date=now.date())

#     for seance in seances:
#         Seances.objects.create(date=dateId, idSeance=seance, present=True)

# current_time = datetime.now()
# target_time = datetime.strptime("01:00:00", "%H:%M:%S")


# schedule.every().day.at("20:48").do(createDate)







# from datetime import datetime
# from django.utils.translation import gettext as _
# import schedule
# import time 
# def translate_day_to_french(day):
#     if day.lower() == "monday":
#         return _("Lundi")
#     elif day.lower() == "tuesday":
#         return _("Mardi")
#     elif day.lower() == "wednesday":
#         return _("Mercredi")
#     elif day.lower() == "thursday":
#         return _("Jeudi")
#     elif day.lower() == "friday":
#         return _("Vendredi")
#     elif day.lower() == "saturday":
#         return _("Samedi")
#     elif day.lower() == "sunday":
#         return _("Dimanche")
#     else:
#         return None  # Handle error or return None if day is not recognized

# from celery.schedules import crontab
# from celery.task import periodic_task

# @periodic_task(run_every=crontab(hour=7, minute=30))
# def createDate():
#     now = datetime.now()
#     today = translate_day_to_french(now.strftime("%A"))

#     if not today:
#         print("Day translation not found.")
#         return

#     if not DateSeance.objects.filter(date=now.date()).exists():
#         DateSeance.objects.create(date=now.date())

#     seances = Seance.objects.filter(Jour__iexact=today)
#     dateId = DateSeance.objects.get(date=now.date())

#     for seance in seances:
#         Seances.objects.create(date=dateId, idSeance=seance, present=True)






@api_view(['GET'])
def calculerHeuresSup(request,matricule,nbrHeuresCharge,TauxCours,TauxTd,TauxTp):
        nbrHeuresCharge = float(nbrHeuresCharge)
        TauxCours = float(TauxCours)
        TauxTd = float(TauxTd)
        TauxTp = float(TauxTp)
        teacher = Enseignant.objects.get(Matricule = matricule)
  
        seancesCours = Seance.objects.filter(Matricule_id = teacher.Matricule,Type= 'Cours')
        seancesTd = Seance.objects.filter(Matricule_id = teacher.Matricule,Type= 'Td')
        seancesTp = Seance.objects.filter(Matricule_id = teacher.Matricule,Type= 'Tp')
        nbrHeuresCours = 0
        nbrHeuresTd = 0
        nbrHeuresTp = 0

        for seance in seancesCours:

            difference = (datetime.combine(datetime.min, seance.HeureFin) - datetime.combine(datetime.min, seance.HeureDebut)).total_seconds() / 3600
            nbrHeuresCours += difference


        for seance in seancesTd:

            difference = (datetime.combine(datetime.min, seance.HeureFin) - datetime.combine(datetime.min, seance.HeureDebut)).total_seconds() / 3600
            nbrHeuresTd += difference


        for seance in seancesTp:

            difference = (datetime.combine(datetime.min, seance.HeureFin) - datetime.combine(datetime.min, seance.HeureDebut)).total_seconds() / 3600
            nbrHeuresTp += difference


        transNbrHeuresCours = nbrHeuresCours * TauxCours
        transNbrHeuresTD = nbrHeuresTd * TauxTd
        transNbrHeuresTp = nbrHeuresTp *TauxTp
        nbrHeuresSup = 0
        calculCharge = 0
        calculCharge += transNbrHeuresCours
        if calculCharge >= nbrHeuresCharge :
            nbrHeuresSupCours = (transNbrHeuresCours - nbrHeuresCharge)/TauxCours
            nbrHeuresSup += nbrHeuresSupCours + nbrHeuresTd + nbrHeuresTp
        else :
            nbrChargeRest = nbrHeuresCharge - calculCharge
            calculCharge += transNbrHeuresTD
            if calculCharge >= nbrHeuresCharge :
                nbrHeuresSupTd = (transNbrHeuresTD - nbrChargeRest)/TauxTd
                nbrHeuresSup += nbrHeuresSupTd + nbrHeuresTp
            else :
                nbrChargeRest = nbrHeuresCharge - calculCharge
                calculCharge += transNbrHeuresTp
                nbrHeuresSupTp = (transNbrHeuresTp - nbrChargeRest)/TauxTp
                if calculCharge <= nbrHeuresCharge :
                    nbrHeuresSup = 0
                else :
                    nbrHeuresSup += nbrHeuresSupTp


        return Response({'R-Sup':nbrHeuresSup})

# @api_view(['GET'])
# def calculerHeuresSup(request,nbrHeuresCharge,TauxCours,TauxTd,TauxTp):
#     nbrHeuresCharge = float(nbrHeuresCharge)
#     TauxCours = float(TauxCours)
#     TauxTd = float(TauxTd)
#     TauxTp = float(TauxTp)
#     Teachers = Enseignant.objects.all()
  
#     for teacher in Teachers :
       
#         seancesCours = Seance.objects.filter(Matricule_id = teacher.Matricule,Type= 'Cours')
#         seancesTd = Seance.objects.filter(Matricule_id = teacher.Matricule,Type= 'Td')
#         seancesTp = Seance.objects.filter(Matricule_id = teacher.Matricule,Type= 'Tp')
#         nbrHeuresCours = 0
#         nbrHeuresTd = 0
#         nbrHeuresTp = 0

#         for seance in seancesCours:

#             difference = (datetime.combine(datetime.min, seance.HeureFin) - datetime.combine(datetime.min, seance.HeureDebut)).total_seconds() / 3600
#             nbrHeuresCours += difference


#         for seance in seancesTd:

#             difference = (datetime.combine(datetime.min, seance.HeureFin) - datetime.combine(datetime.min, seance.HeureDebut)).total_seconds() / 3600
#             nbrHeuresTd += difference


#         for seance in seancesTp:

#             difference = (datetime.combine(datetime.min, seance.HeureFin) - datetime.combine(datetime.min, seance.HeureDebut)).total_seconds() / 3600
#             nbrHeuresTp += difference


#         transNbrHeuresCours = nbrHeuresCours * TauxCours
#         transNbrHeuresTD = nbrHeuresTd * TauxTd
#         transNbrHeuresTp = nbrHeuresTp *TauxTp
#         nbrHeuresSup = 0
#         calculCharge = 0
#         calculCharge += transNbrHeuresCours
#         if calculCharge >= nbrHeuresCharge :
#             nbrHeuresSupCours = (transNbrHeuresCours - nbrHeuresCharge)/TauxCours
#             nbrHeuresSup += nbrHeuresSupCours + nbrHeuresTd + nbrHeuresTp
#         else :
#             nbrChargeRest = nbrHeuresCharge - calculCharge
#             calculCharge += transNbrHeuresTD
#             if calculCharge >= nbrHeuresCharge :
#                 nbrHeuresSupTd = (transNbrHeuresTD - nbrChargeRest)/TauxTd
#                 nbrHeuresSup += nbrHeuresSupTd + nbrHeuresTp
#             else :
#                 nbrChargeRest = nbrHeuresCharge - calculCharge
#                 calculCharge += transNbrHeuresTp
#                 nbrHeuresSupTp = (transNbrHeuresTp - nbrChargeRest)/TauxTp
#                 if calculCharge <= nbrHeuresCharge :
#                     nbrHeuresSup = 0
#                 else :
#                     nbrHeuresSup += nbrHeuresSupTp


#         return Response({'R-Sup':nbrHeuresSup})
    

@api_view(['POST'])
def attribuer_Module_Ens(request):
    if request.method == 'POST':
        serializer = EnseigneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def exporter_donnees_excel(request):
    # Récupérer tous les modèles de l'application Django
    models = apps.get_models()

    # Créer un fichier Excel en mémoire
    excel_file = pd.ExcelWriter('archivageDesDonnees.xlsx', engine='xlsxwriter')

    # Parcourir tous les modèles
    for model in models:
        # Récupérer toutes les données du modèle
        donnees = model.objects.all()
        
        # Créer un DataFrame pandas pour les données du modèle
        df = pd.DataFrame(list(donnees.values()))
        
        # Écrire les données dans une feuille Excel portant le nom du modèle
        df.to_excel(excel_file, sheet_name=model.__name__, index=False)

    # Fermer le fichier Excel
    excel_file.close()

    # Créer une réponse HTTP pour télécharger le fichier Excel
    response = HttpResponse(open('archivageDesDonnees.xlsx', 'rb'), content_type='application/vnd.ms-excel')
    response['Content-Disposition'] = 'attachment; filename="archivageDesDonnees.xlsx"'

    return response






def export_enseignants_pdf(request):
    enseignants = Enseignant.objects.all()

    # Création du document PDF avec une taille de page personnalisée
    custom_page_size = (900, 1200)  # Ajustez la taille selon vos besoins
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="enseignants.pdf"'
    doc = SimpleDocTemplate(response, pagesize=custom_page_size)
    elements = []

    # Données à inclure dans le PDF
    data = [['Matricule', 'Nom', 'Prénom', 'Date de Naissance', 'Adresse', 'Email', 'Numéro de Téléphone', 'Fonction', 'Grade', 'Etablissement']]

    for enseignant in enseignants:
        data.append([
            enseignant.Matricule,
            enseignant.Nom,
            enseignant.Prénom,
            str(enseignant.DateNaissance),
            enseignant.Adresse,
            enseignant.Email,
            enseignant.NumeroTelephone,
            enseignant.Fonction,
            enseignant.Grade,
            enseignant.Etablissement,
        ])

    # Création de la table
    table = Table(data)

    # Style de la table
    style = TableStyle([('BACKGROUND', (0,0), (-1,0), colors.grey),
                        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
                        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
                        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
                        ('BOTTOMPADDING', (0,0), (-1,0), 12),
                        ('BACKGROUND', (0,1), (-1,-1), colors.beige),
                        ('GRID', (0,0), (-1,-1), 1, colors.black)])

    table.setStyle(style)

    # Ajouter la table au document
    elements.append(table)
    doc.build(elements)
    return response





def export_groupes_pdf(request):
    groupes = Groupe.objects.all()

    # Création du document PDF en mode paysage
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="groupes.pdf"'
    doc = SimpleDocTemplate(response, pagesize=landscape(letter))
    elements = []

    # Données à inclure dans le PDF
    data = [['ID Groupe', 'Numéro', 'Spécialité', 'ID Section']]

    for groupe in groupes:
        data.append([
            groupe.idGroupe,
            groupe.Numero,
            groupe.Specialite,
            groupe.idSection_id,
        ])

    # Création de la table
    table = Table(data)

    # Style de la table
    style = TableStyle([('BACKGROUND', (0,0), (-1,0), colors.grey),
                        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
                        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
                        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
                        ('BOTTOMPADDING', (0,0), (-1,0), 12),
                        ('BACKGROUND', (0,1), (-1,-1), colors.beige),
                        ('GRID', (0,0), (-1,-1), 1, colors.black)])

    table.setStyle(style)

    # Ajouter la table au document
    elements.append(table)
    doc.build(elements)
    return response



def export_specialites_pdf(request):
    specialites = Specialite.objects.all()

    # Création du document PDF en mode paysage
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="specialites.pdf"'
    doc = SimpleDocTemplate(response, pagesize=landscape(letter))
    elements = []

    # Données à inclure dans le PDF
    data = [['ID Spécialité', 'Nom Spécialité']]

    for specialite in specialites:
        data.append([
            specialite.idSpecialite,
            specialite.NomSpecialite,
        ])

    # Création de la table
    table = Table(data)

    # Style de la table
    style = TableStyle([('BACKGROUND', (0,0), (-1,0), colors.grey),
                        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
                        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
                        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
                        ('BOTTOMPADDING', (0,0), (-1,0), 12),
                        ('BACKGROUND', (0,1), (-1,-1), colors.beige),
                        ('GRID', (0,0), (-1,-1), 1, colors.black)])

    table.setStyle(style)

    # Ajouter la table au document
    elements.append(table)
    doc.build(elements)
    return response



def export_modules_pdf(request):
    modules = Module.objects.all()

    # Création du document PDF en mode paysage
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="modules.pdf"'
    doc = SimpleDocTemplate(response, pagesize=landscape(letter))
    elements = []

    # Données à inclure dans le PDF
    data = [['Code', 'Nom du Module', 'Coefficient', 'Nombre d\'heures', 'Semestre', 'ID Promotion']]

    for module in modules:
        data.append([
            module.Code,
            module.NomModule,
            module.Coefficient,
            module.NbrHeures,
            module.Semestre,
            module.nomP_id,
        ])

    # Création de la table
    table = Table(data)

    # Style de la table
    style = TableStyle([('BACKGROUND', (0,0), (-1,0), colors.grey),
                        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
                        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
                        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
                        ('BOTTOMPADDING', (0,0), (-1,0), 12),
                        ('BACKGROUND', (0,1), (-1,-1), colors.beige),
                        ('GRID', (0,0), (-1,-1), 1, colors.black)])

    table.setStyle(style)

    # Ajouter la table au document
    elements.append(table)
    doc.build(elements)
    return response


def export_absences_pdf(request):
    absences = Abcence.objects.all()

    # Création du document PDF en mode paysage
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="absences.pdf"'
    doc = SimpleDocTemplate(response, pagesize=landscape(letter))
    elements = []

    # Données à inclure dans le PDF
    data = [['ID Absence', 'Date Absence', 'Heure Début', 'Heure Fin', 'Motif', 'ID Prof']]

    for absence in absences:
        data.append([
            absence.IdAbs,
            absence.DateAbs,
            absence.HeureDebut,
            absence.HeureFin,
            absence.Motif,
            absence.IdProf_id,
        ])

    # Création de la table
    table = Table(data)

    # Style de la table
    style = TableStyle([('BACKGROUND', (0,0), (-1,0), colors.grey),
                        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
                        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
                        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
                        ('BOTTOMPADDING', (0,0), (-1,0), 12),
                        ('BACKGROUND', (0,1), (-1,-1), colors.beige),
                        ('GRID', (0,0), (-1,-1), 1, colors.black)])

    table.setStyle(style)

    # Ajouter la table au document
    elements.append(table)
    doc.build(elements)
    return response



def export_sections_pdf(request):
    Sections = section.objects.all()

    # Création du document PDF en mode paysage
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="sections.pdf"'
    doc = SimpleDocTemplate(response, pagesize=landscape(letter))
    elements = []

    # Données à inclure dans le PDF
    data = [['ID Section', 'Nom de la Section', 'ID Promotion']]

    for Section in Sections:
        data.append([
            Section.idSection,
            Section.NomSection,
            Section.nomP_id,
        ])

    # Création de la table
    table = Table(data)

    # Style de la table
    style = TableStyle([('BACKGROUND', (0,0), (-1,0), colors.grey),
                        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
                        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
                        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
                        ('BOTTOMPADDING', (0,0), (-1,0), 12),
                        ('BACKGROUND', (0,1), (-1,-1), colors.beige),
                        ('GRID', (0,0), (-1,-1), 1, colors.black)])

    table.setStyle(style)

    # Ajouter la table au document
    elements.append(table)
    doc.build(elements)
    return response



def export_seances_pdf(request):
    seances = Seance.objects.all()

    # Création du document PDF en mode paysage
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="seances.pdf"'
    doc = SimpleDocTemplate(response, pagesize=landscape(letter))
    elements = []

    # Données à inclure dans le PDF
    data = [['ID Séance', 'Nom de la Séance', 'Type', 'Jour', 'Heure Début', 'Heure Fin', 'Semestre', 'Code', 'Matricule', 'ID Groupe', 'ID Promotion', 'ID Salle', 'ID Section']]

    for seance in seances:
        data.append([
            seance.IdSeance,
            seance.NomS,
            seance.Type,
            seance.Jour,
            seance.HeureDebut,
            seance.HeureFin,
            seance.Semestre,
            seance.Code_id,
            seance.Matricule_id,
            seance.idGroupe_id,
            seance.idPromo_id,
            seance.idSalle_id,
            seance.idSection_id,
        ])

    # Création de la table
    table = Table(data)

    # Style de la table
    style = TableStyle([('BACKGROUND', (0,0), (-1,0), colors.grey),
                        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
                        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
                        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
                        ('BOTTOMPADDING', (0,0), (-1,0), 12),
                        ('BACKGROUND', (0,1), (-1,-1), colors.beige),
                        ('GRID', (0,0), (-1,-1), 1, colors.black)])

    table.setStyle(style)

    # Ajouter la table au document
    elements.append(table)
    doc.build(elements)
    return response

@api_view(['GET'])
def calculer_montant(request,debut_semestre,fin_semestre,PU_MAB,PU_MAA,PU_MCB,PU_MCA,PU_Professeur,per_securite_social,per_irg):
     per_securite_soc = float(per_securite_social)
     per_IRG = float(per_irg)
     
     def calculerMontant(teacher,rsup,Pu,per_securite_sociale,per_IRG):
         montant = rsup * Pu
         securite_sociale = montant * (per_securite_sociale/100)
         IRG = montant * (per_IRG/100)
         montant_debite = securite_sociale + IRG
         montant_net = montant - montant_debite
         debut_year = debut_semestre.year
         fin_year = fin_semestre.year
         infos = [("montant",montant),("securite_sociale",securite_sociale),("IRG",IRG),("montant debite",montant_debite),("montant net",montant_net)]
         periode = f"du {debut_semestre} au {fin_semestre}"
     # Test if debut_semestre year differs from fin_semestre year
         if debut_year != fin_year:
             semestre = 'S1'
         else:
             semestre = 'S2'
         if debut_year != fin_year:
             anneuniversitaire = f"{debut_year}/{fin_year}"
         else:
             anneuniversitaire = f"{debut_year}/{debut_year - 1}"

         montant_instance = Montant.objects.create(
             montant_total=montant,
             anneeUniversiatire = anneuniversitaire,
             semestre=semestre,
             matricule= teacher,  
             prix_unitaire =Pu,
             nombre_des_heures =rsup,
             securite_sociale=per_securite_sociale,
             irg =per_IRG,
             montant_debite =montant_debite,
             montant_net =montant_net,
             periode = periode,
         )
         return infos
     Teachers = Enseignant.objects.all()
     PUMAB = float(PU_MAB)
     PUMAA = float(PU_MAA)
     PUMCB = float(PU_MCB)
     PUMCA = float(PU_MCA)
     PUProfesseur = float(PU_Professeur)
     for teacher in Teachers:
         # Récupérer les séances de l'enseignant pour le mois en cours
         emploi_enseignant = Seance.objects.filter(Matricule_id= teacher.Matricule)

         # Récupérer les heures supplémentaires pour les séances de l'enseignant
         seances_rsup = heure.objects.filter(defType='HeuresSup', idSeance_id__in=emploi_enseignant.values_list('IdSeance', flat=True))

         # Récupérer les présences aux séances des heures supplémentaires
         seances_rsup_presents = Seances.objects.filter(idSeance_id__in=seances_rsup.values_list('idSeance_id', flat=True), present=True )
         rsup_monthly = {}
         debut_semestre = datetime.strptime(debut_semestre, '%Y-%m-%d')
         fin_semestre = datetime.strptime(fin_semestre, '%Y-%m-%d')
         duree_semestre = (fin_semestre.year - debut_semestre.year) * 12 + fin_semestre.month - debut_semestre.month + 1

         seances_par_semestre = DateSeance.objects.filter(IddatteS__in=seances_rsup_presents.values_list('date_id', flat=True), date__range=[debut_semestre, fin_semestre])
         rsup_semestre = 0
         for mois in range(debut_semestre.month, debut_semestre.month + duree_semestre):
             rsup = 0
             if mois > 12:
                 mois = mois % 12
             seances_par_mois = seances_par_semestre.filter(date__month=mois)
             id_seances_par_mois = Seances.objects.filter(date_id__in = seances_par_mois.values_list('IddatteS', flat=True))
             for seance in id_seances_par_mois:
                 hours= heure.objects.filter(defType='HeuresSup',idSeance_id = seance.idSeance_id)
                 for hour in hours:
                     rsup += hour.duree.total_seconds() / 3600  # Convert timedelta to hours
       
             rsup_monthly[mois] = rsup
             rsup_semestre += rsup
        
         if teacher.Grade == 'LectureA' :
             calculerMontant(teacher,rsup_semestre,PUMAA,per_securite_soc,per_IRG)
         elif teacher.Grade == 'LectureB' :
             calculerMontant(teacher,rsup_semestre,PUMAB,per_securite_soc,per_IRG)
         elif teacher.Grade == 'MCA' :
             calculerMontant(teacher,rsup_semestre,PUMCA,per_securite_soc,per_IRG)
         elif teacher.Grade == 'MCB' :
             calculerMontant(teacher,rsup_semestre,PUMCB,per_securite_soc,per_IRG)
         elif teacher.Grade == 'Professor' :
             calculerMontant(teacher,rsup_semestre,PUProfesseur,per_securite_soc,per_IRG)

         return Response(rsup_monthly)
     

def export_montants_pdf(request):
    enseignants = Enseignant.objects.all()
    # Création du document PDF avec une taille de page personnalisée
    custom_page_size = (900, 1200)  # Ajustez la taille selon vos besoins
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="etat_de_paiement.pdf"'
    doc = SimpleDocTemplate(response, pagesize=custom_page_size)
    elements = []

    # Données à inclure dans le PDF
    data = [[ 'Nom', 'Prénom', 'Grade', 'Prix unitaire', 'N des heures', 'Montant total', 'Securite sociale', 'IRG', 'Montant debite','Montant net','Periode']]

    for enseignant in enseignants:
        montants = Montant.objects.filter(matricule_id = enseignant.Matricule)
        for montant in montants:
            data.append([
                enseignant.Nom,
                enseignant.Prénom,
                enseignant.Grade,
                str(montant.prix_unitaire),
                str(montant.nombre_des_heures),
                str(montant.montant_total),
                str(montant.securite_sociale),
                str(montant.irg),
                str(montant.montant_debite),
                str(montant.montant_net),
                montant.periode,
            
        ])

    # Création de la table
    table = Table(data)

    # Style de la table
    style = TableStyle([('BACKGROUND', (0,0), (-1,0), colors.grey),
                        ('TEXTCOLOR', (0,0), (-1,0), colors.whitesmoke),
                        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
                        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
                        ('BOTTOMPADDING', (0,0), (-1,0), 12),
                        ('BACKGROUND', (0,1), (-1,-1), colors.beige),
                        ('GRID', (0,0), (-1,-1), 1, colors.black)])

    table.setStyle(style)

    # Ajouter la table au document
    elements.append(table)
    doc.build(elements)
    return response

