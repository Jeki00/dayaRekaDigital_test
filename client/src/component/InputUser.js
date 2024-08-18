import React,{Fragment, useState} from "react";



const InputUser=()=>{
    const [username,setUsername]=useState("");

    const submitForm = async (e)=>{
        e.preventDefault();
        const body = {username};
        try {
            await fetch("http://localhost:5000/api/customers",{
                method:"POST",
                headers:{
                    "content-type": "application/json",
                },                    
                body:JSON.stringify(body)

            });
            window.location.href = '/'

        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Fragment>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        add new customer
        </button>
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="d-flex" onSubmit={submitForm}>
                            <input type="text" className="form-control" value={username} onChange={(e)=>{
                                setUsername(e.target.value);
                                
                            }} ></input>
                            <button type="submit" className="btn btn-primary mx-1">Simpan</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </Fragment>
    );
};

export default InputUser;