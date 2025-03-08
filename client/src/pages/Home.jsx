import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { IoFilter } from "react-icons/io5";
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem.jsx';
import Header from '../components/Header.jsx';
import background from '../assets/home.jpg';
import about from '../assets/boy.jpeg';
import { FaUserFriends, FaHome } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import yourGif from '../assets/gif.gif';
import { FaBuilding } from "react-icons/fa";

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
  const navigate = useNavigate();


  const [visibleCities, setVisibleCities] = useState(4); // Show only 4 cities initially

  // Function to toggle between "Show More" and "Show Less"
  const handleShowMore = () => {
    if (visibleCities === 4) {
      setVisibleCities(showcities.length); // Show all cities
    } else {
      setVisibleCities(4); // Reset to show only 4 cities
    }
  };

  SwiperCore.use([Navigation]);

  const cities = [
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


  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('company', searchTerm); // Changed 'searchTerm' to 'company'
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

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
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
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

    // Filter cities based on search term
    if (value.length > 0) {
      const filteredCities = cities.filter((company) =>
        company.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredCities);
      if (!filteredCities.length) {
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
    <div>
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
    Find <span className="text-yellow-500">Your Dream Job</span>
  </h1>
  <p className="sm:text-xl mt-4 drop-shadow-md font-medium max-w-[600px] mx-auto leading-relaxed">
    <span className="text-blue font-bold text-cyan-100">Opportunities, Growth, and Success</span> — all in one place.
  </p>
</div>

    {/* Floating Elements */}
  
  </div>





        
        {/* Search bar */}
        <form
  onSubmit={handleSubmit}
  className="absolute bg-transparent bottom-4 left-1/2 transform -translate-x-1/2 w-10/12 sm:w-full max-w-sm sm:max-w-xl md:max-w-2xl border flex items-center gap-3 
  rounded-full px-4 py-2 border-blue-700 shadow-lg"
>
  <input
    type="text"
    placeholder="Search in your location . . ."
    className="bg-transparent flex-grow px-2 text-sm text-white placeholder-white focus:outline-none"
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


      </div>

      
      <div className="relative py-20 bg-gradient-to-b from-white to-slate-50">
    <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-center gap-16">
      <div className="flex-1 space-y-6">
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
          Find your next <span className="text-cyan-600">perfect</span> place with ease
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          NKEstate revolutionizes property discovery with intelligent matching and seamless browsing.
          Experience real estate reimagined through our curated collection of exceptional properties.
        </p>
        <Link
          to="/search"
          className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-semibold group transition-colors"
        >
          Let's get started
          <FiArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="flex-1">
        <img
          src={yourGif}
          alt="Property visualization"
          className="w-full max-w-xl rounded-2xl   transform hover:scale-[1.02] transition-transform"
        />
      </div>
    </div>
  </div>

  
    






      
      <div className="bg-white">
      <div className="max-w-7xl mx-auto p-6 bg-white">
        <h2 className="text-4xl font-bold text-center text-slate-800 mb-10">
          Discover Job Opennings Across companies
        </h2>
      
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 h-8/10 md:h-full">
       
          {showcompany.slice(0, visibleCities).map((company, index) => (
              <Link to={`/search?company=${company.name}`}>
            <div
              key={index}
              className="relative group
               overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >  
                   
  <img
    src={company.image}
    alt={company.name}
    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
  />


              <div className="absolute inset-0 bg-gradient-to-t from-black   flex items-end p-4">
             
        
                <h3 className="text-white text-xl font-semibold">
               
                <h4 className='text-sm'> {company.properties}+ Opennigs  </h4> 
                  {company.name}
                </h3>
               
            
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
            {visibleCities === 4 ? "Show More" : "Show Less"}
          </button>
        </div>
      </div>
    </div>


    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
  <div className="max-w-7xl mx-auto px-4">
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-3/5 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">NK<span className="text-blue-600">Premium</span> Access</h2>
        <p className="text-gray-600 mb-6">Gain exclusive access to our portfolio of high-value properties before they hit the market.</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
            <span className="text-gray-700">Priority viewing appointments</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
            <span className="text-gray-700">Personalized property alerts</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
            <span className="text-gray-700">Exclusive market insights</span>
          </div>
        </div>
        
        <div className="flex items-center mb-6">
          <div>
            <p className="text-sm uppercase tracking-wide text-gray-500">Starting from</p>
            <p className="font-bold text-xl text-gray-900">$19.99<span className="text-sm font-normal text-gray-500">/month</span></p>
          </div>
          <Link to="/subscription" className="ml-auto">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 flex items-center">
              <span>Join NK Premium</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </Link>
        </div>
      </div>
      
      <div className="md:w-2/5 px-8 bg-blue-600 p-8 text-white flex items-center ">
        <div>
          <h3 className="text-xl font-bold mb-3  ">Why Choose NK Premium?</h3>
         <br />
          <p className="mb-4">Our premium members find their dream properties 2x faster than standard users.</p>
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
      <div className='max-w-7xl md:mx-16 p-1 flex flex-col gap-8 my-10 md:grid ml-5'>
  {offerListings && offerListings.length > 0 && (
    <div className=''>
      <div className='my-3 '>
        <h2 className='text-2xl  font-semibold text-slate-600'>Explore Our Recent Offers </h2>
        <Link className='text-sm  text-blue-800 hover:underline' to={'/search?offer=true'}>
          Show more offers
        </Link>
      </div>
      <div className='flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory   md:grid-cols-1 md:gap-5'>
        {offerListings.map((listing) => (
          <div key={listing._id} className='snap-center'>
            <ListingItem listing={listing} />
          </div>
        ))}
      </div>
    </div>
  )}
  </div>
  <div className='max-w-1xl  md:mx-0 p-2 flex flex-col gap-8  md:grid ml-0 bg-violet-50'>
  {rentListings && rentListings.length > 0 && (
    <div className='mx-5 md:mx-16 my-10 '>
      <div className='my-3'>
        <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
        <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
          Show more places for rent
        </Link>
      </div>
      <div className='flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory sm:flex-wrap'>
        {rentListings.map((listing) => (
          <div key={listing._id} className='snap-center'>
            <ListingItem listing={listing} />
          </div>
        ))}
      </div>
    </div>
  )}
  </div>

<div className='max-w-1xl  md:mx-0 p-2 flex flex-col gap-8  md:grid ml-0 bg-gray-300'>
  {saleListings && saleListings.length > 0 && (
    <div className=' mx-5 md:mx-16 my-10'>
      <div className=''>
        <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
        <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
          Show more places for sale
        </Link>
      </div>
      <div className='flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory sm:flex-wrap'>
        {saleListings.map((listing) => (
          <div key={listing._id} className='snap-center'>
            <ListingItem listing={listing} />
          </div>
        ))}
      </div>
    </div>
  )}
  </div>



<div className="bg-white p-10 mt-0">
      {/* Title */}
  
      <h2 className="text-3xl md:text-4xl  flex justify-center font-extrabold text-slate-800">
          <span className="text-black">About</span> <span className="text-blue-600">Our Brand</span>
        </h2>
        <p className="text-gray-500 flex justify-center mt-2">
          Passionate About Properties, Dedicated to Your Vision
        </p>
        
      {/* Description */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-12">
      {/* Left: Image */}
      <div className="w-full  md:w-1/3 relative">
        <img
          src={about}
          alt="Modern Building"
          className="w-full h-80 md:h-[430px] rounded-tl-[70%] rounded-tr-[5%] shadow-lg"
        />
      </div>

      {/* Right: Content */}
      <div className="w-full md:ml-24 md:w-1/2 text-center md:text-left">
     

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <h3 className="text-3xl font-bold text-slate-800">10+</h3>
            <p className="text-gray-500">Years of Excellence</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-800">12+</h3>
            <p className="text-gray-500">Projects Completed</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-800">20M+</h3>
            <p className="text-gray-500">Sq. Ft. Delivered</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-800">25+</h3>
            <p className="text-gray-500">Ongoing Projects</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mt-6 leading-relaxed">
          <span className="font-medium text-slate-800">NKEstate</span> is dedicated to helping you find your perfect home. With an extensive network of properties across cities
        </p>

        {/* CTA Button */}
        <a
          href="/about"
          className="inline-block mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md"
        >
          Learn More
        </a>
      </div>
    </div>
    </div>

    {/* Footer */}
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">NKEstate</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your trusted partner for discovering properties across the region. We make finding your dream home simple and efficient.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="text-sm text-gray-400">
            <li><Link to="/search" className="hover:underline">Search Properties</Link></li>
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/" className="hover:underline">Home</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Companies</h3>
          <ul className="text-sm text-gray-400">
            {showcompany.slice(0, 8).map((company, index) => (
              <li key={index} className="hover:underline">{company.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <p className="text-sm text-gray-400">Email: jangidnarendra858@gmail.com</p>
          <p className="text-sm text-gray-400">Phone: 9875709813</p>
          <p className="text-sm text-gray-400">Address: Jaipur, Rajasthan, India</p>
        </div>
      </div>
      <div className="text-center text-sm text-gray-600 mt-8">
        © 2025 NKEstate. All rights reserved.
      </div>
    </footer>

    </div>
  );
}
