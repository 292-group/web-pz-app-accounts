import logo from './logo.svg';
import './App.css';
import './components/TestComponent'
import TestComponent from "./components/TestComponent";
import NavBar from "./components/NavBar/NavBar";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <AppRouter/>
      {/*<TestComponent/>*/}
    </BrowserRouter>
  );
}

export default App;
