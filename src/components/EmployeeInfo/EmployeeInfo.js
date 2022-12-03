import React, { useEffect, useState } from 'react';
import useEmployee from '../../Hooks/useEmployee';
import Employee from '../Employee/Employee';
import Loading from '../Loading/Loading';
import './EmployeeInfo.css';
const EmployeeInfo = () => {



    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetch("http://localhost:4000/getEmployee")
            .then(res => res.json())
            .then(data => {
                setEmployees(data)
                setLoading(true)
            })
    }, [])

    let total = 0;

    for (const test of employees) {
        total = total + parseInt(test.salary)
    }
    const EmployeeTotalSalary = new Intl.NumberFormat().format(total);
    // console.log("total price", EmployeeTotalSalary)

    return (
        <div>
         

               
               {
                   loading ?  
                     <><div className='d-flex justify-content-between'>
                     <h4>total {employees.length} employees</h4>
                     <p className='bg-success text-white p-2'>we will pay monthly <span style={{ fontWeight: "bold" }}>{EmployeeTotalSalary}</span> employees salary</p>
                 </div>
                     
                     <div className='scrolling-table '>
                     <table class="table table-hover  ">
                         <thead className='sticky-top bg-info text-white'>
                             <tr>
                                 <th scope="col">S/N</th>
                                 <th scope="col">Photo</th>
                                 <th scope="col">Name</th>
                                 <th scope="col">Email</th>
                                 <th scope="col">Position</th>
                                 <th scope="col">Join date</th>
                                 <th scope="col" title={` total salary ${EmployeeTotalSalary}`}>Salary</th>
                             </tr>
                         </thead>
     
                         <tbody>
     
                             {
                                 employees.map((employee, index) => <Employee key={index} index={index + 1} employee={employee} ></Employee>) 
                                   
                                 
                                 
                             }
     
                           
                         </tbody>
     
                     </table>
                 </div> </>: <Loading></Loading>
   
               }


        </div>
    );
};

export default EmployeeInfo;