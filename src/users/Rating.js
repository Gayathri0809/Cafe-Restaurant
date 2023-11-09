import"./Styles.css";
import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {  useNavigate } from "react-router-dom";
import React, {  useEffect } from "react";
export default function Rating() {
  const [number, setNumber] = useState(0);
  const [hoverStar, setHoverStar] = useState(undefined);
  const [textareaValue, setTextareaValue] = useState("");
  const [nameValue, setNameValue] = useState(""); 
  let navigate = useNavigate();
  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  };
  const handleNameChange = (e) => {
    setNameValue(e.target.value);
  };

  const onClick = async (e) => {
    const feedbackData = {
      comment: textareaValue,
      name: nameValue,
    };

    localStorage.setItem("feedbackData", JSON.stringify(feedbackData));
    alert("Thank You For Your Feedback");
    navigate("/search");
  }
  useEffect(() => {
    // Retrieve and set the textarea content from localStorage when the component mounts
     // Retrieve and set the feedback data from localStorage when the component mounts
     const savedData = localStorage.getItem("feedbackData");
     if (savedData) {
       const { comment, name } = JSON.parse(savedData);
       setTextareaValue(comment);
       setNameValue(name);
     }
   }, []);
  const handleText = () => {
    switch (number || hoverStar) {
      case 0:
        return "FeedBack";
      case 1:
        return "Dissatifation";
      case 2:
        return "Unsatisfied";
      case 3:
        return "Normal";
      case 4:
        return "Satisfied";
      case 5:
        return "Very Satisfied";
      default:
        return "FeedBack";
    }
  };

  const handlePlaceHolder = () => {
    switch (number || hoverStar) {
      case 0:
        return "Comment here...";
      case 1:
      case 2:
      case 3:
      case 4:
        return "What is your problem?";
      case 5:
        return "We love to hear your comment?";
      default:
        return "Comment here...";
    }
  
  };
  return (
    <div className="App">
      <div className="popup">
        <div className="content">
          <div className="product">
           
          </div>
          <div>
            <h1>{handleText()}</h1>
            {Array(5)
              .fill()
              .map((_, index) =>
                number >= index + 1 || hoverStar >= index + 1 ? (
                  <AiFillStar
                    onMouseOver={() => !number && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onClick={() => setNumber(index + 1)}
                  />
                ) : (
                  <AiOutlineStar
                    onMouseOver={() => !number && setHoverStar(index + 1)}
                    onMouseLeave={() => setHoverStar(undefined)}
                    style={{ color: "orange" }}
                    onClick={() => setNumber(index + 1)}
                  />
                )
              )}
          </div>
          <input
            type="text"
            placeholder="Your Name"
            value={nameValue}
            onChange={handleNameChange}
          />
          <pre></pre>
          <textarea placeholder={handlePlaceHolder()}
           value={textareaValue}
           onChange={handleTextareaChange}
          ></textarea>
          <button className={` ${!number && "disabled"} `}id="ten" onClick={(e) => onClick(e)}>Submit</button>
        </div>
      </div>
    </div>
  );
}
