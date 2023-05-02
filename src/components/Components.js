import React, { useEffect, useState } from 'react'
import { AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai'
import { BsFillBasket2Fill, BsFillPersonFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fruitsAndVegetables, meatAndChicken, breakfast, lentils, pastries, snacks, cleanings, drinks } from '../data';

function HighlightItem({ data: { id, name, price, producer, description, img } }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({ id, name, price, producer, description, img }));
        notify();
    };

    const notify = () => toast.success("Item added to cart!", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    return (
        <div className='relative lg:w-64 md:w-60 w-56 h-[23rem] mb-5 mx-1 hover:bg-gray-100 dark:hover:bg-gray-500  hover:bg-opacity-70 border-4 border-purple-500  rounded-md'>
            <ToastContainer position="top-right" autoClose={500} limit={3} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme="colored" />

            <Link to='/detail' state={{ id, name, price, producer, description, img }}>
                <img src={img} className="max-h-44 m-auto object-contain" alt={name} />
                <div className='absolute bottom-0 w-full h-36'>
                    <h2 className='px-3 text-base font-bold text-center text-gray-700 dark:text-gray-100'>{name}</h2>

                    <div className='absolute bottom-12 w-full'>
                        <div className='flex justify-between items-center px-1'>
                            <span className='bg-blue-500 text-white text-lg rounded p-1 shadow-md shadow-gray-600'>${price}</span>
                            <span className='w-28 text-end italic text-gray-400 truncate'>{producer}</span>
                        </div>
                    </div>
                </div>
            </Link>

            <button className='absolute bottom-0 flex justify-end items-center w-full mt-2 rounded-none text-gray-100 bg-gradient bg-gradient-to-l from-purple-600 to-blue-500' onClick={handleAddToCart}>
                <AiOutlineShoppingCart className='text-xl' />
                <span className='text-sm'>Add to cart</span>
            </button>

        </div>
    )
}

function TopSellerItem({ data: { id, name, price, producer, description, img } }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({ id, name, price, producer, description, img }));
        notify();
    };

    const notify = () => toast.success("Item added to cart!", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    return (
        <div className='relative lg:w-60 md:w-56 w-52 h-[23rem] mb-5 mx-1 hover:bg-gray-300 dark:hover:bg-cyan-800  hover:bg-opacity-60 border-4 border-purple-500  rounded-md'>

            <Link to='/detail' state={{ id, name, price, producer, description, img }}>
                <img src={img} className="max-h-44 m-auto object-contain" alt={name} />
                <div className='absolute bottom-0 w-full h-36'>
                    <h2 className='text-base font-bold text-center text-gray-700 dark:text-gray-100'>{name}</h2>

                    <div className='absolute bottom-12 w-full'>
                        <div className='flex justify-between items-center px-1'>
                            <span className='bg-blue-500 text-white text-lg rounded p-1 shadow-md shadow-gray-600'>${price}</span>
                            <span className='w-28 text-end italic text-gray-400 truncate'>{producer}</span>
                        </div>
                    </div>
                </div>
            </Link>

            <button className='absolute bottom-0 flex justify-end items-center w-full mt-2 rounded-none text-gray-100 bg-gradient bg-gradient-to-l from-purple-600 to-blue-500' onClick={handleAddToCart}>
                <AiOutlineShoppingCart className='text-xl' />
                <span className='text-sm'>Add to cart</span>
            </button>

        </div>
    )
}

function Item({ data: { id, name, price, producer, description, img } }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({ id, name, price, producer, description, img }));
        notify();
    };

    const notify = () => toast.success("Item added to cart!", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    return (
        <div className='relative lg:w-60 md:w-56 w-52 h-[23rem] mb-5 mx-1 hover:bg-gray-400 dark:hover:bg-gray-600 hover:bg-opacity-50 border-4 border-purple-500  rounded-md'>

            <Link to='/detail' state={{ id, name, price, producer, description, img }}>
                <img src={img} className="max-h-44 m-auto object-contain" alt={name} />
                <div className='bottom absolute bottom-12 w-full h-36'>
                    <h2 className='text-base font-bold text-center text-gray-700 dark:text-gray-100'>{name}</h2>

                    <div className='absolute bottom-0 w-full'>
                        <div className='flex justify-between items-center px-1'>
                            <span className='bg-blue-500 text-white text-lg rounded p-1 shadow-md shadow-gray-600'>${price}</span>
                            <span className='w-28 text-end italic text-gray-400 truncate'>{producer}</span>
                        </div>
                    </div>
                </div>
            </Link>

            <button className='absolute bottom-0 flex justify-end items-center w-full mt-2 rounded-none text-gray-100 bg-gradient bg-gradient-to-l from-purple-600 to-blue-500' onClick={handleAddToCart}>
                <AiOutlineShoppingCart className='text-xl' />
                <span className='text-sm'>Add to cart</span>
            </button>

        </div>
    )
}

