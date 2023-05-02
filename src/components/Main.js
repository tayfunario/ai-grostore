import React, { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import './../App.css'
import { HighlightItem, TopSellerItem, Item, Header } from './Components';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

import { AiFillLock, AiFillSafetyCertificate, AiOutlineRight } from 'react-icons/ai'
import { FaRunning } from 'react-icons/fa'
import { fruitsAndVegetables, meatAndChicken, breakfast, lentils, pastries, snacks, cleanings, drinks } from '../data';

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swiperstyles.css";

import img1 from './../images/img1.png'
import img2 from './../images/img2.png'
import img3 from './../images/img3.png'
import img4 from './../images/img4.png'

function Main() {
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

    const [user, setUser] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [scrollDistance, setScrollDistance] = useState(0);
    const [isFixed, setIsFixed] = useState(false);

    const isSmallScreen = useMediaQuery({ query: '(max-width: 700px)' });
    const isMediumScreen = useMediaQuery({ query: '(max-width: 1024px)' });
    const slidesPerView = isSmallScreen ? 2 : 3;
    const spaceBetween = isSmallScreen ? 0 : isMediumScreen ? 5 : 10;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.displayName);
            } else {
                setUser(null);
            }
        })

        if(document.querySelector('body').classList.contains('dark')) {
            setDarkMode(true);
            document.querySelector('#switchCheckbox').checked = true;
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        const distance = window.pageYOffset;
        setScrollDistance(distance);
        setIsFixed(distance >= 200);
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

    const fixedStyles = isFixed ? {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        zIndex: '100',
    } : {};

    // { text: 'text-black', text2: 'text-gray-700', alert: 'text-red-500', bg: 'bg-white', bg2: 'bg-gray-100' }
    // { text: 'text-white', text2: 'text-gray-200', alert: 'text-red-500', bg: 'bg-gray-800', bg2: 'bg-gray-700' }
    return (
        <div className='min-h-screen dark:bg-gray-800'>
            <Header user={user} handleProfile={handleProfile} handleDarkMode={handleDarkMode} cart={cart} isFixed={isFixed} fixedStyles={fixedStyles} />

            <section id='showcase' className='xl:w-10/12 lg:w-11/12 w-full mx-auto mt-8'>
                <div className='grid lg:grid-cols-6 grid-cols-1 lg:h-96'>

                    <div className='category flex lg:flex-col flex-wrap lg:order-first order-last border-4 border-blue-500 divide-y-2 divide-blue-500 lg:rounded-l-md lg:rounded-none rounded-b-md'>
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

                    <div id='slider' className='lg:col-span-4 order-2 border-0 border-blue-500 lg:border-y-4 lg:border-x-0 border-x-4'>
                        <Swiper slidesPerView={1} spaceBetween={10} loop={true} pagination={{ clickable: true }} navigation={true} autoplay={{ delay: 3500 }} modules={[Pagination, Navigation, Autoplay]} className="w-full h-96">
                            <SwiperSlide><img src={img1} alt='free delivery' /></SwiperSlide>
                            <SwiperSlide><img src={img2} alt='20% off' /></SwiperSlide>
                            <SwiperSlide><img src={img3} alt='weekend sale' /></SwiperSlide>
                            <SwiperSlide><img src={img4} alt='sale' /></SwiperSlide>
                        </Swiper>
                    </div>

                    <div id='right-panel' className='flex lg:flex-col justify-center items-center lg:order-last order-first gap-0.5 lg:place-items-center border-4 border-blue-500 lg:rounded-none rounded-t-md lg:rounded-r-md'>
                        <div className='bg-[#FF8100]'>
                            <FaRunning className='text-blue-700 dark:text-blue-500 lg:text-3xl text-xl mr-2' />
                            <span className='text-center'>Fast</span>
                        </div>
                        <div className='bg-[#00d9ff]'>
                            <AiFillLock className='text-blue-700 dark:text-blue-500 lg:text-3xl text-xl mr-2' />
                            <span className='text-center'>Safe</span>
                        </div>
                        <div className='bg-[#F708F7]'>
                            <AiFillSafetyCertificate className='text-blue-700 dark:text-blue-500 lg:text-3xl text-xl mr-2' />
                            <span className='text-start'>High Quality</span>
                        </div>
                    </div>

                </div>
            </section>

            <section id='highlights'>
                <div className='gradient-animation xl:w-10/12 lg:w-11/12 w-full mx-auto my-10 p-1 rounded'>

                    <div className='py-5 bg-gradient-to-b from-gray-200  to-pink-300 dark:from-gray-500 dark:to-gray-700'>
                        <h2 className='mb-5 text-center text-4xl text-purple-800 dark:text-purple-400 underline underline-offset-8'>Highlights</h2>
                        <div className='flex justify-center items-center flex-wrap'>
                            <HighlightItem data={cleanings[7]} />
                            <HighlightItem data={snacks[2]} />
                            <HighlightItem data={lentils[5]} />
                            <HighlightItem data={fruitsAndVegetables[2]} />
                            <HighlightItem data={meatAndChicken[13]} />
                            <HighlightItem data={drinks[10]} />
                            <HighlightItem data={pastries[6]} />
                        </div>
                    </div>

                </div>
            </section>

            <section id='top-sellers'>
                <div className='gradient-animation xl:w-10/12 lg:w-11/12 w-full mx-auto my-10 p-1 rounded'>

                    <div className='py-5 bg-gradient-to-br from-green-100  to-yellow-200 dark:from-slate-600 dark:to-cyan-900'>
                        <h2 className='mb-5 text-center text-4xl text-purple-800 dark:text-purple-400 underline underline-offset-8'>Top Sellers</h2>
                        <div className='flex justify-center items-center flex-wrap'>
                            <TopSellerItem data={cleanings[7]} />
                            <TopSellerItem data={snacks[2]} />
                            <TopSellerItem data={lentils[5]} />
                            <TopSellerItem data={fruitsAndVegetables[2]} />
                            <TopSellerItem data={meatAndChicken[13]} />
                        </div>
                    </div>

                </div>
            </section>

            <section id='suggestions'>
                <article id='fruit-vegetable'>
                    <div className='xl:w-10/12 lg:w-11/12 w-full mx-auto my-10 py-5 bg-gradient-to-r from-green-200 dark:from-green-800 to-yellow-100 dark:to-gray-600'>
                        <h2 className='mx-5 my-3 text-2xl text-gray-700 dark:text-gray-100'>Fruits&Vegetables</h2>

                        <div className='grid md:grid-rows-1 grid-rows-2 md:grid-cols-6 grid-cols-1'>
                            <div className='md:col-span-2 col-span-1 mx-auto lg:mx-5'>
                                <img src='https://domf5oio6qrcr.cloudfront.net/medialibrary/11499/3b360279-8b43-40f3-9b11-604749128187.jpg' alt='fruits and vegetables' className='w-96 h-96 mx-2 object-cover rounded' />
                            </div>

                            <div className='md:col-span-4 col-span-1 flex'>
                                <Swiper slidesPerView={slidesPerView} spaceBetween={spaceBetween} loop={true} pagination={{ clickable: true }} navigation={true} modules={[Pagination, Navigation]}>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={fruitsAndVegetables[0]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={fruitsAndVegetables[3]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={fruitsAndVegetables[6]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={fruitsAndVegetables[10]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={fruitsAndVegetables[13]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={fruitsAndVegetables[1]} /></SwiperSlide>
                                </Swiper>

                            </div>
                        </div>
                    </div>
                </article>

                <article id='drink'>
                    <div className='xl:w-10/12 lg:w-11/12 w-full mx-auto my-10 py-5 bg-gradient-to-r from-blue-200 dark:from-blue-800 to-orange-300 dark:to-gray-700'>
                        <h2 className='mx-5 my-3 text-2xl text-gray-700 dark:text-gray-100'>Drinks</h2>

                        <div className='grid md:grid-rows-1 grid-rows-2 md:grid-cols-6 grid-cols-1'>
                            <div className='md:col-span-2 col-span-1 mx-auto lg:mx-5'>
                                <img src='https://lirp.cdn-website.com/1fdafd38/dms3rep/multi/opt/softdrinks-1920w.jpg' alt='a few drinks' className='w-96 h-96 mx-2 object-cover object-left rounded' />
                            </div>

                            <div className='md:col-span-4 col-span-1 flex'>
                                <Swiper slidesPerView={slidesPerView} spaceBetween={spaceBetween} loop={true} pagination={{ clickable: true }} navigation={true} modules={[Pagination, Navigation]}>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={drinks[0]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={drinks[3]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={drinks[6]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={drinks[10]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={drinks[13]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={drinks[1]} /></SwiperSlide>
                                </Swiper>

                            </div>
                        </div>
                    </div>
                </article>

                <article id='snack'>
                    <div className='xl:w-10/12 lg:w-11/12 w-full mx-auto my-10 py-5 bg-gradient-to-r from-amber-200 dark:from-amber-800 to-red-300 dark:to-gray-700'>
                        <h2 className='mx-5 my-3 text-2xl text-gray-700 dark:text-gray-100'>Snacks</h2>

                        <div className='grid md:grid-rows-1 grid-rows-2 md:grid-cols-6 grid-cols-1'>
                            <div className='md:col-span-2 col-span-1 mx-auto lg:mx-5'>
                                <img src='https://images.unsplash.com/photo-1621939514649-280e2ee25f60?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c25hY2tzfGVufDB8fDB8fA%3D%3D&w=1000&q=80' alt='snacks' className='w-96 h-96 mx-2 object-cover rounded' />
                            </div>

                            <div className='md:col-span-4 col-span-1 flex'>
                                <Swiper slidesPerView={slidesPerView} spaceBetween={spaceBetween} loop={true} pagination={{ clickable: true }} navigation={true} modules={[Pagination, Navigation]}>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={snacks[0]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={snacks[3]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={snacks[6]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={snacks[10]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={snacks[13]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={snacks[1]} /></SwiperSlide>
                                </Swiper>

                            </div>
                        </div>
                    </div>
                </article>

                <article id='cleaning'>
                    <div className='xl:w-10/12 lg:w-11/12 w-full mx-auto my-10 py-5 bg-gradient-to-r from-cyan-300 dark:from-emerald-800 to-emerald-400 dark:to-gray-700'>
                        <h2 className='mx-5 my-3 text-2xl text-gray-700 dark:text-gray-100'>Cleanings</h2>

                        <div className='grid md:grid-rows-1 grid-rows-2 md:grid-cols-6 grid-cols-1'>
                            <div className='md:col-span-2 col-span-1 mx-auto lg:mx-5'>
                                <img src='https://www.beatthemicrobead.org/wp-content/uploads/2019/10/detergents-e1572532760936.jpg' alt='detergent' className='w-96 h-96 mx-2 object-cover rounded' />
                            </div>

                            <div className='md:col-span-4 col-span-1 flex'>
                                <Swiper slidesPerView={slidesPerView} spaceBetween={spaceBetween} loop={true} pagination={{ clickable: true }} navigation={true} modules={[Pagination, Navigation]}>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={cleanings[0]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={cleanings[3]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={cleanings[6]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={cleanings[10]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={cleanings[13]} /></SwiperSlide>
                                    <SwiperSlide style={{ background: 'transparent' }}><Item data={cleanings[1]} /></SwiperSlide>
                                </Swiper>

                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </div >
    )
}


export default Main;