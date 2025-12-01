import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom'; 

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    // -------------------- Fetch employees ---------------------
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await api.get('/emp/employees'); 
            setEmployees(res.data); 
        } 
        catch (e) {
            console.error(e.response?.data || e);
            alert('Error: Failed to fetch employees');
        }
    };

    // -------------------- Delete employee --------------------
    const deleteEmployee = async (id) => {

        // Confirm before deletion
        if (!window.confirm('Confirm delete employee?')) {
            return;
        }

        try {
            // Delete employee
            await api.delete(`/emp/employees/${id}`);
            setEmployees(employees.filter(emp => emp.employee_id !== id));
        } 

        catch (e) {
            console.error(e);
            alert('Error: Failed to delete employee');
        }
    };

    // -------------------- Logout --------------------
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // ------------------ Navigation  -----------------
    const handleAddEmployee = () => navigate('/employees/add');
    const handleView = (id) => navigate(`/employees/view/${id}`);
    const handleEdit = (id) => navigate(`/employees/edit/${id}`);

    // Generate Page
    return (
        <div>
            <h2>Employee List</h2>

            <div style={{ marginBottom: '20px' }}>
                <button onClick={handleLogout} style={{ marginRight: '10px' }}>Logout</button>
                <button onClick={handleAddEmployee}>Add Employee</button>
            </div>

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th> 
                        <th>Email</th>   
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.length === 0 ? (
                        <tr>
                            <td colSpan="5">No employees found</td>
                        </tr>
                    ):(
                        employees.map(emp => (
                            <tr key={emp.employee_id}>
                                <td>{emp.employee_id}</td>
                                <td>{emp.first_name}</td> 
                                <td>{emp.last_name}</td>
                                <td>{emp.email}</td>

                                <td>
                                    <button onClick={() => handleView(emp.employee_id)}>View</button>
                                    <button onClick={() => handleEdit(emp.employee_id)}>Update</button>
                                    <button onClick={() => deleteEmployee(emp.employee_id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default EmployeeList;
