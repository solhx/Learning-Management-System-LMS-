import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi';
import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import Header from '../Header';
import Heading from '@/app/utils/Heading';
import Footer from '../Routes/Footer';
import CourseDetails from './CourseDetails';
import { useGetPaymentIntentMutation, useGetStripePublishableKeyQuery } from '@/redux/features/orders/ordersApi';
import { loadStripe } from '@stripe/stripe-js';

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishableKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData, error: paymentError }] = useGetPaymentIntentMutation();

  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (config) {
      const publishableKey = config?.publishableKey;
      setStripePromise(loadStripe(publishableKey));
    }
  }, [config]);

  useEffect(() => {
    if (data && data.course) {
      console.log('Course data:', data.course);
      console.log('Course price:', data.course.price);
      console.log('Price type:', typeof data.course.price);

      // Check if price exists and is valid
      if (data.course.price != null && data.course.price !== undefined) {
        const price = Number(data.course.price);
        console.log('Parsed price:', price);
        
        if (!isNaN(price) && price > 0) {
          // Convert to cents and round
          const amount = Math.round(price * 100);
          console.log('Amount in cents:', amount);
          
          // Stripe requires minimum 50 cents (for USD)
          if (amount >= 50) {
            console.log('Creating payment intent with amount:', amount);
            createPaymentIntent(amount); // Pass amount directly, not as object
          } else {
            console.error('Amount too small. Minimum is 50 cents (0.50 USD)');
          }
        } else {
          console.error('Invalid price:', price);
        }
      } else {
        console.error('Course price is null or undefined');
      }
    }
  }, [data, createPaymentIntent]);

  useEffect(() => {
    if (paymentIntentData) {
      console.log('Payment intent data:', paymentIntentData);
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  useEffect(() => {
    if (paymentError) {
      console.error('Payment Intent Error:', paymentError);
    }
  }, [paymentError]);

  if (isLoading) {
    return <Loader />;
  }

  if (!data || !data.course) {
    return <div>Course not found</div>;
  }

  return (
    <div>
      <Heading
        title={data.course.name + " - ELearning"}
        description={
          "ELearning is a programming community which is developed by Shahriar Sajeeb for helping programmers"
        }
        keywords={data.course.tags}
      />

      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={1}
      />

      {stripePromise && (
        <CourseDetails 
          data={data?.course}
          stripePromise={stripePromise}
          clientSecret={clientSecret}
         
        setOpen={setOpen}
     
        setRoute={setRoute}
        />
    ) }

      <Footer />
    </div>
  );
};

export default CourseDetailsPage;