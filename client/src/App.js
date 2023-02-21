import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Profile from './pages/Profile'
import BusinessContainer from './pages/BusinessContainer'
import Favorites from './pages/Favorites';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/businesses' element={<BusinessContainer />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
