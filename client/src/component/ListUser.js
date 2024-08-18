import React,{Fragment, useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from 'react-router-dom'

import DetailUser from "./DetailUser";

const ListUser=()=>{
    const [users,setUsers] = useState([]);

    const deleteUser=async (id) =>{
        try {
            const deleteUser= await fetch(`http://localhost:5000/api/customers/${id}`,{
                method:"DELETE"
            })
            console.log(deleteUser);

            setUsers(users.filter(user=>user.user_id!==id))
            
        } catch (error) {
            console.log(error.message);
        }

    };
    
    const getUsers= async () =>{
        try {
            const response = await fetch("http://localhost:5000/api/customers");
            const jsonData= await response.json();
            // console.log(jsonData);

            setUsers(jsonData);
            // console.log(users);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(()=>{
        getUsers();
    }, []);

    console.log(users)
    return (
        <Fragment>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Level</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user,idx)=>(
                        <tr key={user.user_id}>
                            <td>{idx+1}</td>
                            <td>{user.username}</td>
                            <td>{user.level}</td>
                            <td className="d-flex">
                                {/* <Router>
                                    <Link to={`/users/${user.user_id}`}><button className="btn btn-sm btn-warning"><i className="fa fa-eye"></i> </button></Link>
                                    <Routes>
                                        <Route path="/users/:id" element={<DetailUser />} />
                                    </Routes>
                                </Router> */}
                                <button className="btn btn-danger btn-sm mx-1" onClick={()=>deleteUser(user.user_id) }><i className="fa fa-trash"></i></button>
                            </td>
                        </tr>
                    ))}                    
                </tbody>
            </table>
        </Fragment>
    );
};

export default ListUser;