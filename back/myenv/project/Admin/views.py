import MySQLdb
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.core.serializers import serialize
# import _mysql_connector
import smtplib 
from email.mime.text import MIMEText 
from email.mime.multipart import MIMEMultipart
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import * 
import json
from django.http import JsonResponse
from .models import Salle
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Enseignant
from django.db import transaction
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import EnseignantSerializer
from django.http import JsonResponse
from .models import Enseignant

# Create your views here.
@api_view(['GET'])
def teacher_list(request):
    teachers = Enseignant.objects.all() #select * from enseignant
    serTeach = EnseignantSerializer(teachers, context = {'request' : request}, many=True)
    return Response(serTeach.data)


def creer_enseignant(request):
    # Créer une instance d'enseignant avec des données prédéfinies
    enseignant = Enseignant.objects.create(
        Matricule="12TRY",
        Nom="Nom TRY",
        Prénom="Prénom de l'enseignantTRY",
        DateNaissance="1990-01-01",
        Adresse="Adresse de l'enseignantTRY",
        Email="enseignantTRY@example.com",
        NumeroTelephone="0123456789TRY",
        Fonction="Fonction1TRY",
        Grade="MCATRY",
        Etablissement="Nom de l'établissementTRY",
        MotDePasse="motdepasse123TRY"
    )

    # Construire une chaîne contenant toutes les informations de l'enseignant
    enseignant_info = f"Matricule: {enseignant.Matricule}\n"
    enseignant_info += f"Nom: {enseignant.Nom}\n"
    enseignant_info += f"Prénom: {enseignant.Prénom}\n"
    enseignant_info += f"Date de Naissance: {enseignant.DateNaissance}\n"
    enseignant_info += f"Adresse: {enseignant.Adresse}\n"
    enseignant_info += f"Email: {enseignant.Email}\n"
    enseignant_info += f"Numéro de Téléphone: {enseignant.NumeroTelephone}\n"
    enseignant_info += f"Fonction: {enseignant.Fonction}\n"
    enseignant_info += f"Grade: {enseignant.Grade}\n"
    enseignant_info += f"Etablissement: {enseignant.Etablissement}\n"
    enseignant_info += f"Mot de Passe: {enseignant.MotDePasse}\n"

    # Renvoyer la réponse HTTP avec les informations de l'enseignant
    return HttpResponse(enseignant_info)



