import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import yourGif from '../assets/Resume2.jpg';
import { motion } from "framer-motion";
import gsap from "gsap";

const Resume = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [response, setResponse] = useState("");
  const [response1, setResponse1] = useState("");
  const [score, setScore] = useState("");
  const containerRef = useRef(null);


  useEffect(() => {
    gsap.to(containerRef.current, { backgroundPosition: "200% center", duration: 6, repeat: -1, ease: "linear" });
  }, []);

  const API_KEY = "YOUR_GOOGLE_API_KEY";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Please select an image first.");
      return;
    }

    try {
      setUploadStatus("Processing image...");
      const imageBase64 = await convertImageToBase64(file);
      setUploadStatus("Image processed successfully. Analyzing...");
      await ResumeAnalyser(imageBase64);
    } catch (error) {
      console.error("Error processing image:", error);
      setUploadStatus("Failed to process image.");
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const ResumeAnalyser = async (imageBase64) => {
    try {
      const contents = [
        {
          role: "user",
          parts: [{ inline_data: { mime_type: "image/jpeg", data: imageBase64 } }],
        },
      ];
      const result = await model.generateContent({ contents });
      setResponse(result.response.text());
      setUploadStatus("Analysis complete!");
    } catch (error) {
      console.error("Error analyzing image:", error);
      setResponse("Error analyzing image.");
    }
  };

  async function fetchAtsScore() {
    try {
      const prompt = `Provide a score out of 100% for this resume: ${response} Also, rate each section (education, experience, skills, etc.) in 10 lines only.`;
      const result = await model.generateContent(prompt);
      
      if (result && result.response) {
        const responseText = await result.response.text();
        setResponse1(responseText);
  
        const match = responseText.match(/(\d{1,3})\/100/);
        if (match) {
          setScore(parseInt(match[1], 10));
        }
      } else {
        throw new Error("Invalid response from AI model.");
      }
    } catch (error) {
      console.error("Error fetching ATS score:", error);
      setResponse1("Error fetching ATS score.");
    }
  }

  return (
    <motion.div
      className="flex min-h-screen w-full items-center justify-center p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden"
      ref={containerRef}
    >
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-purple-500 rounded-full opacity-40 blur-[200px] top-1/4 left-1/3 animate-pulse"></div>
        <div className="absolute w-[600px] h-[600px] bg-blue-500 rounded-full opacity-40 blur-[200px] bottom-1/3 right-1/3 animate-pulse"></div>
      </div>

      <motion.div className="p-12 rounded-3xl shadow-xl w-full max-w-5xl mx-auto bg-gray-950 text-white flex flex-col lg:flex-row gap-12 relative z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex-1 flex flex-col justify-center items-center text-center lg:text-left">
          <h2 className="text-5xl font-bold mb-6 text-blue-400">Upload Your Resume</h2>
          <p className="text-gray-300 mb-8 text-lg">AI-powered ATS analysis to enhance your job application.</p>
          
          <label className="cursor-pointer w-full">
            <div className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-500 rounded-lg bg-gray-800 hover:bg-gray-700 transition shadow-md">
              <span className="text-gray-300 text-lg">Click to Upload or Drag & Drop</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </label>
          
          {file && (
            <p className="text-md text-gray-300 font-medium mt-4">Selected File: {file.name}</p>
          )}
          
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-xl transition shadow-lg text-lg"
          >
            Upload & Analyze Resume
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-xl transition shadow-lg text-lg"
          >
            Fetch ATS Score
          </motion.button>
          
          {uploadStatus && <p className="mt-6 text-md text-gray-300 font-medium">{uploadStatus}</p>}
        </div>
        
        {response1 ? (
          <motion.div className="flex-1 p-8 bg-gray-800 rounded-xl shadow-lg border border-gray-700"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-3xl font-semibold mb-6 text-green-400">AI Feedback:</h3>
            {score && (
              <div className="text-center text-4xl font-bold mb-6 text-yellow-400">{score}%</div>
            )}
            <p className="text-md text-gray-300 whitespace-pre-line leading-relaxed">{response1}</p>
          </motion.div>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <motion.img 
              src={yourGif} 
              alt="Processing animation" 
              className="max-w-md lg:max-w-lg rounded-lg shadow-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Resume;