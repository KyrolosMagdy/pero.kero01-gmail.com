import React from 'react';
import './nav-bar.styles.css';

const NavBar = ({ currentRoute }) => {
  return(
    <nav className = 'container'> 
      <div className = 'options'>
        {
          currentRoute === 'signin' ? 
            <div className = "options">
              <p className = 'option'> Sign In </p>
            </div>
            : 
            <div className="options">
              <p className = 'option'> Sing out</p> 
              <p className ='option'> Home </p>
            </div>
            
        }
        
        
      </div>
      
    </nav>
  )   
};

export default NavBar;