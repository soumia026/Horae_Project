export class Enseignant {
    constructor(matricule) {
        this.id = matricule;
        this.nom = '';
        this.prenom = '';
        this.email = '';
        this.numTelephone = '';
        this.numCompte = '';
        this.adress = '';
        this.dateNaissance = '';
        this.grade = '';
        this.etablissement = '';
        this.fonction = [];
        this.modules = [];
        this.motDePasse = '';
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