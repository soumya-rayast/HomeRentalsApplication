import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { store } from './Redux/Store';
import './App.css';
import HomePage from './Pages/HomePage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import CreateListing from './Pages/CreateListing';
import ListingDetails from './Pages/ListingDetails';
import TripList from './Pages/TripList';
import WishList from './Pages/WishList';
import PropertyList from './Pages/PropertyList';
import ReservationList from './Pages/ReservationList';
import CategoryPage from './Pages/CategoryPage';
import SearchPage from './Pages/SearchPage';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/properties/:listingId' element={<ListingDetails />} />
          <Route path='/properties/category/:category' element={<CategoryPage />} />
          <Route path='/:userId/trips' element={<TripList />} />
          <Route path='/:userId/wishList' element={<WishList />} />
          <Route path='/:userId/properties' element={<PropertyList />} />
          <Route path='/:userId/reservations' element={<ReservationList />} />
          <Route path='/properties/search/:search' element={<SearchPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}
export default App;
