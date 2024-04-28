
from django.db import models



class Enseignant(models.Model):
    myFunctions = [
    ('Fonction1','Fonction1'),
    ('Fonction2','Fonction2'),
]
    myGrades = [
    ('MCA','MCA'),
    ('MCB','MCB'),
    ('Teacher','Teacher'),
    ('LectureA','LectureA'),
    ('LectureB','LectureB'),
    ('Professor','Professor'),
]
    Matricule = models.CharField(max_length = 20,blank = True,primary_key = True)
    Nom = models.CharField(max_length = 20,blank = True)
    Prénom = models.CharField(max_length = 50,blank = True)
    DateNaissance = models.DateField(null = True,blank = True)
    Adresse = models.CharField(max_length = 100,blank = True)
    Email = models.EmailField(max_length = 30,blank = True)
    NumeroTelephone = models.CharField(max_length = 20,blank = True)
    Fonction = models.CharField(max_length = 20,choices = myFunctions)
    Grade = models.CharField(max_length = 50,choices = myGrades)
    Etablissement = models.CharField(max_length = 100,blank = True)
    MotDePasse = models.CharField(max_length = 20,blank = True)

    class Meta:
        db_table =  "Enseignant" 
        # ordering = [test]
    def __str__(self) -> str:
        return self.Nom


class Promotion(models.Model):
    myPromotions = [
    ('1CPI','1CPI'),
    ('2CPI','2CPI'),
    ('1CS','1CS'),
    ('2CS','2CS'),
    ('3CS','3CS'),
]

    myDepartements = [
    ('Classe préparatoire','Classe préparatoire'),
    ('Seconde Cycle','Seconde Cycle'),
   
]
    NomPromo = models.CharField(max_length = 20,choices = myPromotions, primary_key = True)
    Departement =  models.CharField(max_length = 20,choices = myDepartements)
    class Meta:
        db_table =  "Promotion"
    def __str__(self) -> str:
        return self.Matricule


class Module(models.Model):
    mySemesters = [
    ('S1','S1'),
    ('S2','S2'),
]

    Code =  models.CharField(max_length = 20,blank = True,primary_key = True)
    NomModule = models.CharField(max_length = 20,blank = True)
    Coefficient = models.IntegerField(blank = True)
    NbrHeures = models.IntegerField(blank = True)
    Semestre = models.CharField(max_length = 20,choices = mySemesters)
    nomP = models.ForeignKey(Promotion, default = None,on_delete=models.DO_NOTHING)
    class Meta:
        db_table =  "Module" 
    def __str__(self) -> str:
        return self.Code



class Salle(models.Model):
    mySallesTypes = [
    ('Amphi','Amphi'),
    ('SalleTd','SalleTd'),
    ('SalleTp','SalleTp'),
]

    NomSalle =  models.CharField(max_length = 20,blank = True)
    IdSalle =  models.AutoField(primary_key = True)
    Zone =  models.CharField(max_length = 20,choices = Promotion.myDepartements)
    NbrPlaces =  models.IntegerField(blank = True)
    Type = models.CharField(max_length = 20,choices = mySallesTypes)
    class Meta:
        db_table =  "Salle"
    def __str__(self) -> str:
        return self.NomSalle
    


class DateSeance(models.Model) :
    IddatteS = models.AutoField(primary_key= True)
    date = models.DateField(null = True,default = None)
    class Meta:
        db_table = "DateSeance"
    def __str__(self) -> str:
        return self.IddatteS


class section(models.Model):
        
    mySections = [
    ('A','A'),
    ('B','B'),
    ('C','C'),
]
    idSection = models.IntegerField(blank = True,primary_key = True)
    NomSection = models.CharField(max_length = 20,choices = mySections)
    nomP = models.ForeignKey(Promotion,default = None,on_delete=models.DO_NOTHING)
    class Meta:
        db_table =  "Section"
    def __str__(self) -> str:
        return str(self.idSection)
    

class Groupe(models.Model):
    
    myGroups =[ 
    ('1','1'),
    ('2','2'),
    ('3','3'),
    ('4','4'),
    ('5','5'),
    ('6','6'),
    ('7','7'),
    ('8','8'),
    ('9','9'),
    ('10','10'),
    ('11','11'),
    ('12','12'),
    ('13','13'),
    ('14','14'),
    ('15','15'),
    ('16','16'),
    ('17','17'),
    ('18','18'),
    ('19','19'),
    ('20','20'),
]
    mySpesialite = [
    ('ISI','ISI'),
    ('SIW','SIW'),
    ('IASD','IASD'),
]
    idGroupe = models.IntegerField(blank = True,primary_key = True)
    Numero = models.CharField(max_length = 20,choices = myGroups)
    Specialite = models.CharField(max_length = 20,choices = mySpesialite, blank = True)
    idSection = models.ForeignKey(section,default = None,on_delete=models.DO_NOTHING)

    class Meta:
        db_table =  "Groupe"
        
    def __str__(self) -> str:
        return str(self.idGroupe)