function Loading() {
    return (
        <div className='h-[80vh] flex justify-center items-center'>
            <div role="status">
                <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div>
        </div>
    )
}

function Header({ isFixed = false, fixedStyles = {}, handleProfile, handleDarkMode, user, cart }) {
    const [search, setSearch] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        document.addEventListener("click", event => {
            if (event.target.classList.contains('result-div') || event.target.id === 'searchInput') setIsFocused(true);
            else if (!event.target.classList.contains('result-div')) setIsFocused(false);
            else setIsFocused(false);
        })
    }, [])

    const handleSearch = (event) => {
        const text = event.target.value;
        const entireProducts = [...fruitsAndVegetables, ...meatAndChicken, ...breakfast, ...lentils, ...pastries, ...snacks, ...cleanings, ...drinks]
        const filteredProducts = entireProducts.filter(product => product.name.toLowerCase().includes(text.toLowerCase()));
        setSearchResults(filteredProducts);
        setSearch(text);
    }

    const searchStyles = (search && isFocused) ? 'h-auto' : 'h-0 overflow-hidden border-none'

    return (
        <header>
            {isFixed && <div className='h-28' />}

            <div style={fixedStyles} className='xl:w-10/12 lg:w-11/12 w-full h-28 mx-auto pb-1 px-1 bg-gradient bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400'>

                <div className='mx-auto bg-white h-full dark:bg-gray-800 px-5 py-2 grid place-items-center grid-cols-3 grid-rows-2 lg:flex lg:justify-between lg:items-center'>

                    {/* title */}
                    <Link to='/ai-grostore'>
                        <h1 className="order-first lg:order-none h-14 lg:pt-0 pt-1 lg:text-5xl text-4xl italic font-bold bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 text-transparent">grostore</h1>
                    </Link>

                    {/* search input */}
                    <div className="order-4 col-span-2 sm:place-self-center place-self-stretch lg:order-none flex items-center">
                        <input type="text" onChange={handleSearch} placeholder="Lay's Potato Chips $1.99" id='searchInput' className="relative w-80 px-1 py-2 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 outline-none rounded-r-none border-2 border-r-0 border-blue-500 focus:ring focus:ring-purple-300" />
                        <div className={`${searchStyles} result-div absolute lg:top-[4.5rem] top-24 z-50 w-80 divide-y-2 bg-gray-100 dark:bg-gray-600 border-2 border-purple-700`}>
                            {searchResults.slice(0, 4).map(product =>
                                <Link key={product.id} to='/detail' state={product} className='result-div' >
                                    <div className={`result-div flex justify-between items-center h-20 m-1 pr-5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300`}>
                                        <div className='result-div flex items-center'>
                                            <img src={product.img} className='result-div inline w-16 h-16' />
                                            <p className='result-div inline dark:text-gray-100 text-base'>{product.name}</p>
                                        </div>
                                        <p className='result-div text-2xl dark:text-gray-100 font-bold'>${product.price}</p>
                                    </div>
                                </Link>)}
                        </div>
                        <button className="px-1 py-2 bg-blue-500 hover:bg-blue-600 rounded-r-md rounded-l-none">
                            <AiOutlineSearch className='text-2xl text-white' />
                        </button>
                    </div>

                    {/* profile */}
                    <button className='order-2 lg:order-none w-24 lg:h-11 h-9 p-0 text-blue-500 hover:text-blue-400 rounded border-blue-500 border-2 flex justify-evenly items-center' onClick={handleProfile} >
                        <span className='text-sm'>{user ? user : 'Sign in'}</span>
                        <BsFillPersonFill className='text-xl' />
                    </button>

                    {/* cart */}
                    <Link to='/cart'>
                        <button className='order-3 lg:order-none rounded h-11 pl-0 pb-0 text-white bg-blue-500 hover:bg-blue-600 flex items-center'>
                            <div className='relative'>
                                <BsFillBasket2Fill className='text-lg mx-2' />
                                <span className='absolute bottom-2 text-xs font-light text-white bg-red-500 rounded px-1'>{cart.itemCount}</span>
                            </div>
                            <div className='mb-1 flex flex-col items-end'>
                                <span className='text-xs underline'>Your cart</span>
                                <span className='text-sm font-bold'>$0.0</span>
                            </div>
                        </button>
                    </Link>

                    {/* switch */}
                    <div className='order-last lg:order-none'>
                        <div className='relative flex px-2 py-2 outline outline-blue-500 rounded'>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input onClick={handleDarkMode} id='switchCheckbox' type="checkbox" value="" className="sr-only peer" />
                                <div className="w-9 h-5 bg-gray-200  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className='ml-1 text-xs font-medium select-none text-gray-700 dark:text-gray-200'>Dark Mode</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export { HighlightItem, TopSellerItem, Item, Loading, Header }