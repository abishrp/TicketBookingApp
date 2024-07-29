import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
// import Profile from './components/Profile';
import Navbar from './components/Navbar';
import "./styles/Navbar.css"

import ShowTimes from './components/ShowTime';
import Seats from './components/Seats';
import Booking from './components/Booking';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import MoviesAdmin from './components/MoviesAdmin';
import TheatresAdmin from './components/TheatresAdmin';
import AddMovie from './components/AddMovie';
import DeleteMovie from './components/DeleteMovie';
import UpdateMovie from './components/UpdateMovie';
import AddTheatre from './components/AddTheatre';
import DeleteTheatre from './components/DeleteTheatre';
import UpdateTheatre from './components/UpdateTheatre';
import ShowtimeOptions from './components/ShowTimeOptions';
import AddShowtime from './components/AddShowTime';
import DeleteShowtime from './components/DeleteShowTime';
import UpdateShowtime from './components/UpdateShowTime';
import UserLogin from './components/UserLogin';
import Register from './components/Register';
import OtpVerify from './components/OtpVerify';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import BookingConfirmation from './components/BookingConfirmation';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/movies/:id/showtimes" element={<ShowTimes />} />
          <Route path="/showtimes/:showTimeId/seats" element={<Seats />} />
          <Route path="/booking" element={<Booking/>} />
          <Route path="/userlogin" element={<UserLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/movies" element={<MoviesAdmin />} />
          <Route path="/admin/theatres" element={<TheatresAdmin />} />
          <Route path="/admin/movies/add" element={<AddMovie />} />
          <Route path="/admin/movies/delete" element={<DeleteMovie />} />
          <Route path="/admin/movies/update" element={<UpdateMovie />} />
          <Route path="/admin/theatres/add" element={<AddTheatre />} />
          <Route path="/admin/theatres/delete" element={<DeleteTheatre />} />
          <Route path="/admin/theatres/update" element={<UpdateTheatre />} />
          <Route path="/admin/showtimes/add" element={<AddShowtime />} />
          <Route path="/admin/showtimes/delete" element={<DeleteShowtime />} />
          <Route path="/admin/showtimes/update" element={<UpdateShowtime />} />
    
          <Route path="/admin/showtimes" element={<ShowtimeOptions />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/verifyotp" element={<OtpVerify/>} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/bookingconfirmation" element={<BookingConfirmation />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
