import logo from './logo.svg';
// import './App.css';
import './index.css';

import React, { useState } from 'react';

import TaskManager from './components/TaskManger'


function App() {
  

  return (
    <>

     <div className='flex justify-center items-center'>

     <TaskManager/>
      
     </div>
    
      
    </>
  );
}


export default App;
