import { FormEvent, useEffect, useState } from "react";
import { supabase } from "../supabase/index";

const CardDetails = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [email, setEmail] = useState('');
    const [cvc, setCVC] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [country, setCountry] = useState('India');
    const [showForm, setShowForm] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [isFormTouched, setIsFormTouched] = useState(false);

    const [errors, setErrors] = useState({
        cardNumber: '',
        expiryDate: '',
        email: '',
        cvc: '',
        cardholderName: '',
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            cardNumber: '',
            expiryDate: '',
            email: '',
            cvc: '',
            cardholderName: '',
        };

        if (!/^\d{16}$/.test(cardNumber)) {
            newErrors.cardNumber = 'Card number must be 16 digits';
            isValid = false;
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
            isValid = false;
        } else {
            const [month, year] = expiryDate.split('/').map(Number);
            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;

            if (year < currentYear || (year === currentYear && month < currentMonth)) {
                newErrors.expiryDate = 'Expiry date must be in the future';
                isValid = false;
            }
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Invalid email address';
            isValid = false;
        }

        if (!/^\d{3,4}$/.test(cvc)) {
            newErrors.cvc = 'CVC must be 3 or 4 digits';
            isValid = false;
        }

        if (cardholderName.trim().length < 3) {
            newErrors.cardholderName = 'Cardholder name is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    useEffect(() => {
        if (isFormTouched) {
            const isValid = validateForm();
            setIsFormValid(isValid && showForm);
        }
    }, [cardNumber, expiryDate, email, cvc, cardholderName, showForm, isFormTouched]);

    const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        setExpiryDate(value);
        setIsFormTouched(true);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsFormTouched(true);
        if (validateForm()) {
            console.log('cardNumber', cardNumber);
            const { error } = await supabase.from('payment_details').insert([{ name: cardholderName, email: email, card_number: cardNumber, expiry_date: expiryDate }]).select();
            console.log('error', error);
            if (error) {
                alert("Error: " + error.message);
            }
            else {
                alert("Card details saved successfully!");
                setCardNumber('');
                setExpiryDate('');
                setEmail('');
                setCVC('');
                setCardholderName('');
                setIsFormTouched(false);
            }
        }
        else {
            console.log('Form has errors');
        }
    };


    return (
        <div className="p-4 sm:p-6 md:p-12 rounded-lg w-full flex justify-start">
            <div className="w-full max-w-[400px]">
                <button className="bg-green-500 rounded-md py-2 px-4 sm:px-6 text-black text-base sm:text-lg mb-4 flex items-center justify-center w-full">
                    Pay with
                    <svg className="block h-[1.1em] overflow-visible pl-1" focusable="false" viewBox="0 0 72 24" fill="none">
                        <path fill="#011E0F" d="M36.12 3.677c0-1.128.95-2.045 2.069-2.045 1.118 0 2.069.922 2.069 2.045a2.075 2.075 0 0 1-2.07 2.069 2.057 2.057 0 0 1-2.068-2.07ZM29.98 1.92h3.6v20.16h-3.6V1.92ZM40.008 7.68h-3.629v14.4h3.629V7.68ZM66.096 14.39c2.731-1.68 4.589-4.18 5.323-6.715H67.79c-.945 2.42-3.115 4.239-5.5 5.011V1.916h-3.63v20.16h3.63V16.08c2.77.691 4.958 3.086 5.707 5.995h3.653c-.557-3.053-2.645-5.909-5.554-7.685ZM46.44 9.293c.95-1.263 2.803-1.997 4.306-1.997 2.803 0 5.121 2.05 5.126 5.146v9.633h-3.629v-8.832c0-1.272-.566-2.74-2.405-2.74-2.16 0-3.403 1.915-3.403 4.156v7.426h-3.629V7.69h3.634v1.603ZM12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12Z"></path>
                        <path fill="#fff" d="M11.448 4.8h-3.7c.72 3.01 2.821 5.582 5.452 7.2-2.635 1.618-4.733 4.19-5.453 7.2h3.7c.918-2.784 3.457-5.203 6.577-5.698v-3.01c-3.125-.489-5.664-2.908-6.576-5.692Z"></path>
                    </svg>
                </button>

                <div className="relative flex items-center justify-center w-full my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative px-4 text-center">
                        <span className="bg-white text-gray-400 text-xs sm:text-sm px-2">
                            Or pay another way
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between bg-gray-100 rounded-lg py-2 sm:py-3 px-3 sm:px-4 shadow-sm border border-gray-300 w-full h-[36px] sm:h-[40px] mb-4">
                    <span className="text-xs sm:text-sm font-medium text-gray-600">Email</span>
                    <span className="text-xs sm:text-sm text-gray-800">demo9@ketan.com</span>
                </div>

                <div className="mb-4">Payment Method</div>
                <form onSubmit={(e) => handleSubmit(e)} className="flex items-center flex-col w-full border-black">
                    <div className="flex-1 rounded-md py-2 sm:py-3 w-full mb-2 border">
                        <label className="flex items-center space-x-2 mb-2 px-3 sm:px-4 cursor-pointer" onClick={() => setShowForm(true)}>
                            <input
                                type="radio"
                                name="payment-method"
                                className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-sm sm:text-base text-gray-700">Card</span>
                        </label>
                        {showForm && (
                            <div className="rounded-lg shadow-md p-4 sm:p-6 text-black w-full">
                                <div className="mb-4">
                                    <div className="mt-2 grid grid-cols-1 gap-3 sm:gap-4">
                                        <div className="max-w-md">
                                            <label htmlFor="card" className="text-sm sm:text-base">Card Information</label>
                                            <input
                                                type="text"
                                                id="card"
                                                value={cardNumber}
                                                onChange={(e) => setCardNumber(e.target.value)}
                                                className={`border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md p-1 sm:p-2 w-full text-sm sm:text-base`}
                                                placeholder="1234 1234 1234 1234"
                                                aria-invalid={errors.cardNumber ? "true" : "false"}
                                                aria-describedby="card-error"
                                            />
                                            {errors.cardNumber && <p id="card-error" className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                                            <div className="flex items-center mt-2">
                                                <div className="flex-1">
                                                    <input
                                                        type="text"
                                                        value={expiryDate}
                                                        onChange={handleExpiryDateChange}
                                                        className={`border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-md p-1 sm:p-2 w-full text-sm sm:text-base`}
                                                        placeholder="MM / YY"
                                                        maxLength={5}
                                                        aria-invalid={errors.expiryDate ? "true" : "false"}
                                                        aria-describedby="expiry-error"
                                                    />
                                                    {errors.expiryDate && <p id="expiry-error" className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                                                </div>
                                                <div className="flex-1 ml-2">
                                                    <input
                                                        type="text"
                                                        value={cvc}
                                                        onChange={(e) => setCVC(e.target.value)}
                                                        className={`border ${errors.cvc ? 'border-red-500' : 'border-gray-300'} rounded-md p-1 sm:p-2 w-full text-sm sm:text-base`}
                                                        placeholder="CVC"
                                                        aria-invalid={errors.cvc ? "true" : "false"}
                                                        aria-describedby="cvc-error"
                                                    />
                                                    {errors.cvc && <p id="cvc-error" className="text-red-500 text-xs mt-1">{errors.cvc}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <label htmlFor="cardholderName" className="text-sm sm:text-base">Card Holder Name</label>
                                            <input
                                                type="text"
                                                id="cardholderName"
                                                value={cardholderName}
                                                onChange={(e) => setCardholderName(e.target.value)}
                                                className={`border ${errors.cardholderName ? 'border-red-500' : 'border-gray-300'} rounded-md p-1 sm:p-2 w-full text-sm sm:text-base`}
                                                placeholder="Full name on card"
                                                aria-invalid={errors.cardholderName ? "true" : "false"}
                                                aria-describedby="cardholder-error"
                                            />
                                            {errors.cardholderName && <p id="cardholder-error" className="text-red-500 text-xs mt-1">{errors.cardholderName}</p>}
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <label htmlFor="email" className="text-sm sm:text-base">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-1 sm:p-2 w-full text-sm sm:text-base`}
                                                placeholder="Enter your email address"
                                                aria-invalid={errors.email ? "true" : "false"}
                                                aria-describedby="email-error"
                                            />
                                            {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <label htmlFor="country" className="text-sm sm:text-base">Country or region</label>
                                            <select
                                                id="country"
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                className="border border-gray-300 rounded-md p-1 sm:p-2 w-full text-sm sm:text-base"
                                            >
                                                <option value="India">India</option>
                                                <option value="United States">United States</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                                <option value="Canada">Canada</option>
                                                <option value="Australia">Australia</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <hr />
                        <label className="flex items-center space-x-2 mt-2 px-3 sm:px-4 cursor-pointer">
                            <input
                                type="radio"
                                name="payment-method"
                                className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="text-sm sm:text-base text-gray-700">Paypal</span>
                        </label>
                    </div>

                    <div className="mt-4 bg-gray-100 rounded-md py-2 sm:py-3 px-2 space-x-2 mb-4 w-full">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <input
                                type="checkbox"
                                id="saveInfo"
                                className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="saveInfo" className="text-black text-xs sm:text-sm">Securely save my information for 1-click checkout</label>
                        </div>
                        <div className="text-gray-700 text-[10px] sm:text-xs">
                            <p className="pl-5">Pay faster on test and everywhere Link is accepted.</p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`bg-blue-500 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-md w-full mb-4 text-sm sm:text-base ${!isFormValid || !showForm ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!isFormValid || !showForm}
                    >
                        Subscribe
                    </button>
                </form>

                <div className="text-gray-400 text-center mt-4 text-[11px] sm:text-xs">
                    By confirming your subscription, you allow test to charge you for future payments in accordance with
                    their terms. You can always cancel your subscription.
                </div>

                <div className="text-gray-400 text-
xs sm:text-sm text-center mt-16 sm:mt-32">
                    Powered by Stripe |{" "}
                    <a href="#" className="text-blue-500 hover:text-blue-400">
                        Terms
                    </a>{" "}
                    |{" "}
                    <a href="#" className="text-blue-500 hover:text-blue-400">
                        Privacy
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CardDetails;

