import React, { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { HighlightItem } from './Components';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineRight } from 'react-icons/ai';
import { BsFillBasket2Fill, BsFillPersonFill } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import { fruitsAndVegetables, meatAndChicken, breakfast, lentils, pastries, snacks, cleanings, drinks } from '../data';
import { Loading, Header } from './Components';


export default function Detail() {
    const location = useLocation();

    const [darkMode, setDarkMode] = useState(false);
    const [user, setUser] = useState(null);
    const [scrollDistance, setScrollDistance] = useState(0);
    const [isFixed, setIsFixed] = useState(false);
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
    const auth = getAuth(app);
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

        setIsLoading(false);

        if(document.querySelector('body').classList.contains('dark')) {
            setDarkMode(true);
            document.querySelector('#switchCheckbox').checked = true;
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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

    const handleScroll = () => {
        const distance = window.pageYOffset;
        setScrollDistance(distance);
        setIsFixed(distance >= 200);
    };

    const fixedStyles = isFixed ? {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: '100',
    } : {};

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
            <Header handleDarkMode={handleDarkMode} user={user} handleProfile={handleProfile} cart={cart} isFixed={isFixed} fixedStyles={fixedStyles} />

            {isLoading ? <Loading />
                : <div className='xl:w-10/12 lg:w-11/12 w-full mx-auto mt-8'>
                    <div className='grid lg:grid-cols-6 lg:grid-rows-1 grid-rows-1'>

                        <div>
                            <div className='category lg:sticky lg:top-36 lg:h-96 w-full mb-5 flex lg:flex-col flex-wrap lg:order-first order-last border-4 border-blue-500 lg:divide-y-2 divide-blue-500 lg:rounded-l-md lg:rounded-none rounded-b-md'>
                                <Link to='/category' state={[[...fruitsAndVegetables], 'Fruits/Vegetables']}>
                                    Fruits/Vegetables <AiOutlineRight className='absolute right-1 text-xl' />
                                </Link>
                                <Link to='/category' state={[[...meatAndChicken], 'Meat/Chicken']}>
                                    Meat/Chicken <AiOutlineRight className='absolute right-1 text-xl' />
                                </Link>
                                <Link to='/category' state={[[...breakfast], 'Breakfast']}>
                                    Breakfast <AiOutlineRight className='absolute right-1 text-xl' />
                                </Link>
                                <Link to='/category' state={[[...drinks], 'Drinks']}>
                                    Drinks <AiOutlineRight className='absolute right-1 text-xl' />
                                </Link>
                                <Link to='/category' state={[[...lentils], 'Lentils']}>
                                    Lentils <AiOutlineRight className='absolute right-1 text-xl' />
                                </Link>
                                <Link to='/category' state={[[...pastries], 'Pastries']}>
                                    Pastries <AiOutlineRight className='absolute right-1 text-xl' />
                                </Link>
                                <Link to='/category' state={[[...snacks], 'Snacks']}>
                                    Snacks <AiOutlineRight className='absolute right-1 text-xl' />
                                </Link>
                                <Link to='/category' state={[[...cleanings], 'Cleaning']}>
                                    Cleanings <AiOutlineRight className='absolute right-1 text-xl' />
                                </Link>
                            </div>
                        </div>

                        <div className='lg:col-span-5'>
                            <h2 className='text-center text-4xl font-bold text-purple-700 dark:text-purple-500 mb-5'>{location.state[1]}</h2>
                            <div className='flex flex-wrap justify-evenly'>
                                {location.state[0].map((item) => <HighlightItem key={item.id} data={item} />)}
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}