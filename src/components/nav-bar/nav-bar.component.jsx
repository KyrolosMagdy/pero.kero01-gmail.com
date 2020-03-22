import React from 'react';
import './nav-bar.styles.css';
const NavBar = ({onRouteChange, currentRoute}) => {
    return (
      <nav className='container' >
        {
          currentRoute === 'signin' ?
            <div className="options">
              <p className='option' onClick={() => onRouteChange('register')}> Register </p>
            </div>
            : (currentRoute === 'home' ?<div className='options'>
              <p className='option' onClick={() => onRouteChange('signin')}> Sing out</p>
            </div>: <div className='options'>
            <p className='option' onClick={() => onRouteChange('signin')}> Singin</p>
          </div> )
            

        }
      </nav>
    )
};

export default NavBar;