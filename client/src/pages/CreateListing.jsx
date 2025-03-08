

import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import { FaMobileAlt, FaUser, FaCity } from 'react-icons/fa';
import { FaUserTie, FaBuilding, FaMapMarkerAlt, FaDollarSign, FaBriefcase } from "react-icons/fa";

import { MdOutlineRealEstateAgent } from 'react-icons/md';
import { FiTrendingUp } from 'react-icons/fi';
export default function CreateListing() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [page, setPage] = useState(1); // Page tracker
  const [formData, setFormData] = useState({
    recruiterName: "",
    companyName: "",
    jobTitle: "",
    location: "",
    salary: "",
    jobType: "",
    description: "",
    experienceRequired: "",
    skillsRequired: "",
    city: "",
    address: "",
  });

  const [files, setFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  // const [uploadStatus, setUploadStatus] = useState("");
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [isUploading, setIsUploading] = useState(false);
  const rajasthanCities = [
    "Jaipur",
    "Jodhpur",
    "Udaipur",
    "Ajmer",
    "Kota",
    "Bikaner",
    "Alwar",
    "Bharatpur",
    "Sikar",
    "Pali",
    "Tonk",
  ];

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // const handleFileChange = (e) => {
  //   const selectedFiles = Array.from(e.target.files);
  //   if (files.length + selectedFiles.length <= 6) {
  //     setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  //     setUploadStatus("");
  //   } else {
  //     setUploadStatus("You can only upload a total of 6 images.");
  //   }
  // };

  // const handleUploadClick = async () => {
  //   setIsUploading(true);
  //   if (files.length === 0) {
  //     setUploadStatus("No files selected for upload.");
  //     return;
  //   }

  //   try {
  //     const promises = files.map((file, index) => storeImage(file, index));
  //     const imageUrls = await Promise.all(promises);
  //     setUploadedImages(imageUrls);
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       imageUrls,
  //     }));
  //     setIsUploading(false);
  //     setUploadStatus("All images uploaded successfully!");
  //   } catch (error) {
  //     console.error("Error uploading images:", error);
  //     setUploadStatus("Some images failed to upload. Please try again.");
  //   }
  // };

  // const storeImage = (file, index) => {
  //   return new Promise((resolve, reject) => {
  //     const data = new FormData();
  //     data.append("file", file);
  //     data.append("upload_preset", "Realstate");
  //     data.append("cloud_name", "dvph1rffn");

  //     const xhr = new XMLHttpRequest();
  //     xhr.open(
  //       "POST",
  //       "https://api.cloudinary.com/v1_1/dvph1rffn/image/upload",
  //       true
  //     );

  //     xhr.onload = () => {
  //       if (xhr.status === 200) {
  //         const uploadedImage = JSON.parse(xhr.responseText);
  //         resolve(uploadedImage.url);
  //       } else {
  //         reject(new Error(`Failed to upload file: ${file.name}`));
  //       }
  //     };

  //     xhr.onerror = () => {
  //       reject(new Error("Network error during upload"));
  //     };

  //     xhr.send(data);
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (uploadedImages.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };


  return (
   
    
  
    <main className="w-full h-auto bg-gray-50 pb-10">
    <div className="p-5 max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-3">Post Your Job</h1>
        <p className="text-gray-600 text-lg">Hire the Best Talent Online!</p>
      </div>

      <div className="bg-white shadow-xl p-8 rounded-lg border-t-4 border-blue-400">
        {page === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setPage(2);
            }}
            className="flex flex-col gap-5"
          >
            <h2 className="text-2xl font-bold mb-6 text-blue-700">Recruiter Details</h2>
            <div className="flex items-center gap-3">
              <FaUserTie size={24} className="text-blue-500" />
              <input
                type="text"
                placeholder="Recruiter's Name"
                className="border p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
                id="recruiterName"
                required
                onChange={handleChange}
                value={formData.recruiterName}
              />
            </div>
            <div className="flex items-center gap-3">
              <FaBuilding size={24} className="text-blue-500" />
              <input
                type="text"
                placeholder="Company Name"
                className="border p-4 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
                id="companyName"
                required
                onChange={handleChange}
                value={formData.companyName}
              />
            </div>
            <div className="flex items-center gap-3">
                    <FaCity size={24} className="text-blue-500" />
                    <select
                      id="city"
                      className="border p-4 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
                      required
                      onChange={handleChange}
                      value={formData.city}
                    >
                      <option value="" disabled>
                        Select City
                      </option>
                      {rajasthanCities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt size={24} className="text-blue-500" />
                    <textarea
                      placeholder="Address"
                      className="border p-4 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
                      id="address"
                      required
                      onChange={handleChange}
                      value={formData.address}
                    />
                  </div>
            <button
              type="submit"
              className="py-3 px-5 bg-blue-600 text-white font-semibold rounded-lg uppercase hover:bg-blue-700 transition-all"
            >
              Next
            </button>
          </form>
        )}

        {page === 2 && (
         <form
         onSubmit={handleSubmit}
         className="flex flex-col gap-5"
       >
         <h2 className="text-2xl font-bold mb-6 text-blue-700">Job Details</h2>
         <input
           type="text"
           placeholder="Job Title"
           className="border p-4 rounded-lg focus:ring-2 focus:ring-blue-400"
           id="jobTitle"
           maxLength="100"
           minLength="5"
           required
           onChange={handleChange}
           value={formData.jobTitle}
         />
         <textarea
           placeholder="Job Description"
           className="border p-4 rounded-lg focus:ring-2 focus:ring-blue-400"
           id="jobDescription"
           required
           onChange={handleChange}
           value={formData.jobDescription}
         />
         <textarea
           placeholder="Skills Required"
           className="border p-4 rounded-lg focus:ring-2 focus:ring-blue-400"
           id="skillsRequired"
           required
           onChange={handleChange}
           value={formData.skillsRequired}
         />
         <textarea
           placeholder="Experience Required"
           className="border p-4 rounded-lg focus:ring-2 focus:ring-blue-400"
           id="experienceRequired"
           required
           onChange={handleChange}
           value={formData.experienceRequired}
         />
         <input
           type="number"
           placeholder="Salary (₹ per month)"
           className="border p-4 rounded-lg focus:ring-2 focus:ring-blue-400"
           id="salary"
           min="5000"
           max="1000000"
           required
           onChange={handleChange}
           value={formData.salary}
         />
         <select
           id="jobType"
           className="border p-4 rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
           required
           onChange={handleChange}
           value={formData.jobType}
         >
           <option value="" disabled>Select Job Type</option>
           <option value="full-time">Full-Time</option>
           <option value="part-time">Part-Time</option>
           <option value="internship">Internship</option>
         </select>
         <button
           type="button"
           onClick={() => setPage(1)}
           className="p-3 bg-gray-400 text-white rounded-lg uppercase hover:opacity-95"
         >
           Back
         </button>
         <button
           type="submit"
           className="p-3 bg-blue-600 text-white rounded-lg uppercase hover:opacity-95"
         >
           Submit
         </button>
       </form>
        )}
      </div>
    </div>
  </main>
      );
    };
    
   
