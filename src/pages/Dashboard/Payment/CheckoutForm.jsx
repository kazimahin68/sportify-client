import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import './CheckoutForm.css'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, classItem }) => {

    // console.log(classItem)
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const { user } = useAuth();
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState();

    const [axiosSecure] = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');

    const navigate = useNavigate();
    // console.log(price)
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    // console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price, axiosSecure])

    // console.log(clientSecret)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('error', error)
            setCardError(error.message)
        }
        else {
            setCardError('');
        }

        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );
        if (confirmError) {
            setCardError(confirmError)
        }

        setProcessing(false)
        // console.log(paymentIntent)

        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id)
            const payment = {
                email: user?.email,
                className: classItem.className,
                transactionId: paymentIntent.id,
                price,
                id: classItem._id,
                date: new Date(),
                status: 'service pending'
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data)
                    // if (res.data.message === "class already enrolled") {
                    //     return toast.error('This class has already been enrolled')
                    // }
                    if (res.data.insertResult.insertedId) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Your Payment is confirmed',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/dashboard/enrolled-classes')
                    }
                })
        }
    }
    return (
        <>
            <form className="w-3/4 mx-auto" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-sm bg-orange-600 font-bold hover:bg-green-500 border-none text-white" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {cardError && <p className="text-red-600">{cardError}</p>}
            {transactionId && <p className="text-green-500">Transaction complete with transactionId: {transactionId}</p>}
        </>
    );
};

export default CheckoutForm;