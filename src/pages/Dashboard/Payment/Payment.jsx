import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe('pk_test_51NJ1TQAL2rmJJYlwiQpr352w6xDgbndgJvFQlFjyyr72Vd5DcEDc2XP522cpgQgOi1A2UtwAVQdgbjDfzGjimshT00zwgBNlKx');
console.log(stripePromise)
const Payment = () => {
    const { id } = useParams();
    // console.log(typeof(id))
    const [axiosSecure] = useAxiosSecure();
    const { data: classItem = []} = useQuery({
        queryKey: ['classItem', id],
        queryFn: async () => {
            const res = await axiosSecure(`/classes/payment/${id}`)
            console.log('res from axios', res)
            return res.data;
        }
    })

    const price = classItem.price;
    // const price = parseFloat(amount)
    console.log(price)
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm price={price} classItem={classItem}></CheckoutForm>
        </Elements>
    );
};

export default Payment;