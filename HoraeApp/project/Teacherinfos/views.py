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

# Create your views here.
@api_view(['GET'])
def teacher_list(request):
    teachers = Enseignant.objects.all() #select * from enseignant
    serTeach = EnseignantSerializer(teachers, many=True)
    return render(request, 'teacherinfos/teachers.html', {'teachers':  serTeach})
@api_view(['GET'])
def teacher_detail(request,teacher_id):
    teacher = get_object_or_404(Enseignant, pk=teacher_id)
    serTeach = EnseignantSerializer(teacher,many=True)
    enseignes = Enseigne.objects.filter(Matric_id = teacher_id).values()
    serEnseignes = EnseignantSerializer(enseignes,many=True)
    modules  = Module.objects.all()
    serModules=ModuleSerializer( modules,many = True)
    absences = Abcence.objects.filter(IdProf_id = teacher_id).values()
    serAbceences=AbcenceSerializer(absences, many=True)
    return render(request, 'teacherinfos/techinfos.html', {'teacher': serTeach,
                                                           'enseignes':serEnseignes,
                                                           'modules':serModules,
                                                        'absences':serAbceences})

@api_view(['GET'])
def addAbsence(request,teacher_id):
    teacher = get_object_or_404(Enseignant, pk=teacher_id)
    serTeach = EnseignantSerializer(teacher,many=True)
    return render(request,'teacherinfos/addAbsence.html',{'teacher':serTeach})
@api_view(['GET'])
def insertAbsence(request,teacher_id):
    teacher = get_object_or_404(Enseignant, pk=teacher_id)
    serTeach = EnseignantSerializer(teacher,many=True)
    date = request.POST['date']
    heureDeb = request.POST['start_time']
    HeureFin = request.POST['end_time']
    Motif = request.POST['reason']
    abs = Abcence(DateAbs=date,HeureDebut=heureDeb,HeureFin=HeureFin,Motif=Motif,
                  IdProf=teacher)
    abs.save()
    return render(request,'teacherinfos/index.html',{'teacher':serTeach})
@api_view(['GET'])
def deleteAbsence(request,teacher_id,abs_id):
    myAbs = get_object_or_404(Abcence, pk=abs_id)
    myAbs.delete()
    return teacher_detail(request,teacher_id)

@api_view(['GET'])
def addSeance(request, teacher_id):
    teacher = get_object_or_404(Enseignant, pk=teacher_id)

    # Serialize Enseignant
    serTeach = EnseignantSerializer(teacher)

    # Serialize Seance Types
    seanceType = Seance.mySeanceTypes
    serType = SeanceSerializer(seanceType, many=True)

    # Serialize Seance Jours
    seanceJours = Seance.myJours
    serJours = SeanceSerializer(seanceJours, many=True)

    # Serialize Promotions
    promotions = Promotion.myPromotions
    serPromotions = PromotionSerializer(promotions, many=True)

    # Serialize Semesters
    semesters = Module.mySemesters
    serSemesters = ModuleSerializer(semesters, many=True)

    # Serialize Modules
    modules = Module.objects.all()
    serModules = ModuleSerializer(modules, many=True)

    # Serialize Promos
    promos = Promotion.objects.all()
    serPromos = PromotionSerializer(promos, many=True)

    # Serialize Salles
    salles = Salle.objects.all()
    serSalles = SalleSerializer(salles, many=True)

    # Serialize Seance queryset
    seances = Seance.objects.all()
    serSeances = SeanceSerializer(seances, many=True)

    return render(request, 'teacherinfos/addSeance.html', {
        'teacher': serTeach.data,
        'seanceType': serType.data,
        'seanceJours': serJours.data,
        'promotions': serPromotions.data,
        'semesters': serSemesters.data,
        'modules': serModules.data,
        'promos': serPromos.data,
        'salles': serSalles.data,
        'seances': serSeances.data  # Serialized Seance queryset
    })


def insertSeance(request,teacher_id):
    type = request.POST['type']
    jour = request.POST['jour']
    heureDeb = request.POST['heureDebut']
    heureFin = request.POST['heureFin']
    promo = request.POST['promo']
    promotion = Promotion.objects.get(NomPromo = promo)
    depart = promotion.Departement
    semestre = request.POST['semestre']
    module = request.POST['module']
    salle_name = request.POST['Salle']
    modulee = Module.objects.get(NomModule = module, Semestre = semestre,nomP_id = promo)
    module_code = modulee.Code
    sallee = Salle.objects.get(NomSalle = salle_name, Zone = depart)
    IdSalle = sallee.IdSalle
    seance = Seance(Type = type,Jour = jour,HeureDebut = heureDeb,HeureFin = heureFin,Semestre = semestre,Code_id = module_code,Matricule_id = teacher_id,idSalle_id = IdSalle, NomS = module)
    seance.save()
    return addSeance(request,teacher_id) 

@api_view(['GET'])
def password_recovery(request):
    if request.method == 'POST':
        receiver_email = request.POST.get('email')  # Récupérer l'email depuis le formulaire

        # Connexion à la base de données MySQL
        conn = MySQLdb.connector.connect( 
            host="localhost", 
            user="root", 
            password="hiba", 
            database="horae" 
        )

     

        # Fonction pour récupérer le mot de passe associé à l'e-mail
        def get_password_from_email(email):
           #  cursor.execute("SELECT motDePasse FROM enseignant WHERE Email = %s", (email,))
            Teacher = Enseignant.objects.get(Email = email)
            result = Teacher.MotDePasse

            return result if result else None
        
        

        # Fonction pour envoyer un e-mail contenant le mot de passe
        def send_password_email(receiver_email, password):
            smtp_server = 'smtp.gmail.com'
            smtp_port = 587
            sender_email = 'email'  #  adresse e-mail
            sender_password = 'motdepasse'  # mot de passe d'e-mail

            message = MIMEMultipart()
            message['From'] = sender_email
            message['To'] = receiver_email
            message['Subject'] = 'Récupération du mot de passe'

            body = f"Votre mot de passe est : {password}"
            message.attach(MIMEText(body, 'plain'))

            with smtplib.SMTP(smtp_server, smtp_port) as server:
                server.starttls()
                server.login(sender_email, sender_password)
                server.sendmail(sender_email, receiver_email, message.as_string())

        # Récupérer le mot de passe associé à l'e-mail
        password = get_password_from_email(receiver_email)

        if password:
            # Envoyer le mot de passe à l'e-mail de l'utilisateur
            send_password_email(receiver_email, password)
            return HttpResponse("Le mot de passe a été envoyé à votre adresse e-mail.")
        else:
            return HttpResponse("Aucun compte associé à cet e-mail n'a été trouvé dans la base de données.")

        
    else:
        return render(request, 'teacherinfos/password_recovery.html')