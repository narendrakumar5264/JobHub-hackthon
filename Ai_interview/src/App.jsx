import React, { useState } from "react";

const App = () => {
  const API_KEY = "AIzaSyAPlIMrYoOM1v7kJvJnH0SD9R7jqoy9okA";
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`, // ✅ Fixed API Key Usage & Version
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user", // ✅ Added required role field
                parts: [{ text: `Give me the top 5 interview questions on ${topic}` }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      setQuestions(generatedText.split("\n"));
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", fontFamily: "Arial" }}>
      <h2>Top 5 Interview Questions</h2>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic..."
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button onClick={fetchQuestions} style={{ padding: "10px", width: "100%" }}>
        {loading ? "Loading..." : "Get Questions"}
      </button>
      <ul style={{ marginTop: "20px" }}>
        {questions.map((q, index) => (
          <li key={index}>{q}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