def delete_enseignants(request, matricules):
    matricules_to_delete = [matricule.strip() for matricule in matricules.split(',') if matricule.strip()]
    
    if matricules_to_delete:
        try:
            with transaction.atomic():
                # Supprimer les lignes correspondantes dans la table 'enseigne'
                Enseigne.objects.filter(Matric_id__in=matricules_to_delete).delete()
                # Supprimer les enseignants
                Enseignant.objects.filter(Matricule__in=matricules_to_delete).delete()
            return JsonResponse({'success': True, 'message': 'Les enseignants ont été supprimés avec succès.'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=500)
    else:
        return JsonResponse({'success': False, 'message': 'Aucun matricule fourni.'}, status=400)





@api_view(['GET'])
def modules_list(request):
    modules = Module.objects.all() #select * from enseignant
    serModule = ModuleSerializer(modules, context = {'request' : request}, many=True)
    return Response(serModule.data)



def creer_module(request):
    # Créer une instance de module avec des données prédéfinies
    module = Module.objects.create(
        Code="code1",
        NomModule="Nom du module1",
        Coefficient=1,
        NbrHeures=20,
        Semestre="Semestre 1",
        nomP_id="1CS"  # n'oubliez pas de respecter la cle etrangere nomP == nomPromotion li f la table Promotion
    )

    # Construire une chaîne contenant toutes les informations du module
    module_info = f"Code: {module.Code}\n"
    module_info += f"Nom du module: {module.NomModule}\n"
    module_info += f"Coefficient: {module.Coefficient}\n"
    module_info += f"Nombre d'heures: {module.NbrHeures}\n"
    module_info += f"Semestre: {module.Semestre}\n"
    module_info += f"ID du professeur: {module.nomP_id}\n"

    # Renvoyer la réponse HTTP avec les informations du module
    return HttpResponse(module_info)


def delete_modules(request, codes_modules):
    codes_modules_to_delete = [code_module.strip() for code_module in codes_modules.split(',') if code_module.strip()]
    
    if codes_modules_to_delete:
        try:
            with transaction.atomic():
                # Supprimer d'abord les enregistrements de la table Seance qui référencent les modules à supprimer
                Seance.objects.filter(Code_id__in=codes_modules_to_delete).delete()
                
                # Ensuite, supprimer les modules
                Module.objects.filter(Code__in=codes_modules_to_delete).delete()
                
            return JsonResponse({'success': True, 'message': 'Les modules ont été supprimés avec succès.'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=500)
    else:
        return JsonResponse({'success': False, 'message': 'Aucun code de module fourni.'}, status=400)
    

@api_view(['GET'])
def salles_list(request):
    salles = salles.objects.all()
    serSalles = SalleSerializer(salles, context={'request': request}, many=True)
    return Response(serSalles.data)


def creer_salle(request):
    # Créer une instance de salle avec des données prédéfinies
    salle = Salle.objects.create(
        NomSalle="A",
        Zone="cycle prepa",
        NbrPlaces= 150 ,
        Type="Amphi"
    )

    # Construire une chaîne contenant toutes les informations de la salle
    salle_info = f"Nom de la salle: {salle.NomSalle}\n"
    salle_info += f"ID de la salle: {salle.IdSalle}\n"
    salle_info += f"Zone: {salle.Zone}\n"
    salle_info += f"Nombre de places: {salle.NbrPlaces}\n"
    salle_info += f"Type: {salle.Type}\n"

    # Renvoyer la réponse HTTP avec les informations de la salle
    return HttpResponse(salle_info)



def delete_salles(request, ids_salles):
    ids_salles_to_delete = [id_salle.strip() for id_salle in ids_salles.split(',') if id_salle.strip()]
    
    if ids_salles_to_delete:
        try:
            with transaction.atomic():
                # Supprimer les salles
                Salle.objects.filter(IdSalle__in=ids_salles_to_delete).delete()
            return JsonResponse({'success': True, 'message': 'Les salles ont été supprimées avec succès.'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=500)
    else:
        return JsonResponse({'success': False, 'message': 'Aucun identifiant de salle fourni.'}, status=400)



def delete_seance(request, seance_id):
    try:
        # Rechercher la séance à supprimer
        seance = Seance.objects.get(IdSeance=seance_id)
        seance.delete()
        return JsonResponse({'success': True, 'message': 'La séance a été supprimée avec succès.'})
    except Seance.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'La séance spécifiée n\'existe pas.'}, status=404)
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=500)
    






@api_view(['GET'])
def promotions_list(request):
    promotions = promotions.objects.all()
    serPromotions = PromotionSerializer(promotions, context={'request': request}, many=True)
    return Response(serPromotions.data)

def creer_promotion(request):
    # Créer une instance de promotion avec des données prédéfinies
    promotion = Promotion.objects.create(
        NomPromo="3CS",
        Departement="Second Cycle"
    )

    # Construire une chaîne contenant toutes les informations de la promotion
    promotion_info = f"Nom de la promotion: {promotion.NomPromo}\n"
    promotion_info += f"Département: {promotion.Departement}\n"

    # Renvoyer la réponse HTTP avec les informations de la promotion
    return HttpResponse(promotion_info)


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


def creer_section(request):
    # Créer une instance de section avec des données prédéfinies
    nouvelle_section = section.objects.create(
        idSection=3,  
        NomSection="A",
        nomP_id="1CS"  
    )

    # Construire une chaîne contenant toutes les informations de la section
    section_info = f"ID de la section: {nouvelle_section.idSection}\n"
    section_info += f"Nom de la section: {nouvelle_section.NomSection}\n"
    section_info += f"ID du professeur: {nouvelle_section.nomP_id}\n"

    # Renvoyer la réponse HTTP avec les informations de la section
    return HttpResponse(section_info)


