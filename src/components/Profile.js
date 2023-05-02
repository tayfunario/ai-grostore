import React, { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillBasket2Fill, BsFillPersonFill } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { Loading, Header } from './Components';

export default function Detail() {
    const [darkMode, setDarkMode] = useState(false);
    const [user, setUser] = useState(null);
    const [active, setActiveOrders] = useState([]);
    const [past, setPastOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const firebaseConfig = {
        apiKey: "AIzaSyCpnWMYLZqp1yalRqZfw3fdPk3yo1tRNWs",
        authDomain: "ai-grostore.firebaseapp.com",
        projectId: "ai-grostore",
        storageBucket: "ai-grostore.appspot.com",
        messagingSenderId: "135788517616",
        appId: "1:135788517616:web:d5727ee62dafbb74514a35"
    };
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auth = getAuth(app);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.displayName);

                const orderRef = ref(database, 'orders/' + user.uid + '/active');
                onValue(orderRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const order = snapshot.val();
                        const orderArray = [];
                        for (const key in order) {
                            orderArray.push(order[key]);
                        }
                        setActiveOrders(orderArray);
                    } else {
                        setActiveOrders([]);
                    }
                });

                const pastRef = ref(database, 'orders/' + user.uid + '/past');
                onValue(pastRef, (snapshot) => {
                    if (snapshot.exists()) {
                        const order = snapshot.val();
                        const orderArray = [];
                        for (const key in order) {
                            orderArray.push(order[key]);
                        }
                        setPastOrders(orderArray);
                    } else {
                        setPastOrders([]);
                    }
                });
            } else {
                setUser(null);
                navigate('/');
            }
        });

        setIsLoading(false);

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

    const handleSignOut = () => {
        signOut(auth).then(() => {
            setUser(null);
            navigate('/');
            dispatch(clearCart());
        })
    }

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
            <Header user={user} handleProfile={handleProfile} handleDarkMode={handleDarkMode} cart={cart} />

            {isLoading ? <Loading /> :
                <div className='xl:w-10/12 lg:w-11/12 w-full mx-auto px-2 mt-8'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-7xl dark:text-gray-300'>Welcome, <span className='text-purple-700 dark:text-purple-500'>{user}</span></h2>
                        <div>
                            <Link to='/'>
                                <button className='bg-blue-700 hover:bg-blue-500'>Return to shop</button>
                            </Link>
                            <button className='bg-purple-700 ml-2 mt-2' onClick={handleSignOut}>Sign out</button>
                        </div>
                    </div>

                    <div>
                        <h2 className='text-4xl dark:text-gray-300 mt-8'><span className='text-green-600 dark:text-green-400 font-bold'>Active</span> Orders</h2>
                        <ul className='flex justify-center flex-wrap'>
                            {active.map((order) => (
                                <li key={order.orderID}>
                                    <div className='bg-sky-300 dark:bg-sky-700 dark:text-gray-300 w-80 m-5 p-5 rounded-xl'>
                                        <p className='text-lg flex justify-between'><span className='font-bold'>Order Date: </span>{order.date}</p>
                                        <p className='truncate text-lg'><span className='font-bold'>ID: </span>{order.orderID}</p>
                                        <p className='text-lg flex justify-between'><span className='font-bold'>Total Price: </span> ${order.totalPrice}</p>
                                        <ul className='h-52 overflow-y-auto'>
                                            {order.cart.map((item) => (
                                                <li key={item.id}>
                                                    <hr />
                                                    <p>{item.name}</p>
                                                    <div className='flex justify-between'>
                                                        <p>${item.price}</p>
                                                        <p>Quantity: {item.quantity}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                            {active.length === 0 && <p className='text-2xl text-gray-600 dark:text-gray-300'>No active orders</p>}
                        </ul>
                    </div>

                    <div>
                        <h2 className='text-4xl dark:text-gray-300 mt-8'><span className='text-gray-600 font-bold'>Past</span> Orders</h2>
                        <ul className='flex justify-center flex-wrap'>
                            {past.map((order) => (
                                <li key={order.orderID}>
                                    <div className='bg-sky-300 dark:bg-sky-700 dark:text-gray-300 w-80 m-5 p-5 rounded-xl'>
                                        <p className='text-lg flex justify-between'><span className='font-bold'>Order Date: </span>{order.date}</p>
                                        <p className='truncate text-lg'><span className='font-bold'>ID: </span>{order.orderID}</p>
                                        <p className='text-lg flex justify-between'><span className='font-bold'>Total Price: </span> ${order.totalPrice}</p>
                                        <ul className='h-52 overflow-y-auto'>
                                            {order.cart.map((item) => (
                                                <li key={item.id}>
                                                    <hr />
                                                    <p>{item.name}</p>
                                                    <div className='flex justify-between'>
                                                        <p>${item.price}</p>
                                                        <p>Quantity: {item.quantity}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            ))}
                            {past.length === 0 && <p className='text-2xl text-gray-600 dark:text-gray-300 mb-5'>No past orders</p>}
                        </ul>
                    </div>

                </div>
            }
        </div>
    )
}
