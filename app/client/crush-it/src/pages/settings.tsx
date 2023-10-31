import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Settings:React.FC = ({/*Prop of session*/}) => {
    // TODO: update usestate with session values
    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [pomoTimer, setPomoTimer] = useState('25');
    const [shortBreak, setShortBreak] = useState('5');
    const [longBreak, setLongBreak] = useState('15');

    let navigate = useNavigate();
    const routeHome = () => {
        navigate("../");
    }

    const routeLogout = () => {
        navigate("../signIn");
    }
    const validatePassword = () => {
        let password = document.getElementById('oldpass') as HTMLInputElement;
        let newPassword = document.getElementById('newpass') as HTMLInputElement;
        let confirmNewPassword = document.getElementById('confirmnewpass') as HTMLInputElement;
        const r = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()-_+=]{12,}$/;
        
        // TODO: Update first name, last name, and timer settings
        if (password.value === "") {
            toast.success("Settings Updated", {
                position: toast.POSITION.TOP_CENTER
            });
        // TODO: Check if user inputted password matches DB password
        } else if (true) {
            if (r.test(newPassword.value)) {
                if (newPassword.value === confirmNewPassword.value) {
                    toast.success("Password Updated", {
                        position: toast.POSITION.TOP_CENTER
                    });
                    // TODO: Update password on DB
                } else {
                    toast.error("Password confirmation doesn't match", {
                        position: toast.POSITION.TOP_CENTER
                    });
                }
            } else {
                toast.error("Password doesn't fit criteria", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        } else {
            toast.error("Current Password is incorrect", {
                position: toast.POSITION.TOP_CENTER
            });
        }
    };

    return (
        <div className="flex">
            <div className="w-1/6 bg-gray-900">
                <h2 className="text-2xl text-white pt-10 font-fredoka font-semibold text-center">Crush It</h2>
                <div className="flex justify-center py-4">
                    <div className="w-2/3">
                        <hr className="border-gray-600"></hr>
                    </div>
                </div>
                <div className="flex justify-center pt-8 pb-4">
                    <img className="w-13 h-13" src={process.env.PUBLIC_URL + '/image1.png'} alt="Crush It Image" />
                </div>
                <div className="flex justify-center">
                    <p className="w-1/2 text-lg text-white font-semibold text-center">It's time to plan your day!</p>
                </div>
                <div className="flex justify-center items-center pb-20 mb-5">
                    <div className="flex space-x-6 pt-4">
                        <button onClick={routeHome} className="shadow-lg w-25 text-white border border-white bg-gray-900 hover:bg-gray-800 font-semibold py-2 px-8 rounded-md" type="button">
                            Plan Day
                        </button>
                    </div>
                </div>
                <div className="flex justify-center items-center h-48">
                    <div className="flex space-x-6">
                        <button onClick={routeLogout} className="flex shadow-lg w-25 text-white border border-white bg-gray-900 hover:bg-red-500 text-sm py-1 px-4 rounded-md" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-5/6">
                <div className="bg-gray-100">
                    <div>
                        <div className="flex ml-auto p-4 bg-white">
                            <div className="w-1/2 text-left text-2xl font-bold">Profile</div>
                            <div className="w-1/2 flex justify-end">
                                <button data-testid="name" className="flex p-2 text-black border border-back hover:bg-gray-100 font-semibold rounded-md">
                                    {firstName} {lastName}
                                </button>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold pt-6 pl-8">User Information</h2>
                    <div className="flex px-8 py-4">
                        <div className="w-1/2 bg-white p-4 rounded-md">
                            <label htmlFor="firstName" className="text-gray-600 block">First Name</label>
                            <input type="text" id="firstName" className="w-full p-2 border rounded-md shadow" value={firstName} onChange={(evt) => {
                                const alphaRegex = /^[a-zA-Z]+$/;
                                if (alphaRegex.test(evt.target.value)) {
                                    setFirstName(evt.target.value)
                                }}}/>
                        </div>
                        <div className="w-1/2 bg-white p-4 rounded-md">
                            <label htmlFor="lastName" className="text-gray-600 block">Last Name</label>
                            <input type="text" id="lastName" className="w-full p-2 border rounded-md shadow" value={lastName} onChange={(evt) => {
                                const alphaRegex = /^[a-zA-Z]+$/;
                                if (alphaRegex.test(evt.target.value)) {
                                    setLastName(evt.target.value)
                                }}}/>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold pt-6 pl-8">Change Password</h2>
                    <div className="flex px-8 py-4">
                        <div className="w-1/3 bg-white p-4 rounded-md">
                            <label htmlFor="oldpass" className="text-gray-600 block">Current Password</label>
                            <input type="password" id="oldpass" className="w-full p-2 border rounded-md shadow" placeholder="********"/>
                        </div>
                        <div className="w-1/3 bg-white p-4 rounded-md">
                            <label htmlFor="newpass" className="text-gray-600 block">New Password</label>
                            <input type="text" id="newpass" className="w-full p-2 border rounded-md shadow" placeholder="********"/>
                        </div>
                        <div className="w-1/3 bg-white p-4 rounded-md">
                            <label htmlFor="confirmnewpass" className="text-gray-600 block">Confirm New Password</label>
                            <input type="text" id="confirmnewpass" className="w-full p-2 border rounded-md shadow" placeholder="********"/>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold pt-6 pl-8">Pomodoro Timer (Minutes)</h2>
                    <div className="flex px-8 py-4">
                        <div className="w-1/3 bg-white p-4 rounded-md">
                            <label htmlFor="pomodoro" className="text-gray-600 block">Pomodoro</label>
                            <input type="number" min="1" step="any" id="pomodoro" className="w-full p-2 border rounded-md shadow"  value={pomoTimer} onChange={(evt) => {
                                                                                                                                                        const alphaRegex = /^[0-9]*$/;
                                                                                                                                                        if (alphaRegex.test(evt.target.value)) {
                                                                                                                                                            setPomoTimer(evt.target.value)
                                                                                                                                                        }}}/>
                        </div>
                        <div className="w-1/3 bg-white p-4 rounded-md">
                            <label htmlFor="shortbreak" className="text-gray-600 block">Short Break</label>
                            <input type="number" min="1" step="any" id="shortbreak" className="w-full p-2 border rounded-md shadow" value={shortBreak} onChange={(evt) => {
                                                                                                                                                        const alphaRegex = /^[0-9]*$/;
                                                                                                                                                        if (alphaRegex.test(evt.target.value)) {
                                                                                                                                                            setShortBreak(evt.target.value)
                                                                                                                                                        }}}/>
                        </div>
                        <div className="w-1/3 bg-white p-4 rounded-md">
                            <label htmlFor="longbreak" className="text-gray-600 block">Long Break</label>
                            <input type="number" min="1" step="any" id="longbreak" className="w-full p-2 border rounded-md shadow" value={longBreak} onChange={(evt) => {
                                                                                                                                                        const alphaRegex = /^[0-9]*$/;
                                                                                                                                                        if (alphaRegex.test(evt.target.value)) {
                                                                                                                                                            setLongBreak(evt.target.value)
                                                                                                                                                        }}}/>
                        </div>
                    </div>
                    <div className="flex justify-center items-center pb-10">
                        <div className="flex space-x-6 pt-2">
                            <button onClick={routeHome} className="shadow-lg w-40 bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md" type="button">
                                Cancel
                            </button>
                            <button onClick={validatePassword} className="shadow-lg w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" type="button">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;