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
            return Response({'success': False, 'message': 'Aucun code fourni.'}, status=400)
    else:
        return Response({'success': False, 'message': 'Méthode non autorisée.'}, status=405)


        
@api_view(['GET'])
def salles_list(request):
    salles = salles.objects.all()
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
def delete_seance(request, seance_id):
    try:
       with transaction.atomic():

        heure.objects.filter(idSeance_id=seance_id).delete()
        Seances.objects.filter(idSeance_id=seance_id).delete()
        seance = Seance.objects.get(IdSeance=seance_id).delete()
        
       
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
   



# def delete_absences(request, ids_absences):
#     ids_absences_to_delete = [id_absence.strip() for id_absence in ids_absences.split(',') if id_absence.strip()]
    
#     if ids_absences_to_delete:
#         try:
#             with transaction.atomic():
#                 # Supprimer les absences
#                 Abcence.objects.filter(IdAbs__in=ids_absences_to_delete).delete()
#             return JsonResponse({'success': True, 'message': 'Les absences ont été supprimées avec succès.'})
#         except Exception as e:
#             return JsonResponse({'success': False, 'message': str(e)}, status=500)
#     else:
#         return JsonResponse({'success': False, 'message': 'Aucun identifiant d' 'absence fourni.'}, status=400)




@api_view(['DELETE'])
def deleteAbsence(request,teacher_id,abs_id):
    if request.method == 'DELETE':
        myAbs = get_object_or_404(Abcence, pk=abs_id)
        date = DateSeance.objects.get(date = myAbs.DateAbs)
        Seances.objects.filter(date_id = date.IddatteS).update(present = True)
        myAbs.delete()
        return Response({'success': True, 'message': 'L absence a été supprimée avec succès.'})

    
@api_view(['POST','GET'])
@permission_classes([IsAuthenticated])
def insertSeance(request, teacher_id,semestre):
    if request.method == 'POST':
        serializer = SeanceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['Matricule_id'] = teacher_id
            serializer.validated_data['Semestre'] = semestre
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    elif request.method == 'GET':
        # Handle GET request if needed
        seances = Seance.objects.filter(Matricule_id=teacher_id,Semestre = semestre)
        serializer = SeanceSerializer(seances, many=True)
        return Response(serializer.data, status=200)
    else:
        return Response({"message": "Method not allowed"}, status=405)




@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def insertEnseignant(request):
    if request.method == 'POST':
        serializer = EnseignantSerializer(data=request.data)
        if serializer.is_valid():
            teacher = serializer.save()
            selected_modules_ids = request.data.get('modules', [])
            teacher_id = teacher.Matricule  # Assuming Matricule is the primary key of the Enseignant model
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
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    elif request.method == 'GET':
        # Handle GET request if needed
        enseignants = Enseignant.objects.all()
        serializer = EnseignantSerializer(enseignants, many=True)
        return Response(serializer.data, status=200)
    else:
        return Response({"message": "Method not allowed"}, status=405)

@api_view(['POST','GET'])
@permission_classes([IsAuthenticated])
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