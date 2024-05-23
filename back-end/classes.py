#classe enseignat :
class Enseignant():
    def init(self,Matricule,Nom,Prénom,DateNaissance,Adresse,Email,NumeroTelephone,Fonction,Grade):
        self.Matricule = Matricule
        self.Nom = Nom
        self.Prénom = Prénom
        self.DateNaissance = DateNaissance
        self.Adresse = Adresse
        self.Email = Email
        self.NumeroTelephone = NumeroTelephone
        self.Fonction = Fonction
        self.Grade = Grade
        self.Modules = []
        self.seances = []
    #ajouter les sèances :
    def ajouter_seance(self, seance):
        self.seances.append(seance)
        seance.enseignant = self
    #add_module :
    def enroll_module(self, module):
        if module not in self.Modules:
            self.Modules.append(module)
            module.add_enseignant(self)
    #remove_module :
    def drop_module(self, module):
        if module in self.Modules:
            self.Modules.remove(module)
            module.remove_enseignant(self)
    #getters :
    def getMatricule(self):
        return self.Matricule
    def getNom(self):
        return self.Nom
    def getPrénom(self):
        return self.Prénom
    def getDateNaissance(self):
        return self.DateNaissance
    def getAdresse(self):
        return self.Adresse
    def getEmail(self):
        return self.Email
    def getNumeroTelephone(self):
        return self.NumeroTelephone
    def getFonction(self):
        return self.Fonction
    def getGrade(self):
        return self.Grade
    #setters :
    def setMatricule(self,Matricule):
        self.Matricule = Matricule
    def setNom(self,Nom):
        self.Nom = Nom
    def setPrénom(self,Prénom):
        self.Prénom = Prénom
    def setDateNaissance(self,DateNaissance):
        self.DateNaissance = DateNaissance
    def setAdresse(self,Adresse):
        self.Adresse = Adresse
    def setEmail(self,Email):
        self.Email = Email
    def setNumeroTelephone(self,NumeroTelephone):
        self.NumeroTelephone = NumeroTelephone
    def setFonction(self,Fonction):
        self.Fonction = Fonction
    def setGrade(self,Grade):
        self.Grade = Grade
#classe module :
class Module():
    def init(self,Code,Nom,Coefficient,nbrHeures,Semestre):
        self.Code = Code
        self.Nom = Nom
        self.Coefficient = Coefficient
        self.nbrHeures = nbrHeures
        self.Semestre = Semestre
        self.enseignants = []
        self.sessions = []
        self.promotion = None
    #add_session :
    def ajouter_session(self, session):
        self.sessions.append(session)
        session.module = self
    #add_teacher
    def add_enseignant(self, enseignant):
        if enseignant not in self.enseignants:
            self.enseignants.append(enseignant)
            enseignant.enroll_module(self)
    #remove_teacher
    def remove_enseignant(self, enseignant):
        if enseignant in self.enseignants:
            self.enseignants.remove(enseignant)
            enseignant.drop_module(self)
    #getters :
    def getCode(self):
        return self.Code
    def getNom(self):
        return self.Nom
    def getCoefficient(self):
        return self.Coefficient
    def getnbrHeures(self):
        return self.nbrHeures
    def getSemestre(self):
        return self.Semestre
    #setters :
    def setCode(self,Code):
        self.Code = Code
    def setNom(self,Nom):
        self.Nom = Nom
    def setCoefficient(self,Coefficient):
        self.Coefficient = Coefficient
    def setnbrHeurese(self,nbrHeures):
        self.nbrHeures = nbrHeures
    def setSemestre(self,Semestre):
        self.Semestre = Semestre
#classe séance :
class Seance():
    def init(self,Id,Nom,Type,Date,Jour,heureDebut,heureFin,Presence,Semestre,AnneeUniv,DuréeRsup,DuréeCharge):
        self.Id = Id
        self.Nom = Nom
        self.Type = Type
        self.Jour = Jour
        self.heureDebut = heureDebut
        self.heureFin = heureFin
        self.Presence = Presence
        self.Semestre = Semestre
        self.AnneeUniv = AnneeUniv
        self.DuréeRsup = DuréeRsup
        self.DuréeCharge = DuréeCharge
        self.Date = Date
        self.enseignant = None
        self.module = None
        self.salle = None

    #getters :
    def getId(self):
        return self.Id
    def getNom(self):
        return self.Nom
    def getType(self):
        return self.Type
    def getJour(self):
        return self.Jour
    def getheureDebut(self):
        return self.heureDebut
    def getheureFin(self):
        return self.heureFin
    def getPresence(self):
        return self.Presence
    def getSemestre(self):
        return self.Semestre
    def getAnneeUniv(self):
        return self.AnneeUniv
    def getDate(self):
        return self.Date
    def getDuréeRsup(self):
        return self.DuréeRsup
    def getDuréeCharge(self):
        return self.DuréeCharge
    #setters :
    def setId(self,Id):
        self.Id = Id
    def setNom(self,Nom):
        self.Nom = Nom
    def setType(self,Type):
        self.Type = Type
    def setJour(self,Jour):
        self.Jour = Jour
    def setheureDebut(self,heureDebut):
        self.heureDebut = heureDebut
    def setheureFin(self,heureFin):
        self.heureFin = heureFin
    def setPresence(self,Presence):
        self.Presence = Presence
    def setSemestre(self,Semestre):
        self.Semestre = Semestre  
    def setAnneeUniv(self,AnneeUniv):
        self.AnneeUniv = AnneeUniv
    def setDate(self,Date):
        self.Date = Date
    def setDuréeRsup(self,DuréeRsup):
        self.DuréeRsup = DuréeRsup
    def setDuréeCharge(self,DuréeCharge):
        self.DuréeCharge = DuréeCharge

#classe salle :
class Salle():
    def init(self,IdSalle,Numero,Zone,nbrPlaces):
        self.Numero = Numero
        self.IdSalle = IdSalle
        self.Zone = Zone
        self.nbrPlaces = nbrPlaces
        self.sessions = []

    def ajouter_session(self, session):
        self.sessions.append(session)
        session.salle = self
    
    #getters :
    def getIdSalle(self):
        return self.IdSalle
    def getNumero(self):
        return self.Numero
    def getZone(self):
        return self.Zone
    def getnbrPlaces(self):
        return self.nbrPlaces
    #setters :
    def setIdSalle(self,IdSalle):
        self.IdSalle = IdSalle
    def setNumero(self,Numero):
        self.Numero = Numero
    def setZone(self,Zone):
        self.Zone = Zone
    def setnbrPlaces(self,nbrPlaces):
        self.nbrPlaces = nbrPlaces
#classe promotion:
class Promotion():
    def init(self,Nom,Departement):
        self.Nom = Nom
        self.Departement = Departement
        self.modules = []
        self.groups = []
    def add_group(self, group):
        self.groups.append(group)
        group.promotion = self

    def add_module(self, module):
        self.modules.append(module)
        module.promotion = self
    
    #getters :
    def getNom(self):
        return self.Nom
    def getDepartement(self):
        return self.Departement
    #setters :
    def setNom(self,Nom):
        self.Nom = Nom
    def setDepartement(self,Departement):
        self.Departement = Departement
#classe groupe :
class Groupe:
    def __init__(self, name):
        self.name = name
        self.promotion = None

    def display_info(self):
        if self.promotion:
            print(f"The group '{self.name}' belongs to the {self.promotion.name} promotion")
        else:
            print(f"No promotion is assigned to the group '{self.name}'")  

    