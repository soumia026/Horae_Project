
from django.db import models

class Enseignant(models.Model):
    myFunctions = [
    ('Fonction1','Fonction1'),
    ('Fonction2','Fonction2'),
]
    myGrades = [
    ('Professeur', 'Professeur'),  
    ('MCA','MCA'),
    ('MCB','MCB'),
    ('MAA','MAA'),
    ('MAB','MAB'),
]
    Matricule = models.CharField(max_length = 255,blank = True,primary_key = True)
    Nom = models.CharField(max_length = 255,blank = True)
    Prénom = models.CharField(max_length = 255,blank = True)
    DateNaissance = models.DateField(null = True,blank = True)
    Adresse = models.CharField(max_length = 100,blank = True)
    Email = models.EmailField(max_length = 255,blank = True)
    NumeroTelephone = models.CharField(max_length = 255,blank = True)
    Fonction = models.CharField(max_length = 255,choices = myFunctions)
    Grade = models.CharField(max_length = 255,choices = myGrades)
    Etablissement = models.CharField(max_length = 100,blank = True)
    MotDePasse = models.CharField(max_length = 255,blank = True)

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
    NomPromo = models.CharField(max_length = 255,choices = myPromotions, primary_key = True)
    Departement =  models.CharField(max_length = 255,choices = myDepartements)
    class Meta:
        db_table =  "Promotion"
    def __str__(self) -> str:
        return self.NomPromo


class Module(models.Model):
    mySemesters = [
    ('S1','S1'),
    ('S2','S2'),
]

    Code =  models.CharField(max_length = 255,blank = True,primary_key = True)
    NomModule = models.CharField(max_length = 255,blank = True)
    Coefficient = models.IntegerField(blank = True)
    NbrHeures = models.IntegerField(blank = True)
    Semestre = models.CharField(max_length = 255,choices = mySemesters)
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

    NomSalle =  models.CharField(max_length = 255,blank = True)
    IdSalle =  models.AutoField(primary_key = True)
    Zone =  models.CharField(max_length = 255,choices = Promotion.myDepartements)
    NbrPlaces =  models.IntegerField(blank = True)
    Type = models.CharField(max_length = 255,choices = mySallesTypes)
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
    
       
    idSection = models.IntegerField(blank = True,primary_key = True)
    NomSection = models.CharField(max_length = 255)
    nomP = models.ForeignKey(Promotion,default = None,on_delete=models.DO_NOTHING)
    class Meta:
        db_table =  "Section"
    def __str__(self) -> str:
        return str(self.idSection)
    


class Specialite(models.Model):
 
    idSpecialite = models.AutoField(blank = True,primary_key = True)
    NomSpecialite = models.CharField(max_length = 255,blank = True)
    # idSection = models.ForeignKey(section,default = None,on_delete=models.DO_NOTHING , null=True)

    class Meta:
        db_table =  "Specialite"
    def __str__(self) -> str:
        return str(self.idSpecialite)

class Groupe(models.Model):
    
    idGroupe = models.IntegerField(blank = True,primary_key = True)
    Numero = models.CharField(max_length = 255)
    Specialite = models.CharField(max_length = 255, blank = True)
    idSection = models.ForeignKey(section,default = None,on_delete=models.DO_NOTHING)

    class Meta:
        db_table =  "Groupe"
        
    def __str__(self) -> str:
        return str(self.idGroupe)
    
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



