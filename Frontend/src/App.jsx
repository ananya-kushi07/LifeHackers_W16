// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Cases from './pages/Cases';
import CreateCase from './pages/CreateCase';
import Lawyer from './pages/Lawyer';
import Profile from './pages/Profile';
import NewsFeed from './components/NewsFeed';
import Nyaya from './components/Nyayadut';
import Notification from './pages/Notification';
import ChatApp from './pages/chat';

function App() {
  return (
    <div>
    <Nyaya/>
    <Routes>
      {/* Public Routes (No Navbar) */}
      <Route path="/cases" element={<Cases />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/create-case" element={<CreateCase />} />
      <Route path="/lawyers" element={<Lawyer />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/news" element={<NewsFeed />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/chat" element={<ChatApp />} />
      {/* Protected Routes (With Navbar) */}
      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <>
              <Navbar />
              <Home />
              
            </>
          </ProtectedRoute>

        } 
      />
    </Routes>
  </div>
  );
}

export default App;
