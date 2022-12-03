import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaPenSquare } from "react-icons/fa";
import { resolvePath, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import './Manage.css';
const Mange = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState({})

    const [id, setId] = useState({})

    let navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:4000/getEmployee")
            .then(res => res.json())
            .then(data => {
                setEmployees(data)
                setLoading(true)
            })
    }, [])


    const handleDelete = dId => {

        const proceed = window.confirm("Are you sure delete the employee")

        if (proceed) {
            fetch(`http://localhost:4000/delete/${dId}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {

                    //    if(data){
                    //        alert("delete");
                    //    }

                    const remainEmployee = employees.filter(employee => employee._id !== dId)
                    setEmployees(remainEmployee)
                })
        }

    }

    const updateName = e => {

        const updateName = e.target.value;
        const updateInfo = { name: updateName, email: update.email, position: update.position, date: update.date, salary: update.salary }
        setUpdate(updateInfo)
        // console.log(update)

    }
    const updateEmail = e => {
        const updateEmail = e.target.value;
        const updateInfo = { name: update.name, email: updateEmail, position: update.position, date: update.date, salary: update.salary }
        setUpdate(updateInfo)
    }
    const updatePosition = e => {
        const updatePosition = e.target.value;
        const updateInfo = { name: update.name, email: update.email, position: updatePosition, date: update.date, salary: update.salary }
        setUpdate(updateInfo)
    }
    const updateDate = e => {
        const updateDate = e.target.value;
        const updateInfo = { name: update.name, email: update.email, position: update.position, date: updateDate, salary: update.salary }
        setUpdate(updateInfo)

    }
    const updateSalary = e => {
        const updateSalary = e.target.value;
        const updateInfo = { name: update.name, email: update.email, position: update.position, date: update.date, salary: updateSalary }
        setUpdate(updateInfo)
    }

     
    const handleUpdate = id => {
       setId(id)
       var url =`http://localhost:4000/employee/${id}`;
       
        
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setUpdate(data)
            })
        

        
        

      
    }

    // const jonDate = update.date;
    // const date = jonDate.split("-").reverse().join("-");
    // const EmployeeSalary = new Intl.NumberFormat().format(update.salary);


    const handleUpdateEmployee = (e) => {
        e.preventDefault()
        const url =`http://localhost:4000/employee/${id}`;
        fetch(url,{
            method:"PUT",
            headers: {
               'content-type':'application/json'
             },
            body: JSON.stringify(update)
       })
       .then(res => res.json())
       .then(data => {
          if(data){
         navigate('/')
            alert("Employee UPDATE successful ", window.location.reload())
        

          }
       })
     }
   


    return (
        <div>

            {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button> */}


            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" >
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">update for {update.name}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleUpdateEmployee}>

                                <div class="mb-3">
                                    <input type="text" onChange={updateName} value={update.name || ''} class="form-control form-control-sm" placeholder="employee name" />
                                </div>
                                <div class="mb-3">
                                    <input type="email" onChange={updateEmail} value={update.email || ''} class="form-control form-control-sm" placeholder="employee email" />
                                </div>
                                <div class="mb-3">
                                    <input type="text" onChange={updatePosition} value={update.position || ''} class="form-control form-control-sm" placeholder="employee position" />
                                </div>
                                <div class="mb-3">
                                    <input type="date" onChange={updateDate} value={update.date || ''} class="form-control form-control-sm" placeholder="employee join date" />
                                </div>
                                <div class="mb-3">
                                    <input type="text" onChange={updateSalary} value={update.salary || ''} class="form-control form-control-sm" placeholder="employee salary" />
                                </div>
                                <div className=' text-center'>
                                    <button title="add employee" style={{ fontSize: "16px", fontWeight: "bold" }} type="submit" class="btn px-2 btn-sm btn-primary">update</button>
                                </div>
                            </form>
                        </div>
                        {/* <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
            {
                loading ?
                    <div className='scrolling-table '>
                        <table class="table table-bordered">
                            <thead className='sticky-top bg-info text-white'>
                                <tr>
                                    <th scope="col">S/N</th>
                                    <th scope="col">Photo</th>
                                    <th scope="col">Name</th>
                                    <th className='text-center' scope="col">Update</th>
                                    <th className='text-center' scope="col">Delete</th>

                                </tr>
                            </thead>

                            <tbody>

                                {
                                    employees.map((employee, index) =>

                                        <tr>
                                            <td>{index + 1}</td>
                                            <td><img style={{ width: "40px" }} src={employee.photo} alt="" /></td>
                                            <td>{employee.name}</td>
                                            <td className='update text-primary text-center ' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleUpdate(employee._id)} ><FaPenSquare /></td>
                                            <td className='delete text-danger text-center' onClick={() => handleDelete(employee._id)}><FaTrashAlt /></td>

                                        </tr>
                                    )
                                }

                            </tbody>

                        </table>
                    </div> : <Loading></Loading>
            }
        </div>
    );
};

export default Mange;