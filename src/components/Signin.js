import React, { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import './../App.css'

function SignIn() {
    const firebaseConfig = {
        apiKey: "AIzaSyCpnWMYLZqp1yalRqZfw3fdPk3yo1tRNWs",
        authDomain: "ai-grostore.firebaseapp.com",
        projectId: "ai-grostore",
        storageBucket: "ai-grostore.appspot.com",
        messagingSenderId: "135788517616",
        appId: "1:135788517616:web:d5727ee62dafbb74514a35"
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (document.querySelector('body').classList.contains('dark')) {
            setDarkMode(true);
            document.querySelector('#switchCheckbox').checked = true;
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    const handleDarkMode = () => {
        if (darkMode) {
            const body = document.querySelector('body');
            body.classList.remove('dark');
            setDarkMode(false);
        } else {
            const body = document.querySelector('body');
            body.classList.add('dark');
            setDarkMode(true);
        }
    };

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/ai-grostore');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);

                const alert = document.getElementById('alert');
                alert.classList.remove('invisible');
                alert.classList.add('visible');
            });
    }

    // { text: 'text-black', text2: 'text-gray-700', alert: 'text-red-500', bg: 'bg-white', bg2: 'bg-gray-100' }
    // { text: 'text-white', text2: 'text-gray-200', alert: 'text-red-500', bg: 'bg-gray-800', bg2: 'bg-gray-700' }
    return (
        <div className='relative flex items-center justify-center h-screen bg-white dark:bg-gray-800'>

            {/* switch */}
            <div className='absolute right-5 top-5 flex px-3 py-2 outline outline-blue-500 rounded'>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input onClick={handleDarkMode} id='switchCheckbox' type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className='ml-3 text-sm font-medium text-gray-700 dark:text-gray-200'>Dark Mode</span>
                </label>
            </div>
            {/* switch */}

            <div className='rounded-lg shadow-xl p-10 bg-gray-100 dark:bg-gray-700'>
                <h1 className='text-3xl text-end text-blue-500'>Sign In</h1>
                <form>
                    <div className='mb-5'>
                        <label className='form-label' htmlFor='email'>Email</label>
                        <input type='email' name='email' id='email' placeholder='Enter your email' onChange={handleChange} />
                    </div>
                    <div className='mb-5'>
                        <label className='form-label' htmlFor='password'>Password</label>
                        <input type='password' name='password' id='password' placeholder='Enter your password' onChange={handleChange} />
                        <p id='alert' className='invisible'>E-mail or password is incorrect</p>
                    </div>
                    <div className='flex justify-between'>
                        <button className='log-btn bg-blue-500 hover:bg-blue-700' type='submit' onClick={(e) => { e.preventDefault(); signIn(); }}>Sign In</button>
                        <Link to='/signup'>
                            <button className='log-btn bg-purple-500 hover:bg-purple-700' type='submit'>Sign Up</button>
                        </Link>
                    </div>
                </form>
                <Link to='/ai-grostore'>
                    <button className='block mx-auto mt-2 bg-orange-500 hover:bg-orange-600'>Go to shop</button>
                </Link>
            </div>
        </div>
    )
}


export default SignIn;