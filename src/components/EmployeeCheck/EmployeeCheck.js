import React, { useState } from 'react';
import useEmployee from '../../Hooks/useEmployee';

const EmployeeCheck = () => {

    const [employees, setEmployees] = useEmployee();
    const [searchText, setSearchText] = useState('');
    const [employeeCheck, setEmployeeCheck] = useState([]);


    const getSearchText = e => {
        const text = e.target.value;
        // console.log(text.toLocaleLowerCase())
        setSearchText(text)
    }


    const handleSearch = e => {
        e.preventDefault();

        if (!searchText) {
            alert("please input your name")
            return;
        }
        const checkEmployee = employees.filter(employee => employee.name.toLocaleLowerCase() === searchText.toLocaleLowerCase())
        setEmployeeCheck(checkEmployee);

        const check = employees.find(employee => employee.name.toLocaleLowerCase() === searchText.toLocaleLowerCase())
        console.log("check", check)

        if (!check) {
            alert("the name of employee not found")
        }

        e.target.reset()


    }
    return (
        <div className='container'>

            <div className="search">
                <form onSubmit={handleSearch} className="text-center">
                    <input type="text" onChange={getSearchText} />
                    <input type="submit" value="search" />
                </form>

                <div className='d-flex justify-content-center mt-5'>
                    {employeeCheck.map(employee => <div class="card mb-3"  style={{maxWidth:"340px"}}>
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src={employee.photo} class="img-fluid" alt="..."/>
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">{employee.name}</h5>
                                    <p class="card-text">{employee.position}</p>
                                    <p class="card-text">salary: {employee.salary}</p>
                                    <p class="card-text"><small class="text-muted">join date: {employee.date}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default EmployeeCheck;