import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
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
    <main className={`min-h-screen m-7 mt-16 flex justify-center items-center py-tansition-all duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`container max-w-4xl mx-auto px-8 py-12 rounded-lg shadow-2xl transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Job Details</h1>
          
        </div>
        {loading && <p className='text-center text-xl font-semibold animate-pulse'>Loading...</p>}
        {error && <p className='text-center text-xl text-red-500 font-medium'>Something went wrong!</p>}
        {listing && !loading && !error && (
          <div className="space-y-8">
            <h2 className="text-5xl font-extrabold text-blue-600 dark:text-blue-400">{listing.jobTitle}</h2>
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
            <div className="p-8 rounded-lg shadow-md bg-gray-100 dark:bg-gray-700">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-300">Recruiter Information</h2>
              <ul className="mt-4 space-y-3 text-lg">
                <li className="flex items-center"><FaCheckCircle className="text-blue-500 text-2xl mr-3" /> {listing.recruiterName}</li>
                <li className="flex items-center"><FaShieldAlt className="text-purple-500 text-2xl mr-3" /> {listing.companyName}</li>
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="w-full bg-blue-500 text-white py-4 rounded-lg flex items-center justify-center text-lg font-medium hover:bg-blue-600 transition shadow-lg">
                  <FaPhoneAlt className="mr-2" /> Contact Recruiter
                </button>
                <button className="w-full bg-green-500 text-white py-4 rounded-lg flex items-center justify-center text-lg font-medium hover:bg-green-600 transition shadow-lg">
                  <FaWhatsapp className="mr-2" /> Chat on WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}