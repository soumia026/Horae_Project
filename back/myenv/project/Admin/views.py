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

from django.http import JsonResponse
from .models import Salle
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Enseignant
from django.db import transaction

# Create your views here.
@api_view(['GET'])
def teacher_list(request):
    teachers = Enseignant.objects.all() #select * from enseignant
    serTeach = EnseignantSerializer(teachers, context = {'request' : request}, many=True)
    return Response(serTeach.data)







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

@api_view(['GET'])
def salles_list(request):
    salles = salles.objects.all()
    serSalles = SalleSerializer(salles, context={'request': request}, many=True)
    return Response(serSalles.data)






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




@api_view(['GET'])
def promotions_list(request):
    promotions = promotions.objects.all()
    serPromotions = PromotionSerializer(promotions, context={'request': request}, many=True)
    return Response(serPromotions.data)

@api_view(['GET'])
def sections_list(request):
    sections = section.objects.all()
    serSections = SectionSerializer(sections, context={'request': request}, many=True)
    return Response(serSections.data)

@api_view(['GET'])
def specialites_list(request):
    specialites = specialites.objects.all()
    serSpecialites =SpecialiteSerializer(specialites, context={'request': request}, many=True)
    return Response(serSpecialites.data)

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

