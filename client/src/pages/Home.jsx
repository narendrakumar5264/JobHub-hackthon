import { useEffect, useState, useContext } from 'react';
import { Link,  } from 'react-router-dom';
import { FaSearch,FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram  } from 'react-icons/fa';

import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem.jsx';
import Header from '../components/Header.jsx';
import background from '../assets/giphy3.gif';
import boyImage from '../assets/giphy6.webp';

import { FiArrowRight } from "react-icons/fi";
import yourGif from '../assets/gif.gif';
import { ThemeContext } from "../context/ThemeContext";




import samsung   from '../assets/samsung.jpeg';
import google   from '../assets/google.jpeg';
import meta  from '../assets/meta.jpeg';
import hp from '../assets/hp.jpeg';
import intuit from '../assets/intuit.jpeg';
import tcs from '../assets/tcs.jpeg';
import intel from '../assets/intel.jpeg';
import microsoft from '../assets/microsoft.jpeg';


export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [message, setMessage] = useState('');
  
  const { theme } = useContext(ThemeContext);

  const [visibleCompany, setvisibleCompany] = useState(4); 

  
  const handleShowMore = () => {
    if (visibleCompany === 4) {
      setvisibleCompany(showcompany.length); // Show all Company
    } else {
      setvisibleCompany(4); // Reset to show only 4 Company
    }
  };

  SwiperCore.use([Navigation]);

  const Company = [
    "microsoft", "intel", "tcs", "intuit", "hp", "meta", 
    "google", "adobe", "dell", "redhat", "samsung", "oracle"
  ];
  // Constants for company data
