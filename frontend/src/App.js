import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FrontPage from './components/FrontPage';
import ClientPage from './components/ClientPage';
import TrainerPage from './components/TrainerPage';
import ManagerPage from './components/ManagerPage';

function App() {

  return <> 
  <Router>
    <Routes>
      <Route path='/' element={<FrontPage />} />
      <Route path='/client' element={<ClientPage />} />
      <Route path='/trainer' element={<TrainerPage />} />
      <Route path='/manager' element={<ManagerPage />} />
    </Routes>
  </Router>
  </>;
}

export default App;
