import { BrowserRouter as Router, Routes, Route, Outlet, Link } from "react-router-dom"
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
import { useState, createContext, useContext } from "react";

export const AppContext = createContext();

function App() {

  const [enseignantMat, setEnseignantMat] = useState('')

  return (
    <div className="App">
      <AppContext.Provider value={{enseignantMat, setEnseignantMat}}>
        <Router>
          <Routes>
            <Route path='/' element={<LoginPage />} />

            <Route path="/admin" element={<AdminLayout />} >
              <Route index element={<Dashboard />} />
              <Route path="calendrier" element={<Calendrier />} />
              <Route path="enseignants" element={<Enseignants />} />
              <Route path="enseignants/:matricule" element={<ProfInfos />} />
              <Route path="documents" element={<Documents />} />
              <Route path="reclamations" element={<Reclamations />} />
              <Route path="archive" element={<Archive />} />
            </Route>

            <Route path="/enseignant" element={<ProfLayout />}>
              <Route path=":matricule" element={<Profile />} />
              <Route path="documents" element={<Documents />} />
              <Route path="reclamations" element={<Reclamations />} />
              <Route path="archive" element={<Archive />} />
            </Route>

          </Routes>
        </Router>
      </AppContext.Provider>


    </div>
  );
}

const AdminLayout = () => {
  const navAdmin = [
    { name: 'dashboard', path: 'admin' },
    { name: 'calcul', path: 'admin/calendrier' },
    { name: 'enseignants', path: 'admin/enseignants' },
    { name: 'documents', path: 'admin/documents' },
    { name: 'reclamations', path: 'admin/reclamations' },
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

  const {enseignantMat} = useContext(AppContext)

  const navProf = [
    { name: 'profile', path: `enseignant/${enseignantMat}` },
    { name: 'documents  ', path: 'enseignant/documents' },
    { name: 'reclamations', path: 'enseignant/reclamations' },
    { name: 'Archive', path: 'enseignant/archive' }
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

// Links : C'est optionel il n'est pas inclus dans le projet juste pour le prvisionemment

const Links = () => {
  return (
    <div className="links">
      <Link className='btn' to='/admin' style={{ marginRight: '1rem' }}> Admin</Link>
      <Link className='btn' to='/enseignant'> Enseignant </Link>
    </div>
  )
}

export default App;
