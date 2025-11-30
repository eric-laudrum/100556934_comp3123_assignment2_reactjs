import {useEffect, useState} from 'react';
import api from '../api/axios'
import { useNavigate } from 'react-router-dom';


function EmployeeList(){
    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();

    useEffect(()=>{
        const fetchEmployees = async () =>{
            try{
                const res = await api.get('/employees');
                setEmployees(res.data);
            } catch(e){
                console.log(e.response?.data || e);
                alert('Error: Failed to fetch employees')
            }
        };

        // Seed data
        setEmployees([
            { id: 1, firstName: 'Eric', lastName: 'IT', email: 'eric@gmail.com'}
        ]);
        
        // TODO: create backend
        // fetchEmployees()
    }, []);


    const handleLogout =() =>{
        localStorage.removeItem('token');
        navigate('/login');
    };


    // Generate employee table
    let rows;
    if(employees.length === 0){
        rows = (
            <tr>
                <td>Employees not found</td>
            </tr>

        );
    } else{
        rows = employees.map(emp =>(
            <tr key={emp.id}>
                <td>{emp.firstName}</td>
                <td>{emp.lastName}</td>
                <td>{emp.email}</td>
                <td>
                    <button>Edit</button>
                    <button>Delete</button>
                </td>
            </tr>
        ))
    }

    return(

        <div>
            <h2>Employee List</h2>

            <button onClick = { handleLogout }>Logout</button>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Position</th>
                    </tr>
                </thead>

                <tbody>
                    { rows }
                </tbody>

            </table>


        </div>


    )

}

export default EmployeeList;