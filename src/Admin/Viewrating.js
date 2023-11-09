import React, { useEffect, useState } from "react";

export default function ViewRating() {
  const [retrievedData, setRetrievedData] = useState({ name: "", comment: "" });

  useEffect(() => {
    // Retrieve the feedback data (including name) from localStorage
    const savedData = localStorage.getItem("feedbackData");

    // Set the retrieved data in your state variable
    if (savedData) {
      const { name, comment } = JSON.parse(savedData);
      setRetrievedData({ name, comment });
    }
  }, []);

  return (
    <div>
      <div className="view-rating-container">
        <h2 className="header">Retrieved Text:</h2>
        <p className="retrieved-text">Name: {retrievedData.name}</p>
        <p className="retrieved-text">Comment: {retrievedData.comment}</p>
      </div>
    </div>
  );
}