const showcompany = [

  { name: "Microsoft", image: microsoft , properties: "1234"},
  { name: "intel", image:  intel,properties: "100"},
  { name: "tcs", image:  tcs,properties: "450" },
  { name: "intuit", image:   intuit ,properties: "700"},
  { name: "hp", image:  hp,properties: "240"},
  { name: "meta", image: meta  ,properties: "100" },
  { name: "google", image:  google ,properties: "450"},

  { name: "samsung", image:  samsung ,properties: "240"},



];


 
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const companyFromUrl = urlParams.get('company'); // Changed 'searchTerm' to 'company'
    if (companyFromUrl) {
      setSearchTerm(companyFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    
    if (value.length > 0) {
      const filteredCompanies = Company.filter((company) =>
        company.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredCompanies);
      if (!filteredCompanies.length) {
        setMessage(`We currently do not operate in ${value}.`);
      } else {
        setMessage('');
      }
    } else {
      setSuggestions([]);
      setMessage('');
    }
  };

  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
 <div className="relative w-full h-full">
  <div
    className="relative h-[400px] flex flex-col justify-center items-center text-white bg-cover bg-center"
    style={{
      backgroundImage: `url(${background})`,
    }}
  >
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-800/50 to-gray-900/90"></div>

    {/* Header */}
    <div className="absolute top-0 z-10 w-full">
      <Header />
    </div>

    {/* Content */}
    <div className="relative text-center animate-fade-in">
  <h1 className="text-4xl sm:text-6xl font-extrabold drop-shadow-9xl tracking-wide leading-tight">
    Find <span className="text-yellow-400">Your Dream Job</span>
  </h1>
  <p className="sm:text-xl mt-4 drop-shadow-md font-medium max-w-[600px] mx-auto leading-relaxed">
    <span className="text-blue font-bold text-cyan-100">Opportunities, Growth, and Success</span> — all in one place.
  </p>
</div>

    {/* Floating Elements */}
  
  </div>





        
        {/* Search bar */}
        <form   className={`${theme === "dark" ? "dark" : ""} absolute bg-transparent bottom-4 left-1/2 transform
   -translate-x-1/2 w-10/12 sm:w-full max-w-sm sm:max-w-xl md:max-w-2xl border flex items-center gap-3 
  rounded-full px-4 py-2 border-blue-700 shadow-lg`}

>
  <input
    type="text"
    placeholder="Search your Dream Job . . ."
    className="  bg-transparent flex-grow px-2 text-sm text-white placeholder-white focus:outline-none"
    value={searchTerm}
    onChange={handleChange}
  />
  <button
    type="submit"
    className="flex items-center justify-center p-2 text-blue-500 rounded-full hover:bg-blue-600"
  >
    <FaSearch className="w-5 h-5" />
  </button>
</form>

        {/* Suggestions */}
        {suggestions.length > 0 && (
  <ul className="absolute bg-white w-full max-w-xl border mt-2 left-1/2 transform -translate-x-1/2 shadow-lg z-10 rounded-md overflow-hidden">
    {suggestions.map((company, index) => (
      <li
        key={index}
        className="px-4 py-3 cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition-all duration-200"
      >
        {company}, Rajasthan, India
      </li>
    ))}
  </ul>
)}


        {/* Message if company not in list */}
       {/* Suggestions and Message if company not in list */}
{suggestions.length === 0 && message && (
  <div className="absolute bg-white w-full max-w-xl border mt-2 left-1/2 transform -translate-x-1/2 shadow-md z-10 rounded-md">
    <div className="px-24 py-2 text-sm">
      {message}
    </div>
  </div>
)}


      </div >


      <div >
      <div className="relative py-20 bg-gradient-to-b from-gray-100 to-gray-100 dark:from-gray-900 dark:to-gray-800">


  <div className="max-w-5xl mx-auto px-4  flex flex-col lg:flex-row justify-between items-center gap-15">
    <div className="flex-1 space-y-6 mx-9" >
      <h2 className="text-4xl lg:text-5xl font-bold text-black-900 leading-tight">

        Take an <span className="text-cyan-600">AI-Based</span> Interview with ease
      </h2>
      <p className="text-lg text-slate-600 leading-relaxed">
       JobHub revolutionizes job searching with intelligent matching and seamless browsing.
        Experience career opportunities reimagined through our curated collection of exceptional job listings.
      </p>
      <Link
        to="/Ai_interview"
        className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-semibold group transition-colors"
      >
        Let's get started
        <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
    <div className="flex-1 ">
      <img
        src={yourGif}
        alt="Property visualization"
        className="w-full  max-w-xl rounded-xl transform hover:scale-[1.02] transition-transform"
      />
    </div>
  </div>
</div>
</div>

  
    






      

<div className="bg-white dark:bg-gray-900">

<div className="max-w-7xl mx-auto p-6 bg-white dark:bg-gray-900">


        <h2 className="text-4xl font-bold text-center text-slate-800 mb-10">
          Discover Job Opennings Across companies
        </h2>
      
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 h-8/10 md:h-full">
       
        {showcompany.slice(0, visibleCompany).map((company, index) => (
  <Link 
    to={`/search?company=${company.name}`} 
    key={index} // Move key here
  >
    <div
      className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >  
      <img
        src={company.image}
        alt={company.name}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-white-to-t from-gray-800 flex items-end p-4">
        <div>
          <h4 className="text-sm text-white">{company.properties}+ Openings</h4>
          <h3 className="text-white text-xl font-semibold">
            {company.name}
          </h3>
        </div>
      </div>
    </div>
  </Link>
))}

           
        </div>
       
        <div className="text-center mt-8">
          <button
            onClick={handleShowMore}
            className="px-6 py-3 bg-slate-800 text-white text-sm font-medium rounded-lg shadow hover:bg-slate-700 transition-all"
          >
            {visibleCompany === 4 ? "Show More" : "Show Less"}
          </button>
        </div>
      </div>
    </div>


    <section className={`py-16 transition-all duration-300 ${theme === "dark" ? "bg-gray-900" : "bg-gradient-to-r from-blue-50 to-indigo-50"}`}>


    <div className="max-w-7xl mx-auto px-4">
    <div className={`rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row transition-all duration-300 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white"}`}>
      
      {/* Left Section */}
      <div className="md:w-3/5 p-8">
        <h2 className={`text-2xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
          JobHub<span className="text-blue-600"> Premium</span> Access
        </h2>
        <p className={`mb-6 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
          Gain exclusive access to top job opportunities before they are publicly listed.
        </p>

        {/* Features List */}
        <div className="space-y-3 mb-6">
          {[
            "Priority access to top job opportunities",
            "Personalized job alerts",
            "Job Market Trends"
          ].map((text, index) => (
            <div key={index} className="flex items-center">
              <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
              </svg>
              <span className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{text}</span>
            </div>
          ))}
        </div>

        {/* Pricing Section */}
        <div className="flex items-center mb-6">
          <div>
            <p className={`text-sm uppercase tracking-wide ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Starting from</p>
            <p className={`font-bold text-xl ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              $19.99<span className={`text-sm font-normal ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>/month</span>
            </p>
          </div>
          <Link to="/subscription" className="ml-auto">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 flex items-center">
              <span>Join JobHub Premium</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className={`md:w-2/5 px-8 p-8 flex items-center transition-all duration-300 ${theme === "dark" ? "bg-gray-700 text-white" : "bg-blue-600 text-white"}`}>
        <div>
          <h3 className="text-xl font-bold mb-3">Why Choose JobHub Premium?</h3>
          <br />
          <p className="mb-4">Our premium members find their dream jobs 2x faster than standard users.</p>
          <div className="flex items-center">
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg>
            <p className="text-sm">Cancel anytime, no obligation</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>



      {/* listing results for offer, sale, and rent */}
      {/* <div className='max-w-7xl md:mx-16 p-1 flex flex-col gap-8 my-10 md:grid ml-5'>
  {offerListings && offerListings.length > 0 && (
    <div className=''>
      <div className='my-3 '>
        <h2 className='text-2xl  font-semibold text-slate-600'>Explore Our Recent Offers </h2>
        <Link className='text-sm  text-blue-100 hover:underline' to={'/search?offer=true'}>
          Show more offers
        </Link>
      </div>
      <div className='flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory   md:grid-cols-1 md:gap-5'>
        {offerListings.slice(0,3).map((listing) => (
          <div key={listing._id} className='snap-center'>
            <ListingItem listing={listing} />
          </div>
        ))}
      </div>
    </div>
  )}
  </div> */}
 <div className="max-w-6xl mx-auto p-4 md:p-8 bg-[#1E3A5F] rounded-2xl shadow-xl">
  {rentListings && rentListings.length > 0 && (
    <div className="text-center">
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-wide">
        🔥 Recent Job Openings
      </h2>

      {/* Job Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {rentListings.slice(0, 3).map((listing) => (
          <div
            key={listing._id}
            className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Job Image */}
            <div className="flex justify-center mb-4">
              <img
                src={listing.imageUrls[0] || "https://via.placeholder.com/100"}
                alt="Company Logo"
                className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
              />
            </div>

            {/* Job Title */}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-center capitalize">
              {listing.jobTitle || "Job Title"}
            </h3>

            {/* Job Location */}
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center mt-2 flex items-center justify-center gap-1">
              📍 {listing.location}
            </p>

            {/* Job Description */}
            <p className="text-gray-700 dark:text-gray-400 text-sm mt-3 text-center line-clamp-2">
              {listing.description?.substring(0, 80) || "No description available"}...
            </p>

            {/* Salary */}
            <p className="text-lg md:text-xl font-bold text-blue-600 dark:text-blue-400 mt-3 text-center">
              ₹{listing.salary}
            </p>

            {/* Job Type */}
            <p className="text-gray-500 dark:text-gray-300 text-sm text-center mt-1">
              {listing.jobType}
            </p>

            {/* Apply Button */}
            <div className="mt-4 flex justify-center">
              <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 md:px-5 md:py-2.5 rounded-md transition hover:bg-blue-700">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Browse More Companies - Styled Button */}
      <div className="mt-8 flex justify-center">
        <button className="bg-gray-700 text-white text-sm font-medium px-6 py-3 rounded-md transition hover:bg-gray-800">
          Browse More Companies →
        </button>
      </div>
    </div>
  )}
</div>



<div className="max-w-6xl mx-auto mt-8 p-6 md:p-12 bg-[#F4E5D7] rounded-2xl shadow-xl">
  {saleListings && saleListings.length > 0 && (
    <div className="text-center">
      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-wide">
        🚀 Latest Job Listings
      </h2>

      {/* Scrollable Job Listings */}
      <div className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory sm:flex-wrap mt-8 pb-4 scrollbar-hide">
        {saleListings.slice(0, 3).map((listing) => (
          <div
            key={listing._id}
            className="snap-center bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-80 transition transform hover:scale-105 hover:shadow-2xl"
          >
            {/* Job Image */}
            <div className="flex justify-center mb-4">
              <img
                src={listing.imageUrls[0] || "https://via.placeholder.com/100"}
                alt="Company Logo"
                className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
              />
            </div>

            {/* Job Title */}
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-center">
              {listing.jobTitle || "Job Title"}
            </h3>

            {/* Job Location */}
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center mt-2 flex items-center justify-center gap-1">
              📍 {listing.location}
            </p>

            {/* Job Description */}
            <p className="text-gray-700 dark:text-gray-400 text-sm mt-3 text-center line-clamp-2">
              {listing.description?.substring(0, 80) || "No description available"}...
            </p>

            {/* Salary */}
            <p className="text-xl font-bold text-green-600 dark:text-green-400 mt-3 text-center">
              ₹{listing.salary}
            </p>

            {/* Job Type */}
            <p className="text-gray-500 dark:text-gray-300 text-sm text-center mt-1">
              {listing.jobType}
            </p>

            {/* Apply Button */}
            <div className="mt-4 flex justify-center">
              <button className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-md transition hover:bg-green-700">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* "Find More Jobs" Button at the End */}
      <div className="mt-6 flex justify-center">
        <Link to={"/search?type=sale"}>
          <button className="bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-md transition hover:bg-blue-800">
            Find More Jobs →
          </button>
        </Link>
      </div>
    </div>
  )}
</div>




  <div
      className={`p-10 mt-0 transition-all duration-300 ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"}`}
    >
      {/* Title */}
      <h2
        className={`text-3xl md:text-4xl flex justify-center font-extrabold ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        <span className="text-black dark:text-white">About</span>{" "}
        <span className="text-indigo-600">JobHub</span>
      </h2>
      <p
        className={`flex justify-center mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
      >
        Your Gateway to the Best Job Opportunities
      </p>

      {/* Description */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-12">
        {/* Left: Image */}
        <div className="w-full md:w-1/3 relative">
        <img
      src={boyImage}
      alt="Professional Workspace"
      className="w-full h-80 md:h-[430px] rounded-tl-[10%] rounded-tr-[5%] shadow-xl border-4 border-indigo-500"
    />
        </div>

        {/* Right: Content */}
        <div className="w-full md:ml-24 md:w-1/2 text-center md:text-left">
          {/* Stats Grid */}
          <div
            className={`py-10 px-6 rounded-lg shadow-lg transition-all duration-300 ${
              theme === "dark" ? "bg-gray-800" : "bg-gradient-to-r from-indigo-50 to-gray-200"
            }`}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { value: "500+", label: "Top Companies" },
                { value: "1M+", label: "Jobs Available" },
                { value: "200K+", label: "Successful Hires" },
                { value: "100+", label: "Industries Covered" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 
                    ${theme === "dark" ? "bg-gray-700 hover:bg-gray-600" : "bg-white hover:bg-indigo-50"}`}
                >
                  <h3
                    className={`text-4xl font-bold ${
                      theme === "dark" ? "text-indigo-400" : "text-indigo-700"
                    }`}
                  >
                    {stat.value}
                  </h3>
                  <p
                    className={`text-sm mt-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <p
            className={`mt-6 leading-relaxed ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <span className="font-medium text-gray-900 dark:text-white">JobHub</span> is dedicated to connecting job seekers with top employers.
            Our platform offers real-time job listings, AI-driven job matching, and career guidance tailored to your expertise.
          </p>

          {/* CTA Button */}
          <a
            href="/about"
            className="inline-block mt-6 px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition-all duration-300"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>


    {/* Footer */}
    <footer className={`relative ${theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-700"} transition-all py-12`}>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* JobHub Info */}
        <div className={`p-5 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md`}>
          <h3 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-4`}>JobHub 🚀</h3>
          <p className="text-sm leading-relaxed">
            Discover job opportunities across industries. We make finding your dream job simple & efficient.
          </p>

          {/* Social Media Links */}
          <div className="flex gap-3 mt-5">
            {[
              { icon: <FaFacebookF />, color: "hover:bg-blue-500" },
              { icon: <FaTwitter />, color: "hover:bg-blue-400" },
              { icon: <FaLinkedinIn />, color: "hover:bg-blue-700" },
              { icon: <FaInstagram />, color: "hover:bg-pink-500" }
            ].map((item, index) => (
              <a key={index} href="#" className={`p-3 ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"} rounded-full ${item.color} transition`}>
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className={`p-5 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md`}>
          <h3 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-4`}>Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/search" className="hover:text-blue-500 transition">🔍 Search Jobs</Link></li>
            <li><Link to="/about" className="hover:text-blue-500 transition">ℹ️ About Us</Link></li>
            <li><Link to="/" className="hover:text-blue-500 transition">🏠 Home</Link></li>
          </ul>
        </div>

        {/* Top Companies */}
        <div className={`p-5 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md`}>
          <h3 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-4`}>Top Companies</h3>
          <ul className="space-y-2 text-sm">
            {["Google", "Microsoft", "Amazon", "Tesla", "Facebook", "Apple"].map((company, index) => (
              <li key={index} className="hover:text-blue-500 transition">{company}</li>
            ))}
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className={`p-5 ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg shadow-md`}>
          <h3 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-4`}>📩 Stay Updated</h3>
          <p className="text-sm mb-3">
            Subscribe to our newsletter for job alerts & career tips!
          </p>
          <form className={`flex ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"} rounded-lg overflow-hidden`}>
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-grow p-3 ${theme === "dark" ? "text-gray-200 bg-transparent placeholder-gray-400" : "text-gray-900 bg-white placeholder-gray-600"} outline-none`}
            />
            <button className="bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 transition">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Section */}
      <div className={`text-center text-sm mt-10 border-t ${theme === "dark" ? "border-gray-700 text-gray-400" : "border-gray-300 text-gray-600"} pt-4`}>
        © 2025 <span className="text-blue-400 font-semibold">JobHub</span>. All rights reserved.
      </div>
    </footer>
    </div>
  );
}
