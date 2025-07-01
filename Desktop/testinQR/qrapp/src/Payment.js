// RazorpayButton.js
import React, { useState } from "react";

const Payment = () => {
  const [amount, setAmount] = useState("");

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK load failed");
    };
    script.onload = () => {
      const options = {
        key: "rzp_live_Kh5Fut1EpwDwF5", // ✅ Tumhara LIVE key_id
        amount: Number(amount) * 100, // Amount in paise
        currency: "INR",
        name: "Json Softech",
        description: "Test Payment",
        image: "https://your-logo-url.com/logo.png", // Optional
        handler: function (response) {
          alert("Payment successful!");
          console.log("Razorpay response", response);
          // ⚠️ Backend verification yaha nahi ho raha
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    };
    document.body.appendChild(script);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    loadRazorpay();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Razorpay Payment</h2>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />
      <button onClick={handleClick} style={{ padding: "10px 20px" }}>
        New Pay Now
      </button>
    </div>
  );
};

export default Payment;
