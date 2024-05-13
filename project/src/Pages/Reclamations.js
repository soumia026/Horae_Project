import React, { useState, useEffect } from 'react';

 export function Reclamations() {
  // Définir une fonction pour récupérer les données du localStorage
  const getSavedFormData = () => {
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : { name: '', email: '' };
  };

  // Utiliser useState avec la fonction getSavedFormData pour initialiser le formulaire
  const [formData, setFormData] = useState(getSavedFormData());

  // Enregistrer les données dans le localStorage à chaque changement de formData
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  console.log(localStorage)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // Récupérer les données depuis le localStorage lors du montage du composant
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gérer la soumission du formulaire si nécessaire
  };

  return (
    <div>
      <h1>Formulaire</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <input type="number" name="email" value={formData.email} onChange={handleChange} />
        {/* Ajoutez d'autres champs de formulaire si nécessaire */}
        <button type="submit">Soumettre</button>
      </form>
      {/* Afficher les données du localStorage */}
      <div>
        <h2>Données du localStorage</h2>
        <p>Nom : {formData.name}</p>
        <p>Email : {formData.email}</p>
      </div>
    </div>
  );
}

