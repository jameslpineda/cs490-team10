import React, { useState }from 'react'
import { useNavigate, useParams} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {

    const {id,token} = useParams();

    const history = useNavigate();

    const userValid = async () => {
        const res = await fetch(`/forgotpassword/${id}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json()
        if (data.status == 201) {
            console.log("user valid")
        } else {
            history("*")
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Enter Your New Password </h1>
                    </div>

                    
                    <form>
                        <div className="form_input">
                            <label htmlFor="password">New Password</label>
                            <input type="password" value=""
                             onChange="" name="password" id="password" placeholder='Enter Your New Password' />
                        </div>

                        <button className='btn' onClick="">Submit</button>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}


export default ForgotPassword;