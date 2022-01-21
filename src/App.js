import React from 'react';
import Dropdown from './dropdown/Dropdown.jsx'
import db from './firebase/firebaseConfig'

function App() {
 
  return ( 
    
    <Dropdown db={db}  />
       
      
    
  );
}

export default App;
