import './App.css';
import Navbar from './page/Navbar';

import { Outlet } from 'react-router-dom';


function App() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
      {/* <RandomLetter></RandomLetter> */}
    </>
  )
}

export default App