class SpecSection(models.Model):
    idSpecialite =models.ForeignKey(Specialite,default = None,on_delete=models.DO_NOTHING)
    idSection = models.ForeignKey(section,default = None,on_delete=models.DO_NOTHING , null=True)
    class Meta:
        db_table =  "SpecSection"
        unique_together = ["idSpecialite", "idSection"]

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
    NomS = models.CharField(max_length = 255,blank = True)
    Type = models.TextField(max_length = 255,choices = mySeanceTypes)
    Jour = models.CharField(max_length = 255,choices = myJours)
    HeureDebut = models.TimeField(blank = True)
    HeureFin = models.TimeField(blank = True)
    Semestre = models.CharField(max_length = 255,choices = Module.mySemesters,default = None)
    Matricule = models.ForeignKey(Enseignant,default = None,on_delete=models.DO_NOTHING)
    Code = models.ForeignKey(Module,default = None,on_delete=models.DO_NOTHING,null= True)
    idSalle = models.ForeignKey(Salle,default = None,on_delete=models.DO_NOTHING,null= True)
    idPromo=  models.ForeignKey(Promotion,default = None,on_delete=models.DO_NOTHING,null = True)
    idGroupe =  models.ForeignKey(Groupe,default = None,on_delete=models.DO_NOTHING,null = True)
    idSection =  models.ForeignKey(section,default = None,on_delete=models.DO_NOTHING,null = True)
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
        unique_together = ["date", "idSeance"]

    # presence = models.BooleanField(default=True)
    


class heure(models.Model):
    Types = [
    ('HeuresSup','HeuresSup'),
    ('Charge','Charge'),
]

    idHeure = models.AutoField(primary_key = True)
    defType = models.CharField(max_length = 255,choices= Types)
    idSeance = models.ForeignKey(Seance,default = None,on_delete=models.DO_NOTHING)
    duree = models.DurationField(null=True)
    class Meta:
        db_table =  "Heure"
    def __str__(self) -> str:
        return self.defType
    


class EcoleAdministration(models.Model):
    matricule = models.CharField(max_length = 255,blank = True,primary_key = True)
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    mot_de_passe = models.CharField(max_length=255)
    Email = models.EmailField(max_length = 255,blank = True)

    class Meta:
        db_table = 'EcoleAdministration'
    def __str__(self) -> str:
        return self.Nom


class Montant(models.Model):
    idMontant = models.AutoField(primary_key=True)

    SEMESTRE_CHOICES = (
            ('S1','S1'),
            ('S2','S2'),

    )
    montant_total = models.FloatField(default = None)
    anneeUniversiatire = models.CharField(max_length=255, default = None) 
    semestre = models.CharField(max_length=255, choices=SEMESTRE_CHOICES)
    matricule = models.ForeignKey(Enseignant, on_delete=models.DO_NOTHING , default = None)
    prix_unitaire = models.FloatField(default = None)
    nombre_des_heures = models.FloatField(default = None)
    securite_sociale = models.FloatField(default = None)
    irg = models.FloatField(default = None)
    montant_debite = models.FloatField(default = None)
    montant_net = models.FloatField(default = None)
    periode = models.CharField(default = None,max_length=255, choices=SEMESTRE_CHOICES)
    class Meta:
        db_table =  "Montant"

    def __str__(self):
        return str(self.idMontant)





class Evenement(models.Model):
    idEv = models.AutoField(primary_key=True)
    nomEv = models.CharField(max_length=255, default = None) 
    dateDébut = models.DateField(blank = True,default = None)
    dateFin = models.DateField(blank = True,default = None)
    class Meta:
        db_table =  "Evenement"

    def __str__(self):
        return str(self.idEv)







# class Montant(models.Model):
#     idMontant = models.AutoField(primary_key=True)
#     TYPE_CHOICES = (
#         ('Banque', 'Banque'),
#         ('CCP', 'CCP'),
#     )
#     SEMESTRE_CHOICES = (
#             ('S1','S1'),
#             ('S2','S2'),

#     )
#     typeRecu = models.CharField(max_length=255, choices=TYPE_CHOICES)
#     somme = models.FloatField()
#     anneeUniversiatire = models.CharField(max_length=255) 
#     matricule = models.ForeignKey(Enseignant, on_delete=models.DO_NOTHING , default = None)
#     semestre = models.CharField(max_length=255, choices=SEMESTRE_CHOICES)

#     def __str__(self):
#         return f"ID: {self.idMontant}, Type: {self.typeRecu}, Somme: {self.somme}, Date: {self.date}, Semestre: {self.semestre}"



    
    

    