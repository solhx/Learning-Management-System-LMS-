import React, { useEffect, useState } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/features/orders/ordersApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import socketIO from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";

 const socketId = socketIO(ENDPOINT, {
  transports: ["websocket"],
});


type Props = {
  setOpen: (value: boolean) => void;
  data: any;
  user:any;
};

const CheckOutForm: React.FC<Props> = ({ setOpen, data,user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: !loadUser });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);

      createOrder({
        courseId: data._id,
        payment_info: paymentIntent,
      });

      
    }
  };
  useEffect(() => {
  if (orderData) {
    setLoadUser(true);
    socketId.emit("notification", {
  title: "New Order",
  message: `You have a new order from ${data.name}`,
  userId: user._id,
});

    redirect(`/course-access/${data._id}`);
  }

  if (error) {
    if ("data" in error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data.message);
    }
  }
}, [orderData, error]);


  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 space-y-6"
    >
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Complete Your Purchase
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Secure payment powered by Stripe
        </p>
      </div>

      {/* Email Authentication */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Email Address
        </label>
        <LinkAuthenticationElement
          id="link-authentication-element"
          className="stripe-element"
        />
      </div>

      {/* Payment Details */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Payment Details
        </label>
        <PaymentElement
          id="payment-element"
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {/* Error/Success Message */}
      {message && (
        <div
          className={`rounded-lg p-4 ${
            message.includes("success") || message.includes("succeeded")
              ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
              : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          }`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">
              {message.includes("success") || message.includes("succeeded") ? (
                <svg
                  className="h-5 w-5 text-green-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="ml-3">
              <p
                className={`text-sm font-medium ${
                  message.includes("success") || message.includes("succeeded")
                    ? "text-green-800 dark:text-green-200"
                    : "text-red-800 dark:text-red-200"
                }`}
              >
                {message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className={`w-full py-4 px-6 rounded-lg font-semibold text-white text-lg
      transition-all duration-200 transform
      ${
        isLoading || !stripe || !elements
          ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
      }
      focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800
    `}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Processing...</span>
          </div>
        ) : (
          <span className="flex items-center justify-center space-x-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span>Pay Now</span>
          </span>
        )}
      </button>

      {/* Security Badge */}
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400 pt-4">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span>Secured by Stripe • SSL Encrypted</span>
      </div>
    </form>
  );
};

export default CheckOutForm;
