import React, { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { BsFillBasket2Fill, BsFillPersonFill, BsFillTrashFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQuantity, clearCart } from '../redux/cartSlice';
import { Header } from './Components';

export default function Detail() {
    const [darkMode, setDarkMode] = useState(false);
    const [user, setUser] = useState(false);

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
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
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

    const handleAddToCart = data => {
        dispatch(addToCart(data));
    };

    const handleDecreaseQuantity = data => {
        dispatch(decreaseQuantity(data));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
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

    return (
        <div className='min-h-screen dark:bg-gray-800'>
            <Header handleDarkMode={handleDarkMode} user={user} handleProfile={handleProfile} cart={cart} />

            <div className='xl:w-10/12 lg:w-11/12 w-full mx-auto mt-10 pb-10'>
                <div className='flex justify-between mx-5 mb-5'>
                    <h2 className='text-5xl text-blue-700 font-light underline underline-offset-4 decoration-2'>Your Cart</h2>
                    <div>
                        <button className='bg-red-600 hover:bg-red-500 mr-2' onClick={handleClearCart}><BsFillTrashFill className='inline' /> Clear cart</button>
                        <Link to='/ai-grostore'>
                            <button className='bg-blue-700 hover:bg-blue-500 mt-2'>Return to shop</button>
                        </Link>
                    </div>
                </div>
                <div>
                    {cart.items.length ?
                        <>
                            <ul>
                                {cart.items.map(item => (
                                    <li key={item.id}>
                                        <div className='relative flex items-center bg-gray-200 dark:bg-gray-600 dark:text-gray-100 my-5 p-2'>
                                            <div className='w-36 h-36 mr-3'>
                                                <img src={item.img} className='max-w-[9rem] max-h-[9rem] mx-auto' />
                                            </div>
                                            <div>
                                                <h2 className='text-3xl'>{item.name}</h2>
                                                <h3 className='text-2xl'>${item.price}</h3>
                                                <h4 className='text-gray-600'>{item.producer}</h4>
                                            </div>

                                            <div className="absolute flex gap-5 right-5 items-end text-lg">
                                                <div className='flex flex-col font-extrabold text-black dark:text-gray-100'>
                                                    <button className="px-2 py-1" onClick={() => handleAddToCart(item)}>
                                                        <AiOutlinePlus className='text-gray-800 dark:text-gray-200' />
                                                    </button>
                                                    <span className="px-2 py-1 text-center">{item.quantity}</span>
                                                    <button className="px-2 py-1" onClick={() => handleDecreaseQuantity(item)}>
                                                        <AiOutlineMinus className='text-gray-800 dark:text-gray-200' />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>)
                                )}
                            </ul>
                            <div className='border-b border-4 border-gray-500'></div>
                            <div className='text-end text-3xl px-5 pb-10 dark:text-gray-200'>
                                Total: ${cart.totalPrice}
                            </div>

                            {user ? <Link to='/checkout'><button className='block mx-auto px-5 py-4 text-3xl font-extralight bg-gradient-to-bl from-blue-800 to-purple-600 hover:to-purple-800'>Proceed to checkout</button></Link> : <><button className='block mx-auto px-5 py-4 text-3xl font-extralight bg-gray-500' disabled={true}>Proceed to checkout</button><p className='text-red-500 text-center text-xl'>You must sign in</p></>}

                        </> : <h2 className='text-3xl text-center text-blue-700 dark:text-blue-500 font-bold mt-16'>Your cart is empty</h2>}
                </div>
            </div>
        </div>
    )
}
