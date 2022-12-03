import React from 'react';


const Employee = (props) => {
        const {photo,name, email, position, date, salary} = props.employee;
        
        // const id  = Math.floor(Math.random() * 1000) i will add after
        // console.log(id)

        const EmployeeSalary = new Intl.NumberFormat().format(salary);
        var joinDate = date.split("-").reverse().join("-");
       
    return (
        <tr>
                <td>{props.index}</td>
                <td><img style={{width:"40px"}} src={photo}/></td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{position}</td>
                <td>{joinDate}</td>
                <td className='text-danger font-bold'>{EmployeeSalary}</td>
        </tr>
    );
};

export default Employee;