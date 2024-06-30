import React,{useState,useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/Context';
import { signInWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


function Login() { 
  const[email,setemail]=useState('')
  const[password,setPassword]=useState('')
  const {firestore,auth}=useContext(FirebaseContext)
  const navigate=useNavigate()

  const handlelogin=(e)=>{
    e.preventDefault()

    signInWithEmailAndPassword(auth,email,password).then((res)=>{
      navigate('/')
    }).catch((err)=>{
      alert(err.code)
    })
  }


  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handlelogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
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
            onChange={(e)=>setPassword((e.target.value))}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link  to={'/signup'} >Signup</Link>
      </div>
    </div>
  );
}

export default Login;
