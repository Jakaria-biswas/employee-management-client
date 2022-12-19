import React, { useState } from 'react';
import axios from 'axios';
import { FaPeopleArrows } from "react-icons/fa";
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import EmployeeCheck from '../EmployeeCheck/EmployeeCheck';
import EmployeeInfo from '../EmployeeInfo/EmployeeInfo';
import './MainPage.css';
import Manage from '../Manage/Manage';
const MainPage = () => {
    let navigate = useNavigate()


   
    const [photo, setPhoto] = useState(null)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [date, setDate] = useState('');
    const [salary, setSalary] = useState('');

    const handleImage = e => {
        // console.log(e.target.files[0])
         
        const employeePhoto = new FormData();

        employeePhoto.set("key", 'aa3d6d80d719eb49afe75ab885c9b305')
        employeePhoto.append("image", e.target.files[0])

      
         axios.post('https://api.imgbb.com/1/upload', 
         employeePhoto
         )
         .then(function (response) {
            setPhoto(response.data.data.display_url);
            // console.log("get url",photo)
         })
         .catch(function (error) {
             console.log(error);
         });
 }


    const handleAddEmployee = e => {
        e.preventDefault();

        const employee = {photo, name, email, position, date, salary }
        // console.log(employee)

        fetch("http://localhost:4000/addEmployee", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(employee)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    navigate('/')
                    alert("Employee add successful ", window.location.reload())

                }
            })
    }


    return (
        <div className='container'>
            <h2 className='bg-info text-center p-3'>Employee management system</h2>
            <div className="row">
                <div className="col-md-3 sticky-top b-shadow p-3">
                    <form onSubmit={handleAddEmployee} >
                        <div class="mb-3">
                            <input onChange={handleImage} class="form-control form-control-sm" type="file" required />
                        </div>
                        <div class="mb-3">
                            <input onBlur={(e) => setName(e.target.value)} type="text" class="form-control form-control-sm" placeholder="employee name" required />
                        </div>
                        <div class="mb-3">
                            <input onBlur={(e) => setEmail(e.target.value)} type="email" class="form-control form-control-sm" placeholder="employee email" required />
                        </div>
                        <div class="mb-3">
                            <input onBlur={(e) => setPosition(e.target.value)} type="text" class="form-control form-control-sm" placeholder="employee position" required />
                        </div>
                        <div class="mb-3">
                            <input onBlur={(e) => setDate(e.target.value)} type="date" class="form-control form-control-sm" placeholder="employee join date" required />
                        </div>
                        <div class="mb-3">
                            <input onBlur={(e) => setSalary(e.target.value)} type="text" class="form-control form-control-sm" placeholder="employee salary" required />
                        </div>
                        <div className=' text-center'>
                            <button title="add employee" style={{fontSize:"16px", fontWeight:"bold"}}  type="submit" class="btn px-2 btn-sm btn-primary">add employee</button>
                        </div>
                    </form>

                </div>
                <div className="col-md-9 t-shadow p-4">


                    <div className="Nav">
                        <ul>
                            <li><NavLink end activeclassname="active" to="/">Employee</NavLink></li>
                            <li><NavLink end activeclassname="active" to="/employeeCheck">Employee check</NavLink></li>
                            <li><NavLink end activeclassname="active" to="/manageEmployee">Mange</NavLink></li>

                        </ul>
                    </div>

                    <Routes>
                        <Route path="/" element={<EmployeeInfo></EmployeeInfo>} ></Route>
                        <Route path="/employeeCheck" element={<EmployeeCheck></EmployeeCheck>}></Route>
                        <Route path="/manageEmployee" element={<Manage></Manage>}></Route>
                    </Routes>

                </div>
            </div>
        </div>
    );
};

export default MainPage;