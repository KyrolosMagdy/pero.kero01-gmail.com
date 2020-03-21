import React from 'react';
import './nav-bar.styles.css';

const NavBar = ({ currentRoute }) => {
  return(
    <nav className = 'container'>
     
        {
          currentRoute === 'signin' ? 
            <div className = "options">
              <p className = 'option'> Sign In </p>
            </div>
            : 
            <div className="options">
              <p className ='option'> Home </p>
              <p className = 'option'> Sing out</p> 
            </div>
            
        }
        
        

      
    </nav>
  )   
};

export default NavBar;