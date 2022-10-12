import './App.css';

import Nav from './nav/Nav.tsx';
import{ BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AboutUs from './About_us/About_us.tsx';
import Accounts from './Accounts/Accounts.tsx';
import AboutAccount from './About_account/About_account.tsx';

const App=()=> {
  return (
    <div className="App">
    <Nav/>
    <Router>
        <Routes> 
          <Route exact path="/"    element={<Accounts/>}/>
          <Route path="/accounts"  element={<Accounts />} />
          <Route path="/about_us"  element={<AboutUs/>}/>
          <Route path="/accounts/:ID"  element={<AboutAccount/>}/>
        </Routes>
      </Router>
    </div>
  );

}

export default App;
