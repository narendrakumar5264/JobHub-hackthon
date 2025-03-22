import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { Link } from "react-router-dom";

import { ThemeContext } from '../context/ThemeContext';
import {

  FaMapMarkerAlt,
  FaShare,
  FaStar,
  FaPhoneAlt,
  FaStarHalfAlt,
  FaWhatsapp,
  FaCheckCircle,
  FaShieldAlt,
  FaBuilding,
  FaClock,
  FaUserTie,
  FaBriefcase,
} from 'react-icons/fa';
import {  FaClipboardList } from 'react-icons/fa';

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const { theme} = useContext(ThemeContext);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main
    className={`${theme === "dark" ? "dark" : ""} bg-gray-50 dark:bg-gray-900 min-h-screen flex justify-center items-center p-6 sm:p-10 transition-colors duration-300`}
  >
    {loading && (
      <p className="text-center my-6 text-2xl text-gray-700 dark:text-gray-300 font-medium animate-pulse">
        Loading...
      </p>
    )}
    {error && (
      <p className="text-center my-6 text-2xl text-red-600 dark:text-red-400 font-medium">
        Something went wrong!
      </p>
    )}
    {listing && !loading && !error && (
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl flex relative transform transition-all duration-500 hover:scale-105 border border-gray-300 dark:border-gray-600"> 
        
        {/* Left Section - Image and Recruiter Info */}
        <div className="w-1/3 flex flex-col items-center gap-6 animate-slideInLeft">
          {listing.imageUrls.length > 0 && (
            <div className="w-full border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden shadow-md">
              <img src={listing.imageUrls[0]} alt="Company Logo" className="h-44 w-full object-cover" />
            </div>
          )}
          
          {/* Recruiter Information */}
          <div className="w-full bg-gray-100 dark:bg-gray-700 p-6 rounded-lg border border-gray-400 dark:border-gray-600">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center">Recruiter Information</p>
            <ul className="mt-4 text-gray-600 dark:text-gray-300 list-disc pl-6 space-y-2">
              <li className="flex items-center">
                <FaCheckCircle className="text-blue-600 text-lg mr-2" />
                {listing.recruiterName}
              </li>
              <li className="flex items-center">
                <FaShieldAlt className="text-purple-700 text-lg mr-2" />
                {listing.companyName}
              </li>
            </ul>
            <div className="mt-6 flex flex-col gap-4">
              <button className="w-full bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg font-medium flex items-center justify-center hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-300 animate-pulse">
                <FaPhoneAlt className="mr-2" /> Contact Recruiter
              </button>
              <button className="w-full bg-green-600 dark:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium flex items-center justify-center hover:bg-green-700 dark:hover:bg-green-800 transition duration-300 animate-pulse">
                <FaWhatsapp className="mr-2" /> Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Section - Job Details */}
        <div className="w-2/3 p-8 animate-slideInRight">
          <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 animate-fadeInUp">{listing.jobTitle}</p>
          <p className="text-xl text-gray-600 dark:text-gray-300">{listing.companyName}</p>
          <p className="text-xl text-gray-600 dark:text-gray-300">Salary: ₹{listing.salary} per annum</p>
          <div className="flex mt-2 text-gray-600 dark:text-gray-300">
            <FaMapMarkerAlt className="text-green-700 text-lg mr-2" />
            {listing.address}, {listing.city}
          </div>
          <p className="mt-4 text-gray-800 dark:text-gray-300 leading-relaxed">
            <span className="font-semibold text-gray-900 dark:text-gray-100">Job Description:</span> {listing.description}
          </p>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-gray-700 dark:text-gray-300">
            <li className="flex items-center">
              <FaUserTie className="text-blue-700 text-lg mr-2" />
              {listing.experienceRequired} years experience
            </li>
            <li className="flex items-center">
              <FaBriefcase className="text-green-700 text-lg mr-2" />
              {listing.jobType}
            </li>
            <li className="flex items-center">
              <FaClock className="text-red-700 text-lg mr-2" />
              {listing.workingHours}
            </li>
            <li className="flex items-center">
              <FaBuilding className="text-purple-700 text-lg mr-2" />
              {listing.locationType}
            </li>
          </ul>
          
          <div className="mt-4 flex items-center">
            <div className="flex items-center text-yellow-500 text-lg font-medium">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
              <span className="ml-2 text-gray-700 dark:text-gray-300">(4.5/5)</span>
            </div>
          </div>
        </div>
      </div>
    )}
  </main>
  );
}
