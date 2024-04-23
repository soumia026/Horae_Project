import { BrowserRouter as Router, Routes, Route, Outlet, Link } from "react-router-dom"
import { NavBar } from './Components/NavBar';
import { WelcomeBar } from "./Components/WelcomeBar";
import './App.css'
import { ProfProvider } from "./Pages/ProfInfos";
import { Dashboard } from "./Pages/Dashboard";
import { Calendrier } from "./Pages/Calendrier";
import { Enseignants } from "./Pages/Enseignants";
import { Reclamations } from "./Pages/Reclamations";
import { Archive } from "./Pages/Archive";
import { Etats } from "./Pages/Etats";
import { ProfInfos } from "./Pages/ProfInfos";

function App() {

  

  return (
    <div className="App">
      {/* <ProfProvider> */}
      <Router>
        <Routes>

          <Route path='/' element={<Links />} />

          <Route path="/admin" element={<AdminLayout />} >
            <Route index element={<ProfInfos />} />
            <Route path="calendrier" element={<Calendrier />} />
            <Route path="enseignants" element={<Enseignants />} />
            {/* <Route path="enseignants/enseignant:id" element={} /> */}
            <Route path="etats" element={<Etats />} />
            <Route path="reclamations" element={<Reclamations />} />
            <Route path="archive" element={<Archive />} />
          </Route>

          <Route path="/enseignant" element={<ProfLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="etats" element={<Etats />} />
            <Route path="reclamations" element={<Reclamations />} />
            <Route path="archive" element={<Archive />} />
          </Route>

        </Routes>
      </Router>
      {/* </ProfProvider> */}
      
    </div>
  );
}

const AdminLayout = () => {
  const navAdmin = [
    { name: 'dashboard', path: 'admin' },
    { name: 'calendrier', path: 'admin/calendrier' },
    { name: 'enseignants', path: 'admin/enseignants' },
    { name: 'etats', path: 'admin/etats' },
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
  const navProf = [
    { name: 'profile', path: 'enseignant' },
    { name: 'etats', path: 'enseignant/etats' },
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