class Specialite(models.Model):
    idSpecialite = models.IntegerField(blank = True,primary_key = True)
    NomSpecialite = models.CharField(max_length = 20,choices= Groupe.mySpesialite,blank = True)
    idSection = models.ForeignKey(section,default = None,on_delete=models.DO_NOTHING)

    class Meta:
        db_table =  "Specialite"
    def __str__(self) -> str:
        return str(self.idSpecialite)


    
class Enseigne(models.Model) :
    Matric = models.ForeignKey(Enseignant,default = None,on_delete=models.DO_NOTHING)
    Codee = models.ForeignKey(Module,default = None,on_delete=models.DO_NOTHING)
    class Meta:
        db_table =  "Enseigne"
        unique_together = ["Matric", "Codee"]
    def __str__(self) -> str:
        return str(self.Matric)

class SpecPromo(models.Model):
    idSpecialite = models.ForeignKey(Specialite,default = None,on_delete=models.DO_NOTHING)
    nomP = models.ForeignKey(Promotion,default = None,on_delete=models.DO_NOTHING)
    class Meta:
        db_table =  "SpecPromo"
        unique_together = ["idSpecialite", "nomP"]


class Abcence(models.Model):
    IdAbs = models.AutoField(primary_key = True)
    DateAbs = models.DateField(blank = True,default = None)
    HeureDebut = models.TimeField(blank = True,default = None)
    HeureFin = models.TimeField(blank = True,default = None)
    Motif = models.CharField(max_length = 100, blank = True,default = None)
    IdProf = models.ForeignKey(Enseignant,default = None,on_delete=models.DO_NOTHING)
    class Meta:
        db_table =  "Absence"
    

class Seance(models.Model):
    mySeanceTypes = [
    ('Cours','Cours'),
    ('Td','Td'),
    ('Tp','Tp'),
]
    myJours = [
        ('Dimanche','Dimanche'),
        ('Lundi','Lundi'),
        ('Mardi','Mardi'),
        ('Mercredi','Mercredi'),
        ('Jeudi','Jeudi'),
        ('Vendredi','Vendredi'),
        ('Samedi','Samedi'),
    ]
    IdSeance = models.AutoField(blank = True,primary_key = True)
    NomS = models.CharField(max_length = 20,blank = True)
    Type = models.TextField(max_length = 20,choices = mySeanceTypes)
    Jour = models.CharField(max_length = 20,choices = myJours)
    HeureDebut = models.TimeField(blank = True)
    HeureFin = models.TimeField(blank = True)
    Semestre = models.CharField(max_length = 20,choices = Module.mySemesters,default = None)
    Matricule = models.ForeignKey(Enseignant,default = None,on_delete=models.DO_NOTHING)
    Code = models.ForeignKey(Module,default = None,on_delete=models.DO_NOTHING,null= True)
    idSalle = models.ForeignKey(Salle,default = None,on_delete=models.DO_NOTHING,null= True)
    idPromo=  models.ForeignKey(Promotion,default = None,on_delete=models.DO_NOTHING,null = True)
    idGroupe =  models.ForeignKey(Groupe,default = None,on_delete=models.DO_NOTHING)
    idSection =  models.ForeignKey(section,default = None,on_delete=models.DO_NOTHING)
    # idAbs = models.ForeignKey(Abcence,default=None,on_delete=models.DO_NOTHING,null=True)
    class Meta:
        db_table =  "Seance"

    def __str__(self) -> str:
        return self.IdSeance


class Seances(models.Model) :
    date = models.ForeignKey(DateSeance,default=None,on_delete=models.DO_NOTHING)
    idSeance = models.ForeignKey(Seance,default=None,on_delete=models.DO_NOTHING)
    present = models.BooleanField(default=True)
    class Meta:
        db_table =  "Seances"

    # presence = models.BooleanField(default=True)
    


class heure(models.Model):
    Types = [
    ('HeuresSup','HeuresSup'),
    ('Charge','Charge'),
]

    idHeure = models.IntegerField(blank = True,primary_key = True)
    defType = models.CharField(max_length = 20,choices= Types)
    idSeance = models.ForeignKey(Seance,default = None,on_delete=models.DO_NOTHING)
    class Meta:
        db_table =  "Heure"
    def __str__(self) -> str:
        return self.defType