def delete_sections(request, ids_sections):
    ids_sections_to_delete = [id_section.strip() for id_section in ids_sections.split(',') if id_section.strip()]
    
    if ids_sections_to_delete:
        try:
            with transaction.atomic():
                # Identifier les spécialités référençant les sections à supprimer
                specialites_referencing_sections = Specialite.objects.filter(idSection_id__in=ids_sections_to_delete)
                
                if specialites_referencing_sections.exists():
                    # Supprimer les spécialités référençant les sections à supprimer
                    specialites_referencing_sections.delete()
                
                # Supprimer les sections
                section.objects.filter(idSection__in=ids_sections_to_delete).delete()
                
            return JsonResponse({'success': True, 'message': 'Les sections et les spécialités associées ont été supprimées avec succès.'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=500)
    else:
        return JsonResponse({'success': False, 'message': 'Aucun identifiant de section fourni.'}, status=400)
    
@api_view(['GET'])
def specialites_list(request):
    specialites = specialites.objects.all()
    serSpecialites =SpecialiteSerializer(specialites, context={'request': request}, many=True)
    return Response(serSpecialites.data)

def creer_specialite(request):
    # Créer une instance de spécialité avec des données prédéfinies
    nouvelle_specialite = Specialite.objects.create(
        idSpecialite=4, 
        NomSpecialite="nouvelle spécialité",
        idSection_id=1  
    )

    # Construire une chaîne contenant toutes les informations de la spécialité
    specialite_info = f"ID de la spécialité: {nouvelle_specialite.idSpecialite}\n"
    specialite_info += f"Nom de la spécialité: {nouvelle_specialite.NomSpecialite}\n"
    specialite_info += f"ID de la section associée: {nouvelle_specialite.idSection_id}\n"

    # Renvoyer la réponse HTTP avec les informations de la spécialité
    return HttpResponse(specialite_info)





def delete_specialites(request, ids_specialites):
    ids_specialites_to_delete = [id_specialite.strip() for id_specialite in ids_specialites.split(',') if id_specialite.strip()]
    
    if ids_specialites_to_delete:
        try:
            with transaction.atomic():
                # Supprimer les spécialités
                Specialite.objects.filter(idSpecialite__in=ids_specialites_to_delete).delete()
            return JsonResponse({'success': True, 'message': 'Les spécialités ont été supprimées avec succès.'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=500)
    else:
        return JsonResponse({'success': False, 'message': 'Aucun identifiant de spécialité fourni.'}, status=400)

@api_view(['GET'])
def groupes_list(request):
    groupes = Groupe.objects.all()
    serGroupes = GroupeSerializer(groupes, context={'request': request}, many=True)
    return Response(serGroupes.data)

def creer_groupe(request):
    # Créer une instance de groupe avec des données prédéfinies
    nouveau_groupe = Groupe.objects.create(
        idGroupe=4,  
        Numero="4",
        Specialite="SIW",
        idSection_id=1  
    )

    # Construire une chaîne contenant toutes les informations du groupe
    groupe_info = f"ID du groupe: {nouveau_groupe.idGroupe}\n"
    groupe_info += f"Numéro du groupe: {nouveau_groupe.Numero}\n"
    groupe_info += f"Spécialité du groupe: {nouveau_groupe.Specialite}\n"
    groupe_info += f"ID de la section associée: {nouveau_groupe.idSection_id}\n"

    # Renvoyer la réponse HTTP avec les informations du groupe
    return HttpResponse(groupe_info)



def delete_groupes(request, ids_groupes):
    ids_groupes_to_delete = [id_groupe.strip() for id_groupe in ids_groupes.split(',') if id_groupe.strip()]
    
    if ids_groupes_to_delete:
        try:
            with transaction.atomic():
                # Identifier les séances référençant les groupes à supprimer
                seances_referencing_groupes = Seance.objects.filter(idGroupe_id__in=ids_groupes_to_delete)
                
                if seances_referencing_groupes.exists():
                    # Supprimer les séances référencant les groupes à supprimer
                    seances_referencing_groupes.delete()
                
                # Supprimer les groupes
                Groupe.objects.filter(idGroupe__in=ids_groupes_to_delete).delete()
                
            return JsonResponse({'success': True, 'message': 'Les groupes et les séances associées ont été supprimés avec succès.'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=500)
    else:
        return JsonResponse({'success': False, 'message': 'Aucun identifiant de groupe fourni.'}, status=400)

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

    # Renvoyer les données sérialisées
    return Response({"teacher": serTeach.data, "modules": serModules.data, "absences": serAbceences.data})


@api_view(['POST'])
def insertAbsence(request, teacher_id):
    teacher = Enseignant.objects.get(Matricule=teacher_id)
    serializer = AbcenceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(IdProf=teacher)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


def delete_absences(request, ids_absences):
    ids_absences_to_delete = [id_absence.strip() for id_absence in ids_absences.split(',') if id_absence.strip()]
    
    if ids_absences_to_delete:
        try:
            with transaction.atomic():
                # Supprimer les absences
                Abcence.objects.filter(IdAbs__in=ids_absences_to_delete).delete()
            return JsonResponse({'success': True, 'message': 'Les absences ont été supprimées avec succès.'})
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=500)
    else:
        return JsonResponse({'success': False, 'message': 'Aucun identifiant d' 'absence fourni.'}, status=400)




def creer_seance(request):
    # Créer une instance de séance avec des données prédéfinies
    nouvelle_seance = Seance.objects.create(
        IdSeance=10,  
        NomS="SYS2",
        Type="TD",
        Jour="Lundi",
        HeureDebut="08:00:00",
        HeureFin="10:00:00",
        Semestre="Semestre 2",
        Code_id="code1",  
        Matricule_id="1",  
        idGroupe_id=1,  
        idSalle_id=4,  
        idSection_id=1,  
        idSpecialite_id=1  
    )

    # Construire une chaîne contenant toutes les informations de la séance
    seance_info = f"ID de la séance: {nouvelle_seance.IdSeance}\n"
    seance_info += f"Nom de la séance: {nouvelle_seance.NomS}\n"
    seance_info += f"Type de séance: {nouvelle_seance.Type}\n"
    seance_info += f"Jour: {nouvelle_seance.Jour}\n"
    seance_info += f"Heure de début: {nouvelle_seance.HeureDebut}\n"
    seance_info += f"Heure de fin: {nouvelle_seance.HeureFin}\n"
    seance_info += f"Semestre: {nouvelle_seance.Semestre}\n"
    seance_info += f"ID du code associé: {nouvelle_seance.Code_id}\n"
    seance_info += f"ID du matricule associé: {nouvelle_seance.Matricule_id}\n"
    seance_info += f"ID du groupe associé: {nouvelle_seance.idGroupe_id}\n"
    seance_info += f"ID de la salle associée: {nouvelle_seance.idSalle_id}\n"
    seance_info += f"ID de la section associée: {nouvelle_seance.idSection_id}\n"
    seance_info += f"ID de la spécialité associée: {nouvelle_seance.idSpecialite_id}\n"

    # Renvoyer la réponse HTTP avec les informations de la séance
    return HttpResponse(seance_info)


def creer_heure(request):
    # Créer une instance de heure avec des données prédéfinies
    nouvelle_heure = heure.objects.create(
        idHeure=10,  
        defType="RSup",
        idSeance_id=10,  
    )

    # Construire une chaîne contenant toutes les informations de l'heure
    heure_info = f"ID de l'heure: {nouvelle_heure.idHeure}\n"
    heure_info += f"Type de définition: {nouvelle_heure.defType}\n"
    heure_info += f"ID de la séance associée: {nouvelle_heure.idSeance_id}\n"

    # Renvoyer la réponse HTTP avec les informations de l'heure
    return HttpResponse(heure_info)


def creer_absence(request):
    # Créer une instance d'absence avec des données prédéfinies
    nouvelle_absence = Abcence.objects.create(
        DateAbs="2024-04-27",
        HeureDebut="08:00:00",
        HeureFin="10:00:00",
        Motif="Maladie",
        IdProf_id="1"  
    )

    # Construire une chaîne contenant toutes les informations de l'absence
    absence_info = f"ID de l'absence: {nouvelle_absence.IdAbs}\n"
    absence_info += f"Date de l'absence: {nouvelle_absence.DateAbs}\n"
    absence_info += f"Heure de début: {nouvelle_absence.HeureDebut}\n"
    absence_info += f"Heure de fin: {nouvelle_absence.HeureFin}\n"
    absence_info += f"Motif: {nouvelle_absence.Motif}\n"
    absence_info += f"ID du professeur associé: {nouvelle_absence.IdProf_id}\n"

    # Renvoyer la réponse HTTP avec les informations de l'absence
    return HttpResponse(absence_info)

@api_view(['DELETE'])
def deleteAbsence(request,teacher_id,abs_id):
    myAbs = get_object_or_404(Abcence, pk=abs_id)
    myAbs.delete()
    return teacher_detail(request,teacher_id)

# @api_view(['GET'])
# def addSeance(request, teacher_id):
#     teacher = get_object_or_404(Enseignant, pk=teacher_id)

#     # Serialize Enseignant
#     serTeach = EnseignantSerializer(teacher)

#     # Serialize Seance Types
#     seanceType = Seance.mySeanceTypes
#     serType = SeanceSerializer(seanceType, many=True)

#     # Serialize Seance Jours
#     seanceJours = Seance.myJours
#     serJours = SeanceSerializer(seanceJours, many=True)

#     # Serialize Promotions
#     promotions = Promotion.myPromotions
#     serPromotions = PromotionSerializer(promotions, many=True)

#     # Serialize Semesters
#     semesters = Module.mySemesters
#     serSemesters = ModuleSerializer(semesters, many=True)

#     # Serialize Modules
#     modules = Module.objects.all()
#     serModules = ModuleSerializer(modules, many=True)

#     # Serialize Promos
#     promos = Promotion.objects.all()
#     serPromos = PromotionSerializer(promos, many=True)

#     # Serialize Salles
#     salles = Salle.objects.all()
#     serSalles = SalleSerializer(salles, many=True)

#     # Serialize Seance queryset
#     seances = Seance.objects.all()
#     serSeances = SeanceSerializer(seances, many=True)

#     return render(request, 'teacherinfos/addSeance.html', {
#         'serTeach': serTeach.data,
#         'serType': serType.data,
#         'serJours': serJours.data,
#         'serPromotions': serPromotions.data,
#         'serSemesters': serSemesters.data,
#         'serModules': serModules.data,
#         'serPromos': serPromos.data,
#         'serSalles': serSalles.data,
#         'serSeances': serSeances.data  # Serialized Seance queryset
#     })

# @api_view(['POST'])
# def insertSeance(request,teacher_id):
#     type = request.POST['type']
#     jour = request.POST['jour']
#     heureDeb = request.POST['heureDebut']
#     heureFin = request.POST['heureFin']
#     promo = request.POST['promo']
#     promotion = Promotion.objects.get(NomPromo = promo)
#     depart = promotion.Departement
#     semestre = request.POST['semestre']
#     module = request.POST['module']
#     salle_name = request.POST['Salle']
#     modulee = Module.objects.get(NomModule = module, Semestre = semestre,nomP_id = promo)
#     module_code = modulee.Code
#     sallee = Salle.objects.get(NomSalle = salle_name, Zone = depart)
#     IdSalle = sallee.IdSalle
#     seance = Seance(Type = type,Jour = jour,HeureDebut = heureDeb,HeureFin = heureFin,Semestre = semestre,Code_id = module_code,Matricule_id = teacher_id,idSalle_id = IdSalle, NomS = module)
#     seance.save()
#     return addSeance(request,teacher_id) 




def modifier_enseignant(request, matricule): 
    # Récupérer un enseignant par son matricule
    enseignant = Enseignant.objects.get(Matricule=matricule) 

    # Modifier les valeurs de tous les champs
    enseignant.Nom = 'Nouveau Nom'
    enseignant.Prenom = 'Nouveau Prenom'
    enseignant.DateNaissance = '2024-01-01'  
    enseignant.Adresse = 'Nouvelle Adresse'
    enseignant.Email = 'nouveau@email.com'
    enseignant.NumeroTelephone = 'Nouveau Téléphone'
    enseignant.Fonction = 'Nouvelle Fonction'
    enseignant.Grade = 'Nouveau Grade'
    enseignant.Etablissement = 'Nouvel Etablissement'
    enseignant.MotDePasse = 'Nouveau MotDePasse'

    # Enregistrer les modifications
    enseignant.save()

    return HttpResponse("Les informations de l'enseignant ont été mises à jour avec succès.")




def modifier_promotion(request, nom_promo):
    # Récupérer la promotion par son nom
    promotion = get_object_or_404(Promotion, NomPromo=nom_promo)

    # Modifier les valeurs des champs
    promotion.Departement = 'test'
   

    # Enregistrer les modifications
    promotion.save()

    return HttpResponse("Les informations de la promotion ont été mises à jour avec succès.")

def modifier_section(request, section_id):
    # Récupérer la section par son identifiant
    Section = get_object_or_404(section, idSection=section_id)

    # Modifier les valeurs des champs
    Section.NomSection = 'D'
    Section.nomP_id = '1CS'
    # Enregistrer les modifications
    Section.save()

    return HttpResponse("Les informations de la section ont été mises à jour avec succès.")


def modifier_specialite(request, specialite_id):
    # Récupérer la spécialité par son identifiant
    specialite = get_object_or_404(Specialite, idSpecialite=specialite_id)

    # Modifier les valeurs des champs
    specialite.NomSpecialite = 'nvSpec'
    specialite.idSection_id = 3  

    # Enregistrer les modifications
    specialite.save()

    return HttpResponse("Les informations de la spécialité ont été mises à jour avec succès.")

def modifier_groupe(request, groupe_id):
    # Récupérer le groupe par son identifiant
    groupe = get_object_or_404(Groupe, idGroupe=groupe_id)

    # Modifier les valeurs des champs
    groupe.Numero = '5'
    groupe.Specialite = 'IASD'
    groupe.idSection_id = 2 

    # Enregistrer les modifications
    groupe.save()

    return HttpResponse("Les informations du groupe ont été mises à jour avec succès.")

def modifier_salle(request, salle_id):
    # Récupérer la salle par son identifiant
    salle = get_object_or_404(Salle, IdSalle=salle_id)

    # Modifier les valeurs des champs
    salle.NomSalle = 'Salle1'
    salle.Zone = 'CS'
    salle.NbrPlaces = 50  # Exemple de modification
    salle.Type = 'Salle TD'

    # Enregistrer les modifications
    salle.save()

    return HttpResponse("Les informations de la salle ont été mises à jour avec succès.")

def modifier_module(request, code_module):
    # Récupérer le module par son code
    module = get_object_or_404(Module, Code=code_module)

    # Modifier les valeurs des champs
    module.NomModule = 'BDD'
    module.Coefficient = 5
    module.NbrHeures = 40
    module.Semestre = 'Semestre 1'
    module.nomP_id = '1CS'

    # Enregistrer les modifications
    module.save()

    return HttpResponse("Les informations du module ont été mises à jour avec succès.")


def modifier_heure(request, heure_id):
    # Récupérer l'heure par son identifiant
    Heure = get_object_or_404(heure,idHeure=heure_id)

    # Modifier les valeurs des champs
    Heure.defType = 'charge'
    Heure.idSeance_id = 1 
    # Enregistrer les modifications
    Heure.save()

    return HttpResponse("Les informations de l'heure ont été mises à jour avec succès.")

def modifier_seance(request, seance_id):
    # Récupérer la séance par son identifiant
    seance = get_object_or_404(Seance, IdSeance=seance_id)

    # Modifier les valeurs des champs
    seance.NomS = 'ALG1'
    seance.Type = 'TD'
    seance.Jour = 'MARDI'
    seance.HeureDebut = '13:30'
    seance.HeureFin = '15:00'
    seance.Semestre = 'Semestre 1'
    seance.Code_id = 'code1'
    seance.Matricule_id = '1'
    seance.idGroupe_id = 4  
    seance.idSalle_id = 4  
    seance.idSection_id = 1  

    # Enregistrer les modifications
    seance.save()

    return HttpResponse("Les informations de la séance ont été mises à jour avec succès.")

def modifier_absence(request, absence_id):
    # Récupérer l'absence par son identifiant
    absence = get_object_or_404(Abcence, IdAbs=absence_id)

    # Modifier les valeurs des champs
    absence.DateAbs = '2024-04-17'
    absence.HeureDebut = '09:00'
    absence.HeureFin = '11:00'
    absence.Motif = 'nouveau-motif'
    absence.IdProf_id = '2'

    # Enregistrer les modifications
    absence.save()
    
    return HttpResponse("Les informations de l'absence ont été mises à jour avec succès.")