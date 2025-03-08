import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function InterviewPage() {
  const [recording, setRecording] = useState(false);
  const [videoMode, setVideoMode] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const backgroundRef = useRef(null);

  useEffect(() => {
    gsap.to(backgroundRef.current, {
      backgroundPosition: "200% center",
      duration: 10,
      ease: "linear",
      repeat: -1
    });
  }, []);

  const startInterview = async (isVideo) => {
    setVideoMode(isVideo);
    const constraints = isVideo ? { video: true, audio: true } : { audio: true };
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      if (isVideo && videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      const mediaRecorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopInterview = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    stream?.getTracks().forEach((track) => track.stop());
    setRecording(false);
  };

  return (
    <motion.div 
      ref={backgroundRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 bg-[length:400%_400%] text-white"
    >
      <motion.h1 
        className="text-3xl font-bold mb-6 text-white"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        AI-Powered Interview Platform
      </motion.h1>
      <p className="text-lg text-gray-300 mb-4 text-center max-w-lg">
        Welcome to the AI-powered interview system. Please select an option to begin your interview. Ensure your microphone and camera (if applicable) are enabled.
      </p>
      <div className="flex gap-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
          onClick={() => startInterview(false)}
          disabled={recording}
        >
          Start Audio Interview
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700"
          onClick={() => startInterview(true)}
          disabled={recording}
        >
          Start Video Interview
        </motion.button>
        {recording && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700"
            onClick={stopInterview}
          >
            Stop Interview
          </motion.button>
        )}
      </div>
      {videoMode && recording && (
        <motion.video 
          ref={videoRef} 
          autoPlay 
          className="mt-6 w-full max-w-lg rounded-lg shadow-lg border border-gray-400" 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        />
      )}
    </motion.div>
  );
}