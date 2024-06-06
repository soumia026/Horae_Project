import React, { useEffect, useState } from "react";
import "../Styles/Enseignants.css";
import '../Styles/Documents.css'
import SearchIcon from "../Assets/search.svg";
import axios from "axios";


export function Documents() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  const [documentChoice, setDocumentChoice] = useState('enseignant')

  return (
    <div className="main-container dynamic-container Whole">
      <div className="Bandd">
        <p className="ens">Documents</p>
        <div className="filtrage-container" >

          {documentChoice === 'enseignant' &&
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by anything ..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
              <span className="search-icon">
                <img src={SearchIcon} alt="search icon" />
              </span>
            </div>
          }

          <div className="document-select">

            <button className="select-btn">
              {documentChoice}
              <span>
                <span><svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.131552 0.449026L4.2945 4.83737L8.42944 0.405733L8.43949 2.33171L4.30446 6.74534L0.1416 2.375L0.131552 0.449026Z" fill="black" />
                </svg>
                </span>
              </span>
            </button>
            <select style={{ fontSize: '15.5px' }} onChange={(e) => setDocumentChoice(e.target.value)}>
              <option value={'enseignant'}>Enseignant</option>
              <option value={'tous'}>Tous</option>
            </select>

          </div>
        </div>
      </div>

      {documentChoice === 'enseignant' &&
        <EnseignantsTable searchTerm={searchTerm} />
      }

      {documentChoice === 'tous' &&
        <FichePaiement />
      }

    </div>
  );
}

const EnseignantsTable = (props) => {

  const [enseignants, setEnseignants] = useState([]);


  useEffect(() => {
    const fetchEnseignants = () => {
      // Récupérer la liste des enseignants
      axios.get('http://127.0.0.1:8000/Administration/teachers')
        .then((res) => {
          setEnseignants(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    };
    fetchEnseignants();
  }, []);

  const filteredData = enseignants.filter((item) => {

    return (
      item.Matricule.toString().toLowerCase().includes(props.searchTerm.toLowerCase()) ||
      item.Nom.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
      item.Prénom.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
      item.Grade.toLowerCase().includes(props.searchTerm.toLowerCase())
    );

  });

  const [activeButtons, setActiveButtons] = useState([]);

  const handleButtonClick = (index) => {
    setActiveButtons(prevState =>
      prevState.includes(index)
        ? prevState.filter(i => i !== index)
        : [...prevState, index]
    );
  };

  const [lisetEnseignants, setListeEnseignants] = useState([]);

  const handleListeEnseignats = (matricule) => {
    setListeEnseignants(prevState =>
      prevState.includes(matricule)
        ? prevState.filter(i => i !== matricule)
        : [...prevState, matricule]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (const matricule of lisetEnseignants) {
      try {
        const url = `http://127.0.0.1:8000/Administration/export_montant_enseignant_pdf/${matricule}/`;
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', '');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Attendre un petit délai pour éviter que les téléchargements se chevauchent
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        console.error(`Erreur lors du téléchargement du PDF pour le matricule ${matricule}:`, error);
      }
    }
  };
  return (
    <>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Num</th>
              <th>Num Compte</th>
              <th>Nom & Prenom</th>
              <th>Grade</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="data-table-body">
            {filteredData.map((enseignant, index) => (
              <tr>
                <td>{index + 1}</td>
                <td style={{ textTransform: 'uppercase' }}>{enseignant.Matricule}</td>
                <td style={{ textTransform: 'capitalize' }}>{enseignant.Nom} {enseignant.Prénom}</td>
                <td style={{ textTransform: 'capitalize' }}>{enseignant.Grade}</td>
                <td>

                  <button
                    className={`document-btn ${activeButtons.includes(index) ? 'active' : ''}`}
                    onClick={() => { handleButtonClick(index); handleListeEnseignats(enseignant.Matricule) }}
                  >
                    Générer
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <form className="form-telecharger" onSubmit={handleSubmit}>
        <button type="submit" className={`telecharger-btn ${activeButtons.length > 0 ? 'telecharger-active' : ''}`} >Télécharger</button>
      </form>
    </>
  )
}

const FichePaiement = () => {

  const handleDownload = (e) => {
    e.preventDefault();
    let url = '';

    url = 'http://127.0.0.1:8000/Administration/export_montants_pdf/';

    // Créer un lien temporaire et déclencher le téléchargement
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'archivageDesDonnees.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="paiement-container">
      <div className="type-paiement">
        <h2>Fiche d’état de Paiement</h2>
        <form onSubmit={handleDownload} >
          <div className="btn-container">
            <button type="submit" className="document-btn">Générer</button>
          </div>
        </form>
      </div>
    </div>
  )
}
