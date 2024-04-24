// App.jsx
import { Route, Routes } from 'react-router-dom'
import './App.css'
import SideBar from './Components/SideBar/SideBar'
import Dashboard from './Dashboard/Dashboard';
import Enseignants from './Enseignants/Enseignants';
import Calendar from './Calendar/Calendar';
import Etats from './Etats/Etats';
import Claims from './Claims/Claims';
import Archive from './Archive/Archive';
import Trash from './Trash/Trash';
import Ellipse from '/Ellipse.svg';
import bell from '/bell.svg';
import smile from '/smile.svg';
function App() {

  return (
    <div className='everything'>
      <div className='band'>
        <p className='wlcm'>Welcome, Mohammed Bench</p>
        <img src={bell} alt='bell' className='BLL'/>
        <img src={Ellipse} alt='Ellipse' className='ELL'/>
        <img src={smile} alt='smile' className='SML'/>
      </div>
      <div className='minus-band'>
        <SideBar/>
        <div className='Board'>
          <Routes>
            <Route path='/' Component={Dashboard} />
            <Route path='/enseignants' Component={Enseignants} />
            <Route path='/calendar' Component={Calendar} />
            <Route path='/etats' Component={Etats} />
            <Route path='/claims' Component={Claims} />
            <Route path='/archive' Component={Archive} />
            <Route path='/trash' Component={Trash} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
