// import {BrowserRouter ,Routes,Route} from 'react-router-dom'
// import './App.css';
// import HomePage from './Pages/HomePage';
// import RegisterPage from './Pages/RegisterPage'
// import LoginPage from './Pages/LoginPage'
// import CreateListing from './Pages/CreateListing';

// function App() {
//   return (
//     <div>
//       <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<HomePage/>}/>
//         <Route path='/register' element={<RegisterPage/>}/>
//         <Route path='/login' element={<LoginPage/>}/>
//         <Route path='/create-listing' element={<CreateListing/>}/>
//       </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { persistor, store } from './Redux/Store';
import './App.css';
import HomePage from './Pages/HomePage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import CreateListing from './Pages/CreateListing';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/create-listing' element={<CreateListing />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;

