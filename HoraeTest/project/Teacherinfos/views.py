from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.core.serializers import serialize
import mysql.connector 
import smtplib 
from email.mime.text import MIMEText 
from email.mime.multipart import MIMEMultipart
from .models import *
# Create your views here.

def teacher_list(request):
    teachers = Enseignant.objects.all() #select * from enseignant
    return render(request, 'teacherinfos/teachers.html', {'teachers': teachers})
def teacher_detail(request,teacher_id):
    teacher = get_object_or_404(Enseignant, pk=teacher_id)
    enseignes = Enseigne.objects.filter(Matric_id = teacher_id).values()
    modules  = Module.objects.all()
    absences = Abcence.objects.filter(IdProf_id = teacher_id).values()
    return render(request, 'teacherinfos/techinfos.html', {'teacher': teacher,
                                                           'enseignes':enseignes,
                                                           'modules':modules,
                                                           'absences':absences})
def addAbsence(request,teacher_id):
    teacher = get_object_or_404(Enseignant, pk=teacher_id)
    return render(request,'teacherinfos/addAbsence.html',{'teacher':teacher})
def insertAbsence(request,teacher_id):
    teacher = get_object_or_404(Enseignant, pk=teacher_id)
    date = request.POST['date']
    heureDeb = request.POST['start_time']
    HeureFin = request.POST['end_time']
    Motif = request.POST['reason']
    abs = Abcence(DateAbs=date,HeureDebut=heureDeb,HeureFin=HeureFin,Motif=Motif,
                  IdProf=teacher)
    abs.save()
    return render(request,'teacherinfos/index.html',{'teacher':teacher})
def deleteAbsence(request,teacher_id,abs_id):
    myAbs = get_object_or_404(Abcence, pk=abs_id)
    myAbs.delete()
    return teacher_detail(request,teacher_id)
def addSeance(request,teacher_id):
    teacher = get_object_or_404(Enseignant, pk=teacher_id)
    seanceType = Seance.mySeanceTypes
    seanceJours = Seance.myJours
    promotions = Promotion.myPromotions
    semesters = Module.mySemesters
    modules = Module.objects.all()
    modules_json = serialize('json', modules)
    promos = Promotion.objects.all()   
    promos_json = serialize('json', promos) 
    salles = Salle.objects.all()
    salles_json = serialize('json', salles) 


    return render(request,'teacherinfos/addSeance.html',{'teacher':teacher,
                                                        'seanceType':seanceType,
                                                         'seanceJours':seanceJours,
                                                          'promotions':promotions ,
                                                          'semesters':semesters,
                                                          'modules':modules,
                                                          'modules_json':modules_json,
                                                          "promos" : promos_json,
                                                          "salles_json":salles_json,
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








def password_recovery(request):
    if request.method == 'POST':
        receiver_email = request.POST.get('email')  # Récupérer l'email depuis le formulaire

        # Connexion à la base de données MySQL
        conn = mysql.connector.connect( 
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