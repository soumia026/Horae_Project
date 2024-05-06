export class teacher {
    constructor(matricule) {
        this.Matricule = matricule;
        this.Nom = '';
        this.Prénom = '';
        this.DateNaissance = '';
        this.Adresse = '';
        this.Email = '';
        this.NumeroTelephone = '';
        this.Fonction = '';
        this.Grade = '';
        this.Etablissement = '';
        this.MotDePasse = '';
    }
}

export class Absence {
    constructor(id) {
        this.id = id;
        this.matricule = '';
        this.date_absence = '';
        this.heureDebut = '';
        this.heureFin = '';
        this.motif = '';
    }
}