import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function Login() {

    const [payload, updatePayload] = useState({username: '', password: ''});
    const [status, setStatus] = useState('typing');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('submitting');
        try {
            const response = await submitForm(payload);
            localStorage.setItem('token', response.data.token);
            setStatus('success');
            navigate('/Home');
        } catch (err) {
            console.log("Error:", err);
            setStatus('error');
        }
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        updatePayload(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-8">
                    <div className="sm:col-span-3">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                            name="username"
                            placeholder="usuario1"
                            disabled={status === 'submitting'}
                            autoComplete="family-name"
                            onChange={handleInputChange}
                            id="username"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                    
                        <div className="mt-2">
                            <input
                                name="password"
                                id="password"
                                placeholder="password1"
                                type="password"
                                onChange={handleInputChange}
                                disabled={status === 'submitting'}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-4"></div>
                    <div className="sm:col-span-2 mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="submit" disabled={status === 'submitting'}
                            className="rounded-md bg-sky-500/100 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500/100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-sky-500/100"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </>
    );

    async function submitForm(payload) {
        return axios.post("http://localhost:8000/login/", payload);
    }
}
