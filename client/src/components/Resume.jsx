
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import yourGif from '../assets/gif3.gif';

const Resume = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [response, setResponse] = useState("");

  const API_KEY = "AIzaSyBW2D4uHBFJJ0eECIOQE16_4qUjVts_hPc";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const [response1, setResponse1] = useState("");
  const [score, setScore] = useState("");
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
      const prompt = `Provide a score out of 100% for this resume: ${response} Also, rate each section (education, experience, skills, etc.)  in 10 lines only.`;
      const result = await model.generateContent(prompt);
      
      if (result && result.response) {
        const responseText = await result.response.text();
        setResponse1(responseText);
  
        // Extract score (assuming it's in format "Score: 75/100")
        const match = responseText.match(/(\d{1,3})\/100/);
        if (match) {
          setScore(parseInt(match[1], 10)); // Update the score state
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
   

    <div className="flex min-h-screen items-center justify-center  p-6">
      <div className=" p-8 rounded-2xl shadow-xl w-full max-w-4xl mx-auto transform transition duration-300 hover:scale-105 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 flex flex-col justify-center items-center text-center lg:text-left">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 tracking-wide">Upload Your Resume</h2>
          <p className="text-gray-600 mb-6">Let AI analyze your resume for ATS compatibility and provide feedback.</p>
          
          <div className="relative w-full mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent p-2 bg-gray-50 hover:bg-gray-100 transition"
            />
          </div>
          
          {file && (
            <p className="mt-2 text-sm text-gray-600">Selected File: <span className="font-semibold">{file.name}</span></p>
          )}
          
          <button
            onClick={handleUpload}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            Upload & Analyze Resume
          </button>
          
          <button
            onClick={fetchAtsScore}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            Fetch ATS Score
          </button>
          
          {uploadStatus && <p className="mt-4 text-center text-sm text-gray-700">{uploadStatus}</p>}
        </div>
        
        {response1 ? (
          <div className="flex-1 p-6 bg-gray-100 rounded-lg shadow-md border border-gray-300 h-full flex flex-col justify-center items-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">AI Feedback:</h3>
            
            {score && (
              <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                  <circle
                    cx="50" cy="50" r="40"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (score / 100) * 251.2}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <span className="absolute text-2xl font-bold text-gray-800">{score}%</span>
              </div>
            )}
            
            <p className="text-sm text-gray-700 whitespace-pre-line">{response1}</p>
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <img src={yourGif} alt="Loading animation" className="max-w-xs lg:max-w-md" />
          </div>
        )}
      </div>
    </div>
    
  
  );
};

export default Resume;

