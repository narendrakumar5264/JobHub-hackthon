import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeContext } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import gsap from 'gsap';
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

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const params = useParams();

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

  useEffect(() => {
    gsap.from(".job-title", { duration: 1, y: -50, opacity: 0, ease: "power3.out" });
    gsap.from(".job-details", { duration: 1, x: -50, opacity: 0, ease: "power3.out", delay: 0.5 });
    gsap.from(".recruiter-info", { duration: 1, x: 50, opacity: 0, ease: "power3.out", delay: 1 });
  }, [listing]);

  return (
    <main className={`min-h-screen mt-16 flex justify-center items-center py-10 transition-all duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className={`container max-w-5xl mx-auto px-8 py-12 rounded-xl shadow-2xl transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            className="text-4xl font-bold job-title"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}>
            Job Details
          </motion.h1>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme} 
            className="p-3 rounded-full shadow-md transition-all duration-300 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600">
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </motion.button>
        </div>
        {loading && <p className='text-center text-xl font-semibold animate-pulse'>Loading...</p>}
        {error && <p className='text-center text-xl text-red-500 font-medium'>Something went wrong!</p>}
        {listing && !loading && !error && (
          <motion.div className="space-y-8 job-details">
            <motion.h2 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}>
              {listing.jobTitle}
            </motion.h2>
            <p className="text-lg flex items-center"><FaMapMarkerAlt className="text-green-500 mr-3" /> {listing.address}, {listing.city}</p>
            <p className="text-3xl font-semibold text-gray-700 dark:text-gray-300">₹ {listing.salary} per annum</p>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300"><span className="font-semibold">Job Description:</span> {listing.description}</p>
            <ul className="grid grid-cols-2 gap-6 text-lg">
              <li className="flex items-center"><FaUserTie className="text-blue-500 text-2xl mr-3" /> Experience: {listing.experienceRequired} years</li>
              <li className="flex items-center"><FaBriefcase className="text-green-500 text-2xl mr-3" /> Job Type: {listing.jobType}</li>
              <li className="flex items-center"><FaClock className="text-red-500 text-2xl mr-3" /> Working Hours: {listing.workingHours}</li>
              <li className="flex items-center"><FaBuilding className="text-purple-500 text-2xl mr-3" /> Location Type: {listing.locationType}</li>
            </ul>
            <div className="flex items-center text-yellow-500 text-3xl">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
              <span className="ml-2 text-lg text-gray-700 dark:text-gray-300">(4.5/5)</span>
            </div>
            <motion.div className="p-8 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700 recruiter-info">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">Recruiter Information</h2>
              <ul className="mt-4 space-y-3 text-lg">
                <li className="flex items-center"><FaCheckCircle className="text-blue-500 text-2xl mr-3" /> {listing.recruiterName}</li>
                <li className="flex items-center"><FaShieldAlt className="text-purple-500 text-2xl mr-3" /> {listing.companyName}</li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}