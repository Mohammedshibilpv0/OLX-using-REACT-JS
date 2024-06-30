import React,{useState,useContext} from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { FirebaseContext } from '../../store/Context';


export default function Signup() {
  const FindingMsg = (code) => {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'Email already in use.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/operation-not-allowed':
        return 'Operation not allowed.';
      case 'auth/weak-password':
        return 'Password is too weak.';
      default:
        return 'An unknown error occurred.';
    }
  };
  const navigate =useNavigate()
  const[name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[phone,setPhone]=useState('')
  const[password,setPassword]=useState('')
  const[err,setErr]=useState('')
  const[loading,setLoding]=useState(false)
  const {firestore,auth}=useContext(FirebaseContext)
  const handleSignup= async (e)=>{
    e.preventDefault()
    try{
      setLoding(true)
      const userData= await createUserWithEmailAndPassword(auth,email,password)
      await updateProfile(userData.user,{displayName:name})
      await setDoc(doc(firestore,'users',userData.user.uid),{
        id:userData.user.uid,
        username:name,
        phone:phone
      })
      navigate('/login')

    }catch(error){
      setLoding(false)
      const errorMessage = FindingMsg(error.code);
      setErr(errorMessage);
      console.error('Error during sign up:', errorMessage);
    }
  }



  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" alt='' height="200px" src={Logo}></img>
        {loading && <p className='text-success'>Loading Please Wait</p>}
        <form onSubmit={handleSignup}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />

          {err && <p className="error-message text-danger">{err}</p>} {/* Display error message */}
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
