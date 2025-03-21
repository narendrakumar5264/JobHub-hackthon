import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FaBath,
  FaBed,
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
    <main className="bg-gray-50 min-h-screen mt-16">
      {loading && <p className='text-center my-7 text-2xl text-gray-700 font-medium'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl text-red-600 font-medium'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div className="container mx-auto px-6 py-4 md:py-9 md:m-3">
          <div className="relative">
            <div className="absolute top-5 right-5 z-10 border-2 rounded-full w-12 h-12 flex justify-center items-center bg-white cursor-pointer shadow-lg transition-all duration-300 ease-in-out hover:bg-gray-200">
              <FaShare
                className="text-gray-600"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
            {copied && (
              <p className="absolute top-16 right-5 z-10 bg-white p-2 rounded-md shadow-md text-sm text-green-600 font-semibold">
                Link copied!
              </p>
            )}
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-4xl font-semibold text-gray-900">{listing.jobTitle}</p>
            <div className="flex items-center mt-2">
              <p className="text-lg font-medium text-gray-600 flex items-center">
                <FaMapMarkerAlt className="inline-block text-green-700 mr-2" />
                {listing.address}, {listing.city}
              </p>
            </div>
            <p className="text-3xl text-gray-900 font-bold mt-6">₹ {listing.salary} per annum</p>
            <p className="mt-6 text-gray-800 text-lg font-light leading-relaxed">
              <span className="font-semibold text-gray-900">Job Description:</span> {listing.description}
            </p>

            <ul className="grid grid-cols-2 gap-8 mt-6 text-gray-600">
              <li className="flex items-center">
                <FaUserTie className="text-blue-700 text-xl mr-3" />
                Experience Required: {listing.experienceRequired} years
              </li>
              <li className="flex items-center">
                <FaBriefcase className="text-green-700 text-xl mr-3" />
                Job Type: {listing.jobType}
              </li>
              <li className="flex items-center">
                <FaClock className="text-red-700 text-xl mr-3" />
                Working Hours: {listing.workingHours}
              </li>
              <li className="flex items-center">
                <FaBuilding className="text-purple-700 text-xl mr-3" />
                Location Type: {listing.locationType}
              </li>
            </ul>

            <div className="mt-8 flex items-center">
              <div className="flex items-center text-yellow-500 text-lg font-medium">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
                <span className="ml-2 text-gray-700">(4.5/5)</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
              <p className="font-medium">
                Interested? Contact the recruiter for more details.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/3 bg-white p-8 rounded-lg shadow-lg mt-8">
            <p className="text-2xl font-semibold text-gray-900">Recruiter Information</p>
            <ul className="mt-4 text-gray-600 list-disc pl-6 space-y-2">
              <li className="flex items-center">
                <FaCheckCircle className="text-blue-600 text-xl mr-3" />
                {listing.recruiterName}
              </li>
              <li className="flex items-center">
                <FaShieldAlt className="text-purple-700 text-xl mr-3" />
                {listing.companyName}
              </li>
            </ul>
            <div className="mt-8">
              <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-md text-center uppercase font-medium flex items-center justify-center hover:bg-blue-700 transition duration-300">
                <FaPhoneAlt className="inline-block mr-2" /> Contact Recruiter
              </button>
              <button className="w-full bg-green-600 text-white px-6 py-3 mt-4 rounded-md text-center uppercase font-medium flex items-center justify-center hover:bg-green-700 transition duration-300">
                <FaWhatsapp className="inline-block mr-2" /> Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
