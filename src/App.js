import './App.css';
import Login from './Components/Login-Signup/Login.jsx';
import PasswordRecovery from './Components/Login-Signup/PasswordRecovery.jsx';
import Signup from './Components/Login-Signup/Signup.jsx';


function App() {
  return (
    <BrowseRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/PasswordRecovery' element={<PasswordRecovery/>}/>
      </Routes>
    </BrowseRouter>
   
  );
}

export default App;
