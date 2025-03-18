import { Link } from 'react-router-dom';
import { MdLocationOn, MdWork, MdAttachMoney, MdBusiness, MdPerson } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useEffect, useRef ,useState} from 'react';
import gsap from 'gsap';

const sampleJobs = [
  {
    _id: "1",
    recruiterName: "John Doe",
    companyName: "Google",
    jobTitle: "Software Engineer",
    location: "Mountain View, CA",
    salary: "₹20,00,000 - ₹25,00,000",
    jobType: "Full-time",
    description: "Looking for a skilled software engineer with experience in React and Node.js...",
    experienceRequired: "2+ years",
    skillsRequired: ["React", "Node.js", "JavaScript", "MongoDB"],
    city: "Mountain View, CA",
    address: "1600 Amphitheatre Pkwy",
    imageUrls: ["https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png"],
  },
  {
    _id: "2",
    recruiterName: "Jane Smith",
    companyName: "Amazon",
    jobTitle: "Data Scientist",
    location: "Seattle, WA",
    salary: "₹18,00,000 - ₹22,00,000",
    jobType: "Remote",
    description: "We are hiring a data scientist with expertise in machine learning and Python...",
    experienceRequired: "3+ years",
    skillsRequired: ["Python", "Machine Learning", "SQL", "AWS"],
    city: "Seattle, WA",
    address: "410 Terry Ave N",
    imageUrls: ["https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"],
  },
];

export default function ListingItem() {
  const cardRefs = useRef([]);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const randomDays = Math.floor(Math.random() * (10 - 5 + 1)) + 5;
    setDays(randomDays);
  }, []);
  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 + index * 0.1, ease: 'power3.out' }
        );
      }
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {sampleJobs.map((listing) => (
        <motion.div
          key={listing._id}
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row p-6"
        >
          {/* Logo and Company Info */}
          <div className="flex flex-col items-start gap-3 w-full md:w-2/3">
            <div className="flex items-center gap-3">
              <motion.img
                src={listing.imageUrls?.[0] || "https://via.placeholder.com/100"}
                alt={`${listing.companyName} Logo`}
                className="h-12 w-12 object-contain"
              />
              <div>
                <p className="text-lg font-semibold text-gray-900">{listing.companyName}</p>
                <p className="text-sm text-gray-600">{listing.datePosted}</p>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800">{listing.jobTitle}</h3>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">Full-Time</span>
            <div className="flex items-center text-sm text-gray-600">
              <MdLocationOn className="h-5 w-5 text-red-500" />
              <p className="truncate">{listing.location}</p>
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">{listing.description}</p>
            <div className="flex items-center text-gray-700 text-sm">
              <MdAttachMoney className="h-5 w-5 text-green-500" />
              <span className="ml-2 font-medium">{listing.salary}</span>
            </div>
          </div>

          {/* Job Closing Info */}
          <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-xl text-center w-full md:w-1/3">
          <div className="text-center">
      <p className="text-gray-500 text-sm">Job Closes In</p>
      <p className="text-4xl font-bold text-purple-600">{days} Days</p>
      <p className="text-gray-500 text-sm">DAYS</p>
    </div>
            <Link to={`/listing/${listing._id}`} className="mt-3">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-all">
                Apply Now
              </button>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
