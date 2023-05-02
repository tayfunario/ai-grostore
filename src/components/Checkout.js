import React, { useEffect, useState } from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, push } from "firebase/database";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillBasket2Fill, BsFillPersonFill } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux';
import { Header } from './Components';
import { clearCart } from '../redux/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Detail() {
    const location = useLocation();
    const navigate = useNavigate();

    const [darkMode, setDarkMode] = useState(false);
    const [user, setUser] = useState(null);
    const [userID, setUserID] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

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
    const database = getDatabase(app);
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.displayName);
                setUserID(user.uid);
            } else {
                navigate('/ai-grostore')
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

    const handleCardNumberChange = (event) => {
        const input = event.target.value;
        if (input.length > 19) return;
        const cardNumber = input.replace(/\D/g, '');
        const formattedCardNumber = cardNumber.replace(/(\d{4})/g, '$1 ');

        setCardNumber(formattedCardNumber.trim());
    };

    const handleExpirationDateChange = (event) => {
        const input = event.target.value;
        const cardExpDate = input.replace(/\D/g, '');

        if (cardExpDate.length > 4) return;

        let formattedExpDate = '';
        if (cardExpDate.length >= 2) {
            formattedExpDate = cardExpDate.slice(0, 2);
            if (cardExpDate.length > 2) {
                formattedExpDate += '/' + cardExpDate.slice(2);
            }
        } else {
            formattedExpDate = cardExpDate;
        }

        setExpirationDate(formattedExpDate.trim());
    };

    const handleCVVChange = (event) => {
        const input = event.target.value;
        if (input.length > 3) return;
        const cvv = input.replace(/\D/g, '');
        setCvv(cvv);
    };

    const handleFirstNameChange = (event) => {
        const input = event.target.value;
        const firstName = input.replace(/[^a-zA-Z\s]/g, '');
        setFirstName(firstName);
    };

    const handleLastNameChange = (event) => {
        const input = event.target.value;
        const lastName = input.replace(/[^a-zA-Z\s]/g, '');
        setLastName(lastName);
    };

    const handleCountryChange = (event) => {
        const input = event.target.value;
        const country = input.replace(/[^a-zA-Z\s]/g, '');
        setCountry(country);
    };

    const handleCityChange = (event) => {
        const input = event.target.value;
        const city = input.replace(/[^a-zA-Z\s]/g, '');
        setCity(city);
    };

    const handleDistrictChange = (event) => {
        const input = event.target.value;
        const district = input.replace(/[^a-zA-Z\s]/g, '');
        setDistrict(district);
    };

    const handlePostalCodeChange = (event) => {
        const input = event.target.value;
        if (input.length > 5) return;
        const postalCode = input.replace(/\D/g, '');
        setPostalCode(postalCode);
    };

    const handleAddressChange = (event) => {
        const input = event.target.value;
        const address = input.replace(/[^a-zA-Z0-9\s,.-]/g, '');
        setAddress(address);
    };

    const handlePhoneNumberChange = (event) => {
        const input = event.target.value;
        if (input.length > 13) return;
        const cleaned = input.replace(/\D/g, '');
        let formattedNumber = '';
        for (let i = 0; i < cleaned.length; i++) {
            if (i === 3 || i === 6 || i === 8) {
                formattedNumber += ' ';
            }
            formattedNumber += cleaned[i];
        }
        setPhoneNumber(formattedNumber);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (/^[a-zA-Z]{3,}$/.test(firstName) === false) {
            notifyError('First name is too short');
            return
        }
        else if (/^[a-zA-Z]{2,}$/.test(lastName) === false) {
            notifyError('Last name is too short');
            return
        }
        else if (/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(cardNumber) === false) {
            notifyError('Invalid card number');
            return
        }
        else if (/^(0[1-9]|1[0-2])\/(2[3-9]|2[3-9][0-9])$/.test(expirationDate) === false) {
            notifyError('Invalid expiration date. Please use MM/YY format');
            return
        }
        else if (/^\d{3}$/.test(cvv) === false) {
            notifyError('Invalid CVV');
            return
        }
        else if (/^[a-zA-Z ]{3,}$/.test(country) === false) {
            notifyError('Country name is too short');
            return
        }
        else if (/^[a-zA-Z ]{3,}$/.test(city) === false) {
            notifyError('City name is too short');
            return
        }
        else if (/^[a-zA-Z ]{3,}$/.test(district) === false) {
            notifyError('District name is too short');
            return
        }
        else if (/^\d{5}$/.test(postalCode) === false) {
            notifyError('Invalid postal code');
            return
        }
        else if (/^[a-zA-Z\s.,-_/]{7,}$/.test(address) === false) {
            notifyError('Your adress must be at least 7 characters long');
            return
        }
        else if (/^\d{3}\s\d{3}\s\d{2}\s\d{2}$/.test(phoneNumber) === false) {
            notifyError('Invalid phone number');
            return
        }

        const order = {
            status: 'pending',
            date: new Date().toLocaleString(),
            clientID: userID,
            orderID: crypto.randomUUID(),
            totalPrice: cart.totalPrice,
            firstName: firstName,
            lastName: lastName,
            cardNumber: cardNumber,
            expirationDate: expirationDate,
            cvv: cvv,
            country: country,
            city: city,
            district: district,
            postalCode: postalCode,
            address: address,
            phoneNumber: phoneNumber,
            cart: cart.items.map(item => ({ id: item.id, name: item.name, quantity: item.quantity, price: item.price }))
        };
        const orderRef = ref(database, 'orders/' + userID + '/active');
        push(orderRef, order);
        notify()
        dispatch(clearCart())
        setTimeout(() => navigate('/ai-grostore'), 1000)
    }

    const notify = () => toast.success("Your order has been received", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const notifyError = text => toast.error(text, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

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

            <ToastContainer position="top-right" autoClose={500} limit={3} hideProgressBar newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover={false} theme="colored" />

            <div className='xl:w-10/12 lg:w-11/12 w-full mx-auto mt-10 pb-10'>
                <div className='flex justify-evenly items-center mb-5'>
                    <div>
                        <h2 className='text-5xl dark:text-gray-200 font-bold'>Total Cost:</h2>
                        <h3 className='text-5xl text-purple-700 dark:text-purple-500 font-extrabold'>${cart.totalPrice}</h3>
                    </div>
                    <Link to='/cart'>
                        <button className='bg-blue-500 hover:bg-blue-600'>Return to cart</button>
                    </Link>
                </div>

                <div className='lg:w-1/2 md:w-2/3 sm:w-3/4 mx-auto px-10 py-5 bg-gradient-to-bl from-purple-300 to-blue-200'>
                    <form>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='col-span-2'><h2 className='text-2xl'>Card Information</h2></div>
                            <div>
                                <label htmlFor='firstName'>First Name</label>
                                <input type='text' id='firstName' placeholder='Matthew' value={firstName} onChange={handleFirstNameChange} required />
                            </div>
                            <div>
                                <label htmlFor='lastName'>Last Name</label>
                                <input type='text' id='lastName' placeholder='Harrison' value={lastName} onChange={handleLastNameChange} required />
                            </div>
                            <div className='col-span-2'>
                                <label htmlFor="cardNumber">Card Number</label>
                                <input type="text" id='cardNumber' value={cardNumber} onChange={handleCardNumberChange} placeholder="1234 1234 1234 1234" required />
                            </div>
                            <div>
                                <label htmlFor='expiryDate'>Expiry Date</label>
                                <input type='text' id='expiryDate' placeholder="MM/YY" value={expirationDate} onChange={handleExpirationDateChange} required />
                            </div>
                            <div>
                                <label htmlFor='cvv'>CVV</label>
                                <input type="text" id="cvv" placeholder='123' value={cvv} onChange={handleCVVChange} required />
                            </div>
                        </div>

                        <div className='grid grid-cols-2 gap-2 mt-5'>
                            <div className='col-span-2'><h2 className='text-2xl'>Address</h2></div>
                            <div>
                                <label htmlFor='country'>Country</label>
                                <input type="text" id="country" placeholder='United States' value={country} onChange={handleCountryChange} required />
                            </div>
                            <div>
                                <label htmlFor='city'>City</label>
                                <input type="text" id="city" placeholder='New York' value={city} onChange={handleCityChange} required />
                            </div>
                            <div>
                                <label htmlFor='district'>District</label>
                                <input type="text" id="district" placeholder='Brooklyn' value={district} onChange={handleDistrictChange} required />
                            </div>
                            <div>
                                <label htmlFor='postalCode'>Postal Code</label>
                                <input type="text" id="postalCode" placeholder='11201' value={postalCode} onChange={handlePostalCodeChange} required />
                            </div>
                            <div>
                                <label htmlFor='address'>Address</label>
                                <input type="textarea" id="address" placeholder='1234 Main St.' value={address} onChange={handleAddressChange} required />
                            </div>
                            <div>
                                <label htmlFor='phone'>Phone Number</label>
                                <input type="text" id="phone" placeholder='(123) 456 78 90' value={phoneNumber} onChange={handlePhoneNumberChange} required />
                            </div>
                            <div className='col-span-2'>
                                <button type='submit' className='block mx-auto bg-purple-500 text-xl px-4 shadow-lg shadow-gray-500' onClick={handleSubmit}>Complete Order</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
