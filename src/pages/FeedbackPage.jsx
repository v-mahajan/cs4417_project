import React, { useState } from "react";

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState("");

  return (
    <div className="w-96 mx-auto mt-10 p-5 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Feedback</h2>
      <input
        type="text"
        placeholder="Enter your feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button className="mt-4 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Submit
      </button>
    </div>
  );
};

export default FeedbackPage;
