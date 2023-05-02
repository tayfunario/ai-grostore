import React, { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from './Components';
import { addToCart } from '../redux/cartSlice';

export default function Detail() {
    const location = useLocation();
    const [darkMode, setDarkMode] = useState(false);
    const [user, setUser] = useState(null);

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
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.displayName);

            } else {
                setUser(null);
            }
        });

        if (document.querySelector('body').classList.contains('dark')) {
            setDarkMode(true);
            document.querySelector('#switchCheckbox').checked = true;
        }
    }, []);

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

    const handleProfile = () => {
        if (user) {
            if (auth.currentUser.uid === "ldQ3IqAT2fUFHdJE9NCiZil1D3h1") {
                navigate('/admin');
            } else {
                navigate('/profile');
            }
        } else {
            navigate('/signin');
        }
    };

    const handleAddToCart = () => {
        dispatch(addToCart(location.state));
    };

    return (
        <div className='min-h-screen dark:bg-gray-800'>
            <Header user={user} handleProfile={handleProfile} handleDarkMode={handleDarkMode} cart={cart} />
            <div className='xl:w-10/12 lg:w-11/12 w-full mx-auto mt-8'>
                <div className='grid md:grid-cols-6 mt-14'>
                    <div className='xl:col-span-2 md:col-span-3 flex justify-start'>
                        <img src={location.state.img} alt={location.state.name} className='max-w-xs mx-auto' />
                    </div>
                    <div className='xl:col-span-4 md:col-span-3 px-5 flex flex-col justify-between md:items-end items-center h-96'>
                        <h1 className='text-4xl text-purple-700 font-bold'>{location.state.name}</h1>
                        <p className='max-w-lg text-xl text-gray-700 dark:text-gray-300 font-semibold'>{location.state.description}</p>
                        <p className='text-5xl text-blue-700 dark:text-blue-600 font-bold'>${location.state.price}</p>
                        <p className='text-xl text-gray-500 font-semibold'>{location.state.producer}</p>
                        <motion.button
                            className="bg-purple-700 text-xl mx-auto mb-5 px-7 py-4 rounded-s-2xl rounded-e-2xl"
                            onClick={handleAddToCart}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                        >
                            Add to cart
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    )
}
