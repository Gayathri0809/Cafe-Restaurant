import React from 'react';
import { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import"./final.css";
const Last = () => {
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    const storedValue = localStorage.getItem('selectedValue'); // Retrieve the selected value from localStorage
    if (storedValue) {
      setSelectedValue(storedValue);
    }
  }, []);
  let navigate = useNavigate();
  const onClick = async (e) => {
     
      navigate("/rate");
    };

  return (
    
     
      <div className="last">
      
    
    <img src='https://media.tenor.com/PYQdx807FXAAAAAC/sucess-transparent.gif'style={{ height: "300px", width:"300px", transform:"translateX(600px)" }} ></img>
    <h5 id="od">Order Placed Successfully.....</h5>
    <button onClick={(e) => onClick(e)}id="feed">FeedBack</button>
      
    <p style={{ height: "", width:"", transform:"translateX(700px)" }} >Status of food: {selectedValue}</p>
  
    </div>
   
  );
};

export default Last;