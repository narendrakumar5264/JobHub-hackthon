import { useEffect, useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import { ThemeContext } from '../context/ThemeContext';
import { FiFilter } from 'react-icons/fi';
import { CiSearch } from "react-icons/ci";

export default function Search() {
   const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
    city: ''
  });
 
    const [showFilters, setShowFilters] = useState(false);

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
  
    const updatedData = {
      searchTerm: urlParams.get('searchTerm') || '',
      city: urlParams.get('city') || '',  // ✅ Ensure city is handled correctly
      type: urlParams.get('type') || 'all',
      parking: urlParams.get('parking') === 'true',
      furnished: urlParams.get('furnished') === 'true',
      offer: urlParams.get('offer') === 'true',
      sort: urlParams.get('sort') || 'created_at',
      order: urlParams.get('order') || 'desc',
    };
  
    setSidebardata((prev) => ({ ...prev, ...updatedData }));
  
    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      try {
        const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
        const data = await res.json();
        setListings(data);
        setShowMore(data.length > 8);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
      setLoading(false);
    };
  
    fetchListings();
  }, [location.search]);
  

  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (e.target.id === 'searchTerm' || e.target.id === 'city') { // Added city
      setSidebardata({ ...sidebardata, [e.target.id]: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
  
    if (sidebardata.searchTerm) urlParams.set('searchTerm', sidebardata.searchTerm);
    if (sidebardata.city) urlParams.set('city', sidebardata.city);  // ✅ Ensure city is set correctly
    if (sidebardata.type) urlParams.set('type', sidebardata.type);
    if (sidebardata.parking) urlParams.set('parking', sidebardata.parking);
    if (sidebardata.furnished) urlParams.set('furnished', sidebardata.furnished);
    if (sidebardata.offer) urlParams.set('offer', sidebardata.offer);
    if (sidebardata.sort) urlParams.set('sort', sidebardata.sort);
    if (sidebardata.order) urlParams.set('order', sidebardata.order);
  
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
  <div className="flex flex-col md:flex-row mt-10 md:mt-20 bg-[#0F172A] text-white">
    <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen bg-[#1E293B]">
      {/* Filter Options */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-[#1E293B] p-4 shadow-lg rounded-t-lg transition-transform ${
          showFilters ? "translate-y-0" : "translate-y-full"
        } md:relative md:translate-y-0 md:block md:shadow-none md:p-18`}
        style={{ transition: "transform 0.3s ease-in-out" }}
      >
        {/* Filter Content */}
        <div className="flex flex-col gap-2 md:mt-[20px]">
          <div className="flex gap-2">
            <input type="checkbox" id="all" className="w-5" onChange={handleChange} checked={sidebardata.type === "all"} />
            <span className="text-gray-300">Part Time</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="rent" className="w-5" onChange={handleChange} checked={sidebardata.type === "rent"} />
            <span className="text-gray-300">Internships</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="sale" className="w-5" onChange={handleChange} checked={sidebardata.type === "sale"} />
            <span className="text-gray-300">Full Time</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4">
          <div className="flex gap-2">
            <input type="checkbox" id="parking" className="w-5" onChange={handleChange} checked={sidebardata.parking} />
            <span className="text-gray-300">Remote</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="furnished" className="w-5" onChange={handleChange} checked={sidebardata.furnished} />
            <span className="text-gray-300">On-Site</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-8">
          <label className="font-semibold text-gray-200">Role:</label>
          <select
            onChange={handleChange}
            defaultValue={"created_at_desc"}
            id="sort_order"
            className="border bg-[#0F172A] text-gray-200 rounded-lg p-3"
          >
            <option value="regularPrice_desc">Software Developer</option>
            <option value="regularPrice_desc">Full Stack Developer</option>
            <option value="regularPrice_desc">BackEnd Developer</option>
            <option value="regularPrice_desc">UI/UX Designer</option>
            <option value="regularPrice_asc">Front End Developer</option>
            <option value="createdAt_desc">Data Science</option>
            <option value="createdAt_asc">DevOps</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-teal-600 text-white p-3 mt-4 rounded-lg uppercase hover:bg-teal-500 w-full md:w-auto"
        >
          Apply filter
        </button>
      </div>
    </div>

    <div className="flex-1 p-6">
      <div className="flex justify-center items-center gap-2 relative">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="city"
            placeholder="Search..."
            className="border rounded-lg p-3 w-[300px] bg-[#1E293B] text-white"
            value={sidebardata.city}
            onChange={handleChange}
          />
          <button
            onClick={handleSubmit}
            className="absolute right-[75px] md:right-[450px] top-1/2 transform -translate-y-1/2 text-white p-2 rounded-md hover:opacity-95"
          >
            <CiSearch className="w-5 h-5" />
          </button>
        </form>

        <button
          className="md:hidden flex items-center gap-2 bg-teal-600 text-white p-3 rounded-lg uppercase hover:bg-teal-500"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiFilter className="w-6 h-6" />
        </button>
      </div>

      <div className="mt-4">
        <h1 className="text-2xl md:text-4xl font-bold border-b-4 border-teal-500 p-2 text-gray-200 mt-2 shadow-sm">
          Jobs in <span className="text-teal-400">{sidebardata.city}</span>:
        </h1>

        <div className="p-14 pt-4 flex flex-wrap gap-4 max-w-7xl">
          {!loading && listings.length === 0 && (
            <p className="text-xl text-gray-400">No listing found!</p>
          )}
          {loading && (
            <p className="text-xl text-gray-400 text-center w-full">Loading...</p>
          )}

          {!loading &&
            listings &&
            listings.map((listing) => <ListingItem key={listing._id} listing={listing} />)}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-teal-400 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

  
  );
}