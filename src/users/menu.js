import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Filter, Translate } from "@mui/icons-material";
function Menu() {
  const [data, setData] = useState([]);
  const [userData, setUserdata]= useState([]);
  const [filterdata, setFilterdata]= useState([]);
  const [query, setQuery] = useState('');

  useEffect( ()=>{
    const getUserdata= async()=>{
      const reqData= await fetch("http://localhost:8080/lists");
      const resData= await reqData.json();
      //console.log(resData);
      setUserdata(resData);
      setFilterdata(resData);

    }
getUserdata();
  },[]);
  const handlesearch=(event)=>{
    const getSearch= event.target.value; 
    if(getSearch.length > 0)
    {     
     const searchdata= userData.filter( (item)=> item.name.toLowerCase().includes(getSearch));
     setUserdata(searchdata);
    } else {
      setUserdata(filterdata);
    }
    setQuery(getSearch);
  }
  
  const addToCart = (item) => {
    let cartItems = [];
    const existingCartData = localStorage.getItem('cart');
    if (existingCartData) {
      cartItems = JSON.parse(existingCartData);
      
      // Check if the item already exists in the cart
      const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
      
      if (existingItem) {
        // If the item exists, update its quantity or any other property you need
        alert("Product already added");
      } else {
        // If the item doesn't exist, add it to the cart
        cartItems.push({ ...item, quantity: 1 });
        alert('Product added to cart');
      }
    } else {
      // If the cart is empty, add the first item
      cartItems.push({ ...item, quantity: 1 });
    }
  
   
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
  
    //alert('Product added to cart');
  };
 

  return (
    <div>
      <div className="row">
        <div className="col-md-3">
      <Link
        className="btn btn-outline-primary mx-4 mt-2"
        to={`/cart`}
      >
        View Cart
      </Link>
      </div>
            <div className="col-md-3 mt-2">                
                <input  type="text" name='name' value={query}   className="form-control" onChange={(e)=>handlesearch(e)} placeholder='Search...' />
              </div> 
     </div>

      <table class="table  mt-5">
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userData.map((item, index) => (        
          <tr>
             <td ><img src={item.images} style={{ height: "150px", width:"150px"}} id="bb1" ></img></td>
             <td>
                      <div style={{ display: 'block',gap:'50px'}}>
                        <tr style={{ fontSize:"20px",display: 'flex',justifyContent:"space-between" }}>
                          <tr>{item.name}</tr>
                        <button
               class="btn btn-outline-danger " style={{ background:"none", color:"red"}}
               onClick={() => addToCart(item)} 
             >
               ADD &nbsp; +
             </button>
             </tr>
            </div> 
            <tr style={{color:"black"}}>Rs.{item.price}</tr>
            <tr style={{color:"grey"}}>{item.description}</tr>              
            </td>      
         </tr>
         ))}
      </tbody>
     </table >
  </div >
    )
}
export default Menu;

