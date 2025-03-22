import  { useState,useContext } from "react";
import { FaUpload, FaCheckCircle } from "react-icons/fa";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

// import {sendEmail} from "../Email/emailService.js";
import emailjs from "emailjs-com";

import { ThemeContext } from "../context/ThemeContext";

const Recruitment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    skills: "",
    resume: null,
  });
  const [resumeName, setResumeName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [Email, setEmail] = useState("");

   const { theme } = useContext(ThemeContext);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, resume: files[0] });
      setResumeName(files[0].name);
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setEmail(formData.email);
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [scheduled, setScheduled] = useState(false);

  const sendEmail = () => {
    if (!Email) {
      console.error("Recipient email is missing!");
      return;
    }
  
    const templateParams = {
      to_email: Email, // Ensure this matches EmailJS template variable
      name: formData.name,
      date: selectedDate.toDateString(),
      time: selectedTime,
    };
  
    console.log("Template Params:", templateParams); // Debugging log
  
    emailjs.send("service_7x0mze5", "template_qi8ox7n", templateParams, "K_rJDVkuNgJtSvkqF")
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
      })
      .catch((err) => {
        console.error("Failed to send email.", err);
      });
  };
  
  const handleSchedule = () => {
    
    setScheduled(true);
    sendEmail();
  };

  const validateForm = () => {
    const { name, email, phone, experience, skills, resume } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const experienceRegex = /^[0-9]+$/;

    if (!name || !email || !phone || !experience || !skills || !resume) {
      alert("Please fill in all fields.");
      return false;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!phoneRegex.test(phone)) {
      alert("Phone number must be 10 digits.");
      return false;
    }
    if (!experienceRegex.test(experience)) {
      alert("Experience must be a valid number.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setShowPopup(true);
      setIsSubmitting(false);
      setFormData({ name: "", email: "", phone: "", experience: "", skills: "", resume: null });
      setResumeName("");
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-9 bg-white shadow-lg rounded-lg">
      <div className={`${theme === "dark" ? "dark" : ""} p-6 bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg  shadow-lg`}>
  <h2 className="text-2xl font-bold text-center mt-10 mb-6">Job Application Form</h2>
  <form onSubmit={handleSubmit} className="space-y-4">
    {/* Personal Details */}
    <div>
      <label htmlFor="name" className="block font-semibold">Full Name</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
    </div>
    <div>
      <label htmlFor="email" className="block font-semibold">Email</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
    </div>
    <div>
      <label htmlFor="phone" className="block font-semibold">Phone</label>
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
    </div>

    {/* Professional Details */}
    <div>
      <label htmlFor="experience" className="block font-semibold">Years of Experience</label>
      <input type="text" name="experience" value={formData.experience} onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
    </div>
    <div>
      <label htmlFor="skills" className="block font-semibold">Skills</label>
      <input type="text" name="skills" value={formData.skills} onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
    </div>

    {/* Resume Upload */}
    <div>
      <label htmlFor="resume" className="block font-semibold">Upload Resume</label>
      <div className="flex items-center space-x-2">
        <input type="file" name="resume" onChange={handleChange} required className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white" />
        <FaUpload className="text-gray-500 dark:text-gray-400" />
      </div>
      {resumeName && <p className="text-sm text-green-600 dark:text-green-400 mt-1">Selected File: {resumeName}</p>}
    </div>

    <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white p-2 rounded dark:bg-blue-500">
      {isSubmitting ? "Submitting..." : "Apply Now"}
    </button>
  </form>
</div>


      {/* Popup */}
      {showPopup && (
  <div className={`${theme === "dark" ? "dark" : ""} fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg text-center animate-fade-in w-96">
      <FaCheckCircle className="text-green-500 text-4xl mx-auto mb-3" />
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Application Submitted!</h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Increase your chances by taking a small test with AI.
      </p>
      {!scheduled ? (
        <div className="mt-4">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Select Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="border p-2 rounded w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            minDate={new Date()}
          />
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mt-3 mb-1">Select Time:</label>
          <TimePicker
            onChange={setSelectedTime}
            value={selectedTime}
            className="border p-2 rounded w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <button
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
            onClick={handleSchedule}
          >
            Confirm Schedule
          </button>
        </div>
      ) : (
        <p className="text-red-800 dark:text-red-400 font-semibold mt-4">
          Test scheduled on {selectedDate.toDateString()} at &nbsp; {selectedTime}
          &nbsp;
          <span className="text-green-600 dark:text-green-400">
            You will receive an email with a link in it half an hour before this.
          </span>
        </p>
      )}
      <button
        className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
        onClick={() => setShowPopup(false)}
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default Recruitment;
