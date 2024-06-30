import React,{useContext} from 'react';
import {useNavigate,Link, NavLink} from 'react-router-dom'
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/Context';
import { FirebaseContext } from '../../store/Context';
import { signOut } from "firebase/auth";
function Header() {

  const navigate=useNavigate()
  const {user} =useContext(AuthContext)
  const {auth}=useContext(FirebaseContext)

  const logout=()=>{
    signOut(auth)
    navigate('/')

  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>

          {user?
          <span >{user?user.displayName:'Login'}</span>
          :<h5 className='log mt-2'><Link to={'/login'}  style={{textDecoration:'none'}}> Login</Link></h5>}

        <div className="loginPage">
          <hr />
        </div>
        
         {user && <span className='log' onClick={logout}>Logout</span>}
         <Link to={'/create'} >
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
