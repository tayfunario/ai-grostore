import React, { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, update, push, remove } from "firebase/database";
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillBasket2Fill, BsFillPersonFill } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { Loading, Header } from './Components';

export default function Detail() {
    const [darkMode, setDarkMode] = useState(false);
    const [user, setUser] = useState(null);
    const [activeOrders, setActiveOrders] = useState([]);
    const [past, setPastOrders] = useState([]);
    const [loading, setLoading] = useState(true);

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
                const dbRef = ref(database, 'orders');
                onValue(dbRef, (snapshot) => {
                    const data = snapshot.val();

                    let activeArr = [];
                    let past = [];

                    for (let client in data) {
                        for (let order in data[client].active) {
                            activeArr.push([order, data[client].active[order], client]);
                        }
                    }
                    setActiveOrders(activeArr);
                });
            } else {
                setUser(null);
                navigate('/');
            }
        });

        setLoading(false);

        if(document.querySelector('body').classList.contains('dark')) {
            setDarkMode(true);
            document.querySelector('#switchCheckbox').checked = true;
        }
    }, []);

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

    const handleSend = (orderId, client, orderItself) => {
        update(ref(database, `orders/${client}/active/${orderId}`), {
            status: 'sent'
        })
        push(ref(database, `orders/${client}/past`), orderItself)
        remove(ref(database, `orders/${client}/active/${orderId}`))
    }

    return (
        <div className='min-h-screen dark:bg-gray-800'>
            <Header user={user} handleProfile={handleProfile} handleDarkMode={handleDarkMode} cart={cart} />

            {loading ? <Loading /> :
                <div className='xl:w-10/12 lg:w-11/12 w-full mx-auto mt-8 pl-2'>
                    <button className='bg-purple-700' onClick={handleSignOut}>Sign out</button>

                    <div className='mt-5'>
                        <h2 className='text-3xl dark:text-gray-200'>Awaiting orders</h2>
                        <ul className='flex justify-center flex-wrap'>
                            {activeOrders.map((order) => (
                                <li key={order[1].orderID}>
                                    <div className='bg-sky-300 w-96 m-5 p-3 rounded-xl'>
                                        <div className='bg-sky-500'>
                                            <p className='text-lg flex justify-between'><span className='font-bold'>Order Date: </span>{order[1].date}</p>
                                            <p className='truncate text-lg'><span className='font-bold'>ID: </span>{order[1].orderID}</p>
                                            <p className='text-lg flex justify-between'><span className='font-bold'>Total Price: </span> ${order[1].totalPrice}</p>
                                        </div>
                                        <div className='bg-blue-500 my-2'>
                                            <p className='text-lg flex justify-between'><span className='font-bold'>Name: </span>{`${order[1].firstName} ${order[1].lastName}`}</p>
                                            <p className='text-lg flex justify-between'><span className='font-bold'>Phone: </span>{order[1].phoneNumber}</p>
                                        </div>
                                        <div className='bg-teal-500'>
                                            <p className='text-lg flex justify-between'><span className='font-bold'>Country: </span>{order[1].country}</p>
                                            <p className='text-lg flex justify-between'><span className='font-bold'>City: </span>{order[1].city}</p>
                                            <p className='text-lg flex justify-between'><span className='font-bold'>District: </span>{order[1].district}</p>
                                            <p className='text-lg flex justify-between'><span className='font-bold'>Postal Code: </span>{order[1].postalCode}</p>
                                            <p className='text-lg flex justify-between'><span className='font-bold'>Address: </span>{order[1].address}</p>
                                        </div>
                                        <ul className='h-52 overflow-y-auto'>
                                            {order[1].cart.map((item) => (
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
                                        <button className='block w-24 mx-auto bg-purple-600 hover:bg-purple-700' onClick={() => handleSend(order[0], order[2], order[1])}>Send</button>
                                    </div>
                                </li>))}
                        </ul>
                    </div>

                </div>}
        </div>
    )
}
