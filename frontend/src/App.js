import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import EmployeeList from './pages/EmployeeList';
import './App.css';

function App() {
  return (
    
    <Router>
      <div className="App">
        <p>
          COMP3123 Assignment 2
        </p>


      

        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/employees' element={<EmployeeList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;