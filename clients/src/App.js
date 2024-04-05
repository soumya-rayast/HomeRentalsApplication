import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import './App.css';
import HomePage from './Pages/HomePage';
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
