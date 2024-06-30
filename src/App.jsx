import React, { useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext, FirebaseContext } from './store/Context';
import { getAuth, onAuthStateChanged } from "firebase/auth";


import Home from './Pages/Home';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Create from './Pages/Create';
import View from './Pages/ViewPost'
function App() {
  const { user,setUser } = useContext(AuthContext);
  const {firestore, auth}=useContext(FirebaseContext)
  useEffect(() => {
        onAuthStateChanged(auth,(user)=>{
          setUser(user)
        })
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/create' element={<Create/>}/>
        <Route path='/view/:id' element={<View/>}/>
      </Routes>
    </Router>
  );
}

export default App;
