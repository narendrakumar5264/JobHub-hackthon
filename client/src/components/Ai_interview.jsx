import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoogleGenerativeAI } from "@google/generative-ai";

gsap.registerPlugin(ScrollTrigger);

export default function Ai_interview() {
  const [totalScore, setTotalScore] = useState(0);
const [attempts, setAttempts] = useState(0);
const [percentage, setPercentage] = useState(0);
  const [recording, setRecording] = useState(false);
  const [videoMode, setVideoMode] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const backgroundRef = useRef(null);
  const recordedChunks = useRef([]);
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [response, setResponse] = useState("");
  const [response1, setResponse1] = useState("");
  const [transcript, setTranscript] = useState(""); // State to store speech-to-text
  const recognitionRef = useRef(null); // Reference for speech recognition

  const apiKey = "AIzaSyDnc1Focn8n4qXUqBW_kb0lK0rvWcbLcbs";
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  async function fetchInterviewQuestions() {
    try {
      const prompt = `Provide one easy interview question related to ${topic} in one line but question have to be random and question has to be tech.`;
      const result = await model.generateContent(prompt);
      setResponse(result.response.text());
    } catch (error) {
      console.error("Error fetching interview questions:", error);
      setResponse("Error fetching interview questions.");
    }
  }

  async function analyzeAnswer() {
    try {
      const prompt = `Analyze the following answer for correctness, depth, and clarity:\n\n
      Question: ${question}\n\n
      Answer: ${answer}\n\n
      Provide feedback and suggest improvements in two lines. Also, give a score out of 10 based on accuracy, depth, and clarity. Format the response as:\n
      "Score: X/10\nFeedback: [your feedback here]"`;
  
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
  
      // Extracting Score from AI Response
      const scoreMatch = responseText.match(/Score: (\d+)\/10/);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;
  
      // Update total score and attempts
      setTotalScore((prev) => prev + score);
      setAttempts((prev) => prev + 1);
  
      // Calculate percentage
      const newPercentage = ((totalScore + score) / (attempts + 1) / 10) * 100;
      setPercentage(newPercentage.toFixed(2));
  
      setResponse1(responseText);
    } catch (error) {
      console.error("Error analyzing the answer:", error);
      setResponse1("Error analyzing the answer.");
    }
  }
  
  

  useEffect(() => {
    gsap.to(backgroundRef.current, {
      backgroundPosition: "200% center",
      duration: 10,
      ease: "linear",
      repeat: -1,
    });
  }, []);

  // Function to start speech recognition
  const startSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      // let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + event.results[i][0].transcript + " ");
        } else {
          // interimTranscript += event.results[i][0].transcript;
        }
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended.");
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  // Function to stop speech recognition
  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const startInterview = async (isVideo) => {
    fetchInterviewQuestions();
    setVideoMode(isVideo);
    startSpeechRecognition();

    const constraints = isVideo
      ? { video: true, audio: true }
      : { audio: true };

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);

      if (isVideo && videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = mediaRecorder;
      recordedChunks.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        if (videoRef.current) {
          videoRef.current.srcObject = null;
          videoRef.current.src = url;
          videoRef.current.controls = true;
        }
      };

      mediaRecorder.start();
      stopSpeechRecognition // Start speech-to-text
      setRecording(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopInterview = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    stopSpeechRecognition(); // Stop speech-to-text
    setRecording(false);
  };

  useEffect(() => {
    setAnswer(transcript);
  }, [transcript]);
  const topics = ["ReactJS", "JavaScript", "Cybersecurity", "MongoDB", "OOPs in C++"];

  function generateNewQuestion() {
    // Fetch a new question (You need to implement this function)
    fetchInterviewQuestions();
  }
  return (
    <motion.div
    ref={backgroundRef}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] text-white px-6 py-20"
  >
    <motion.h1 className="text-5xl font-extrabold mb-6 text-white drop-shadow-lg tracking-wide">
      AI-Powered Interview Platform
    </motion.h1>
    <p className="text-lg text-gray-300 mb-6 text-center max-w-2xl">
      Welcome to the AI-powered interview system. Please select an option to begin your interview. Ensure your microphone and camera (if applicable) are enabled.
    </p>
    <div className="flex gap-6">
      <motion.button
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 hover:scale-105 transition transform duration-200"
        onClick={() => startInterview(false)}
        disabled={recording}
      >
        Start Audio Interview
      </motion.button>
      <motion.button
        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 hover:scale-105 transition transform duration-200"
        onClick={() => startInterview(true)}
        disabled={recording}
      >
        Start Video Interview
      </motion.button>
      {recording && (
        <motion.button
          className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl shadow-md hover:bg-red-700 hover:scale-105 transition transform duration-200"
          onClick={stopInterview}
        >
          Stop Interview
        </motion.button>
      )}
    </div>

    {videoMode && (
      <motion.div className="relative mt-6 w-full max-w-xl">
        <motion.video
          ref={videoRef}
          autoPlay
          className="w-full rounded-lg shadow-lg border border-gray-500"
        />
        <motion.div className="mt-4 p-4 bg-gray-800 text-white rounded-lg shadow">
          <p className="text-sm font-semibold">Live Speech:</p>
          <p className="text-lg text-gray-300">{transcript}</p>
        </motion.div>
      </motion.div>
    )}

    <div className="mt-8 bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-xl">
      <h3 className="text-2xl font-semibold mb-3 text-white">Select Interview Topic</h3>
      <select
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select a topic</option>
        {topics.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <button
        onClick={generateNewQuestion}
        className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 hover:scale-105 transition transform duration-200"
        disabled={!topic}
      >
        Get New Questions
      </button>
      {response && (
        <div className="mt-6 bg-gray-800 p-5 rounded-lg shadow-xl">
          <h3 className="text-lg font-semibold text-white">Question: <span className="text-gray-400">{response}</span></h3>
        </div>
      )}
    </div>

    <div className="mt-6 bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-xl">
      <h3 className="text-2xl font-semibold mb-3 text-white">Analyze Answer</h3>
      <textarea
        type="text"
        placeholder="Enter Your Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-3 mt-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={analyzeAnswer}
        className="mt-4 w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 hover:scale-105 transition transform duration-200"
      >
        Analyze Answer
      </button>
    </div>

    <div className="mt-6 bg-gray-900 p-6 rounded-xl shadow-xl w-full max-w-xl">
      <h3 className="text-2xl font-semibold mb-3 text-white">Response:</h3>
      <p className="text-gray-300">{response1}</p>
      <p className="mt-4 text-white">
        <strong>Total Score:</strong> {totalScore} / {attempts * 10}
      </p>
      <p className="text-white">
        <strong>Percentage Gained:</strong> {percentage}%
      </p>
    </div>
  </motion.div>
  );
}
