import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom"
import { NavBar } from './Components/NavBar';
import { WelcomeBar } from "./Components/WelcomeBar";
import './App.css'
import { Dashboard } from "./Pages/Dashboard";
import { Calendrier } from "./Pages/Calendrier";
import { Enseignants } from "./Pages/Enseignants";
import { Reclamations } from "./Pages/Reclamations";
import { Archive } from "./Pages/Archive";
import { Documents } from "./Pages/Documents";
import { ProfInfos } from "./Pages/ProfInfos";
import { Profile } from "./Pages/Profile";
import LoginPage from "./Pages/LoginPage";
import { useState, createContext, useContext, useEffect } from "react";

export const AppContext = createContext();

function App() {

  const [enseignantMat, setEnseignantMat] = useState('')

  const [evenements, setEvenements] = useState(() => {
    // Initialiser l'état avec les événements stockés dans localStorage ou un tableau vide
    const savedEvenements = localStorage.getItem('evenements');
    return savedEvenements ? JSON.parse(savedEvenements) : [];
  });

  useEffect(() => {
    // Sauvegarder les événements dans localStorage chaque fois qu'ils changent
    localStorage.setItem('evenements', JSON.stringify(evenements));
  }, [evenements]);

  const [modeSemestriel, setModeSemestriel] = useState(() => {
    const savedModeSemestriel = localStorage.getItem('modeSemestriel');
    return savedModeSemestriel ? JSON.parse(savedModeSemestriel) : {
      dateDebut: '',
      dateFin: '',
      chargeCours: '',
      chargeTD: '',
      chargeTP: '',
      tauxCours: '',
      tauxTD: '',
      tauxTP: '',
      PUProf: '',
      PUMCA: '',
      PUMCB: '',
      PUMAA: '',
      PUMAB: '',
      PSec: '',
      PIRG: '',
    };
  });

  useEffect(() => {
    localStorage.setItem('modeSemestriel', JSON.stringify(modeSemestriel));
  }, [modeSemestriel]);

  const [userName, setUserName] = useState(() => {
    const savedUserName = localStorage.getItem('userName');
    return savedUserName ? JSON.parse(savedUserName) : { nom: '', prenom: '' };
  });

  useEffect(() => {
    const savedUserName = localStorage.getItem('userName');
    if (savedUserName) {
      setUserName(JSON.parse(savedUserName));
    }
  }, []);

  const [index, setIndex] = useState(() => {
    const savedIndex = localStorage.getItem('index');
    return savedIndex ? parseInt(savedIndex) : 0;
  });
  
  useEffect(() => {
    const savedIndex = localStorage.getItem('index');
    if (savedIndex) {
      setIndex(parseInt(savedIndex));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('index', index);
  }, [index]);

  const [modeType, setModeType] = useState(() => {
    const savedModeType = localStorage.getItem('modeType');
    return savedModeType || 'semestre';
  });

  useEffect(() => {
    const savedModeType = localStorage.getItem('modeType');
    if (savedModeType) {
      setModeType(savedModeType);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('modeType', modeType);
  }, [modeType]);


  return (
    <div className="App">
      <AppContext.Provider value={{ enseignantMat, setEnseignantMat, evenements, setEvenements, modeSemestriel, setModeSemestriel, userName, setUserName, modeType, setModeType, index, setIndex }}>
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage />} />

            <Route path="/admin" element={<AdminLayout />} >
              <Route index element={<Dashboard />} />
              <Route path="calendrier" element={<Calendrier />} />
              <Route path="enseignants" element={<Enseignants />} />
              <Route path="enseignants/:matricule" element={<ProfInfos />} />
              <Route path="documents" element={<Documents />} />
              <Route path="archive" element={<Archive />} />
            </Route>

            <Route path="/enseignant" element={<ProfLayout />}>
              <Route path=":matricule" element={<Profile />} />
              <Route path="reclamations" element={<Reclamations />} />
            </Route>

          </Routes>
        </Router>
      </AppContext.Provider>


    </div>
  );
}

const AdminLayout = () => {
  const navAdmin = [
    { name: 'table du bord', path: 'admin' },
    { name: 'enseignants', path: 'admin/enseignants' },
    { name: 'calcul', path: 'admin/calendrier' },
    { name: 'documents', path: 'admin/documents' },
    { name: 'Archive', path: 'admin/archive' }
  ];
  return (

    <>
      <NavBar navItems={navAdmin} />
      <WelcomeBar />
      <div>
        <Outlet />
      </div>
    </>
  )

}

const ProfLayout = () => {

  const { enseignantMat } = useContext(AppContext)

  const navProf = [
    { name: 'profile', path: `enseignant/${enseignantMat}` },
  ];
  return (

    <>
      <NavBar navItems={navProf} />
      <WelcomeBar />
      <div>
        <Outlet />
      </div>
    </>
  )

}

export default App;
