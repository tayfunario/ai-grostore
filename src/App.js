import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/Main'
import Category from './components/Category'
import SignIn from './components/Signin'
import SignUp from './components/Signup'
import Detail from './components/Detail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Profile from './components/Profile';
import AdminPanel from './components/AdminPanel';
import React, { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyCpnWMYLZqp1yalRqZfw3fdPk3yo1tRNWs",
    authDomain: "ai-grostore.firebaseapp.com",
    projectId: "ai-grostore",
    storageBucket: "ai-grostore.appspot.com",
    messagingSenderId: "135788517616",
    appId: "1:135788517616:web:d5727ee62dafbb74514a35"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    signOut(auth)
  }, [])

  return (
    <div className='w-full'>
      <BrowserRouter>
        <Routes>
          <Route path="/ai-grostore" element={<Main />} />
          <Route path="/category" element={<Category />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/admin' element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
