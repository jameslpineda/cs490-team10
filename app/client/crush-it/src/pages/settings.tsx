import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings:React.FC = () => {
    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [pomoTimer, setPomoTimer] = useState('25');
    const [shortBreak, setShortBreak] = useState('5');
    const [longBreak, setLongBreak] = useState('15');
    
    let navigate = useNavigate();
    const routeChange = () => {
        let path = '../';
        navigate(path);
    }

    return (
        <div className="flex">
            <div className="w-1/6 bg-gray-900">
                <h2 className="text-2xl font-semibold text-white pt-10 font-fredoka font-semibold text-center">Crush It</h2>
                <div className="flex justify-center py-4">
                    <div className="w-2/3">
                        <hr className="border-gray-600"></hr>
                    </div>
                </div>
                <div className="flex justify-center pt-8 pb-4">
                    <img className="w-13 h-13" src={process.env.PUBLIC_URL + '/image1.png'} alt="Crush It Image" />
                </div>
                <div className="flex justify-center">
                    <p className="w-1/2 text-lg text-white font-fredoka text-center">It's time to plan your day!</p>
                </div>
                <div className="flex justify-center items-center pb-10">
                    <div className="flex space-x-6 pt-4">
                        <button onClick={routeChange} className="shadow-lg w-25 text-white border border-white bg-gray-900 hover:bg-gray-800 font-semibold py-2 px-8 rounded-md" type="button">
                            Plan Day
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
                                <button className="flex p-2 text-black border border-back hover:bg-gray-100 font-semibold rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                    John Doe
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
                                                                                                                                                            setShortBreak(shortBreak)
                                                                                                                                                        }}}/>
                        </div>
                        <div className="w-1/3 bg-white p-4 rounded-md">
                            <label htmlFor="shortbreak" className="text-gray-600 block">Long Break</label>
                            <input type="number" min="1" step="any" id="shortbreak" className="w-full p-2 border rounded-md shadow" value={longBreak} onChange={(evt) => {
                                                                                                                                                        const alphaRegex = /^[0-9]*$/;
                                                                                                                                                        if (alphaRegex.test(evt.target.value)) {
                                                                                                                                                            setLongBreak(longBreak)
                                                                                                                                                        }}}/>
                        </div>
                    </div>
                    <div className="flex justify-center items-center pb-10">
                        <div className="flex space-x-6 pt-2">
                            <button onClick={routeChange} className="shadow-lg w-40 bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-md" type="button">
                                Cancel
                            </button>
                            <button className="shadow-lg w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" type="button">
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