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
    <div className=" mt-16 flex items-center justify-center bg-gradient-to-r ">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full mx-4 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Column - Plan Selection */}
          <div className="w-full md:w-1/2 p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
            <h2 className="text-3xl font-bold mb-6 text-indigo-800">
              Premium 
            </h2>
            <p className="text-gray-600 mb-8">
              Choose the perfect Job and unlock Opportunities
            </p>

            {/* Pricing Tiers */}
            <div className="space-y-4">
              {/* Basic Plan */}
              <div
                className={`p-6 rounded-xl border-2 ${
                  selectedPlan === 'Basic' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                } cursor-pointer transition-all duration-300 hover:shadow-lg`}
                onClick={() => handlePlanChange('Basic')}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">Basic</h3>
                  <p className="text-xl font-bold text-blue-600">$9.99/mo</p>
                </div>
                <p className="text-gray-600 mb-4">Perfect for beginners</p>
                <ul className="text-gray-600">
                  <li className="mb-2 flex items-center">
                    <FaCheckCircle size={16} className="text-blue-500 mr-2" />
                    Access to basic listings
                  </li>
                  <li className="mb-2 flex items-center">
                    <FaCheckCircle size={16} className="text-blue-500 mr-2" />
                    Weekly market updates
                  </li>
                  <li className="mb-2 flex items-center opacity-50">
                    <FaInfo size={16} className="text-gray-400 mr-2" />
                    No premium insights
                  </li>
                </ul>
              </div>

              {/* Advanced Plan */}
              <div
                className={`p-6 rounded-xl border-2 ${
                  selectedPlan === 'Advanced' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'
                } cursor-pointer transition-all duration-300 hover:shadow-lg`}
                onClick={() => handlePlanChange('Advanced')}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">Advanced</h3>
                  <p className="text-xl font-bold text-purple-600">$19.99/mo</p>
                </div>
                <p className="text-gray-600 mb-4">For serious investors</p>
                <ul className="text-gray-600">
                  <li className="mb-2 flex items-center">
                    <FaCheckCircle size={16} className="text-purple-500 mr-2" />
                    Access to premium listings
                  </li>
                  <li className="mb-2 flex items-center">
                    <FaCheckCircle size={16} className="text-purple-500 mr-2" />
                    Daily market updates
                  </li>
                  <li className="mb-2 flex items-center">
                    <FaCheckCircle size={16} className="text-purple-500 mr-2" />
                    Expert advice
                  </li>
                </ul>
              </div>

              {/* Ninja Plan */}
              <div
                className={`p-6 rounded-xl border-2 ${
                  selectedPlan === 'Ninja' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'
                } cursor-pointer transition-all duration-300 hover:shadow-lg`}
                onClick={() => handlePlanChange('Ninja')}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">Ninja</h3>
                  <p className="text-xl font-bold text-green-600">$29.99/mo</p>
                </div>
                <p className="text-gray-600 mb-4">For real estate pros</p>
                <ul className="text-gray-600">
                  <li className="mb-2 flex items-center">
                    <FaCheckCircle size={16} className="text-green-500 mr-2" />
                    Access to all listings
                  </li>
                  <li className="mb-2 flex items-center">
                    <FaCheckCircle size={16} className="text-green-500 mr-2" />
                    Real-time market updates
                  </li>
                  <li className="mb-2 flex items-center">
                    <FaCheckCircle size={16} className="text-green-500 mr-2" />
                    Personalized expert advice
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Details */}
          <div className="w-full md:w-1/2 p-8 bg-white">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Complete Your Subscription</h3>
            
            <form onSubmit={handleSubmit}>
              {/* Email Section */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CiMail size={18} className="text-gray-400" />
                  </div>
                  <input
                    className="pl-10 shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Credit Card Section */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                      Card Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CiCreditCard1 size={18} className="text-gray-400" />
                      </div>
                      <input
                        className="pl-10 shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleCardChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
                        Expiry Date
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CiCalendar size={18} className="text-gray-400" />
                        </div>
                        <input
                          className="pl-10 shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          id="expiryDate"
                          type="text"
                          placeholder="MM/YY"
                          name="expiryDate"
                          value={cardDetails.expiryDate}
                          onChange={handleCardChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
                        CVV
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUnlockKeyhole size={18} className="text-gray-400" />
                        </div>
                        <input
                          className="pl-10 shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          id="cvv"
                          type="text"
                          placeholder="123"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* UPI Payment Section */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Payment Options</h3>
                <div className="flex items-center space-x-4 justify-center">
                  <button type="button" className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300">
                    <CiMail size={28} className="text-red-500 mb-2" />
                    <span className="text-sm text-gray-600">Google Pay</span>
                  </button>
                  <button type="button" className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300">
                    <CiCreditCard1 size={28} className="text-purple-500 mb-2" />
                    <span className="text-sm text-gray-600">PhonePe</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-center">
                <button
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 w-full"
                  type="submit"
                >
                  {`Subscribe to ${selectedPlan} • $${selectedPlan === 'Basic' ? '9.99' : selectedPlan === 'Advanced' ? '19.99' : '29.99'}/month`}
                </button>
              </div>
            </form>

            {/* Additional Text */}
            <p className="text-gray-500 text-sm mt-6 text-center flex items-center justify-center">
              <FaInfo size={16} className="mr-2" />
              Your subscription will automatically renew. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;