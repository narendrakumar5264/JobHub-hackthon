import React, { useState } from 'react';

import { CiMail } from "react-icons/ci";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FaInfo } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { CiCreditCard1 } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";

const Subscription = () => {
  const [email, setEmail] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [selectedPlan, setSelectedPlan] = useState('Basic');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle subscription and payment logic here
    console.log('Subscribed with:', email);
    console.log('Card Details:', cardDetails);
    console.log('Selected Plan:', selectedPlan);
    alert(`Thank you for subscribing to the ${selectedPlan} plan with ${email}`);
    setEmail('');
    setCardDetails({ cardNumber: '', expiryDate: '', cvv: '' });
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    
    <div className="mt-16 flex items-center justify-center px-4 md:px-0">
      <div className="bg-white rounded-3xl shadow-xl max-w-5xl w-full overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Plan Selection */}
          <div className="w-full md:w-1/2 p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
            <h2 className="text-3xl font-extrabold text-indigo-800 mb-4">JobHub Premium</h2>
            <p className="text-gray-600 mb-6">Choose the perfect plan and unlock job opportunities.</p>

            {/* Pricing Plans */}
            <div className="space-y-4">
              {["Basic", "Advanced", "Ninja"].map((plan, index) => (
                <div
                  key={plan}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    selectedPlan === plan ? "border-indigo-500 bg-indigo-100" : "border-gray-200 bg-white"
                  }`}
                  onClick={() => handlePlanChange(plan)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-800">{plan}</h3>
                    <p className="text-xl font-bold text-indigo-600">${index *10 + 9.9}/mo</p>
                  </div>
                  <p className="text-gray-600 mb-3">{plan === "Basic" ? "For beginners" : plan === "Advanced" ? "For professionals" : "For experts"}</p>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-center">
                      <FaCheckCircle size={16} className="text-blue-500 mr-2" />
                      Access to exclusive job listings
                    </li>
                    <li className="flex items-center">
                      <FaCheckCircle size={16} className="text-blue-500 mr-2" />
                      Priority application processing
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Payment Details */}
          <div className="w-full md:w-1/2 p-8 bg-white">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Subscription</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-gray-700 font-bold mb-2">Email Address</label>
                <input
                  className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 focus:ring-2 focus:ring-indigo-500"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Payment Details */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Details</h3>
                <div className="space-y-4">
                  <input
                    className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 focus:ring-2 focus:ring-indigo-500"
                    type="text"
                    placeholder="Card Number"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardChange}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 focus:ring-2 focus:ring-indigo-500"
                      type="text"
                      placeholder="MM/YY"
                      name="expiryDate"
                      value={cardDetails.expiryDate}
                      onChange={handleCardChange}
                      required
                    />
                    <input
                      className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 focus:ring-2 focus:ring-indigo-500"
                      type="text"
                      placeholder="CVV"
                      name="cvv"
                      value={cardDetails.cvv}
                      onChange={handleCardChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <button
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 w-full"
                type="submit"
              >
                Subscribe to {selectedPlan} • ${selectedPlan === "Basic" ? "9.99" : selectedPlan === "Advanced" ? "19.99" : "29.99"}/month
              </button>
            </form>
            
            <p className="text-gray-500 text-sm mt-4 text-center">
              <FaInfo size={16} className="inline-block mr-1" /> Your subscription will auto-renew. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;