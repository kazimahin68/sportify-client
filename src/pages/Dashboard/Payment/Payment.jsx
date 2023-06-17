import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
// console.log(stripePromise)
const Payment = () => {
    const { id } = useParams();
    console.log(id)
    const [axiosSecure] = useAxiosSecure();
    const { data: classItem = [] } = useQuery({
        queryKey: ['classItem', id],
        queryFn: async () => {
            const res = await axiosSecure(`/classes/payment/${id}`)
            // console.log('res from axios', res)
            return res.data;
        }
    })

    const price = classItem.price;
    // console.log(classItem)
    // console.log(price)
    return (
        <>
            <Helmet>
                <title>Sportify Camp || Payment</title>
            </Helmet>
            <Elements stripe={stripePromise}>
                <CheckoutForm price={price} classItem={classItem}></CheckoutForm>
            </Elements>
        </>
    );
};

export default Payment;