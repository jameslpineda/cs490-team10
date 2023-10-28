import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Settings: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<boolean>(false);
/*
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(true);
    };
*/
    return (
        <div className="bg-gray-100">
            <div>
                <div className="flex p-4 bg-white">
                    <div className="w-1/2 text-left text-2xl font-bold">Profile</div>
                    <div className="w-1/2 text-right">John Doe</div>
                </div>
            </div>
            <h2 className="text-xl font-semibold pt-6 pl-8">User Information</h2>
            <div className="flex px-8 py-4">
                <div className="w-1/2 bg-white p-4 rounded-md">
                    <label htmlFor="firstName" className="text-gray-600 block">First Name</label>
                    <input type="text" id="firstName" className="w-full p-2 border rounded-md shadow" placeholder="John"/>
                </div>
                <div className="w-1/2 bg-white p-4 rounded-md">
                    <label htmlFor="lastName" className="text-gray-600 block">Last Name</label>
                    <input type="text" id="lastName" className="w-full p-2 border rounded-md shadow" placeholder="Doe"/>
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
                    <input type="text" id="pomodoro" className="w-full p-2 border rounded-md shadow" placeholder="25"/>
                </div>
                <div className="w-1/3 bg-white p-4 rounded-md">
                    <label htmlFor="shortbreak" className="text-gray-600 block">Short Break</label>
                    <input type="text" id="shortbreak" className="w-full p-2 border rounded-md shadow" placeholder="5"/>
                </div>
                <div className="w-1/3 bg-white p-4 rounded-md">
                    <label htmlFor="shortbreak" className="text-gray-600 block">Long Break</label>
                    <input type="text" id="shortbreak" className="w-full p-2 border rounded-md shadow" placeholder="15"/>
                </div>
            </div>
        </div>
    );
};

export default Settings;