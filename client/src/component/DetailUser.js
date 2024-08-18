import React,{Fragment, useEffect, useState} from "react";
import { useParams } from "react-router-dom";

const DetailUser=(user)=>{
    const { id }= useParams();

    // console.log(id.id);


    const getUser = async () =>{
        try {
            const response = await fetch(`http://localhost:5000/api/customers/${id}`);
            const jsonData= await response.json();
            
        }catch (error) {
            console.log(error.message);
        }
    };

    useEffect(()=>{
        getUser();
    }, []);

    return( 
    
        <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">menu</th>
                    <th scope="col">harga</th>
                    <th scope="col">quantity</th>
                    <th scope="col">total harga</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
    
    )
};

export default DetailUser;