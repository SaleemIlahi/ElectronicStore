import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from 'react-router-dom'

import CheckoutForm from "./CheckoutForm";
import "./payment.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe('pk_test_51KnKE5SGvx4cn5WFCqiSHrFabaVlXbvR5WB3xvKwc6LnvEYTRAMnhLralu8pRfoofxZ1TBz7sPzOzDfCi33FxomX00qt4y3Plo');

export default function Payment() {
    const [clientSecret, setClientSecret] = useState("");
    const location = useLocation()

    const totalPrice = location.state

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/api/v1/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: {price: totalPrice * 100} }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    },[totalPrice]);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="App">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}