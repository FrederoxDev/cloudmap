import React from 'react';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import { Route, Routes } from "react-router-dom";
import Editor from '../pages/Editor';
import NotFound from '../pages/NotFound';
import FileView from '../pages/FileView';
import HomePage from '../pages/HomePage';
import { AuthProvider, useAuth } from '../contexts/UserContext';
import PrivateRoute from './PrivateRoute';
import Navbar from './Navbar';

function App() {  
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Private Routes will redirect to login if signed out */}
        <Route path="/editor" element={<PrivateRoute />}>
          <Route index element={<FileView />} />
          <Route path=":id" element={<Editor />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App;
