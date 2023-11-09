
import React,{useState,useEffect} from "react";
const Corders = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [cart, setCart] = useState([]);
    const handleSelectChange = (e) => {
      const value = e.target.value;
      setSelectedOption(value);
      localStorage.setItem('selectedValue', value); // Store the selected value in localStorage
    };
    useEffect(() => {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    }, []);
  
    return (
      <div>
        <h1>Status</h1>
        <select onChange={handleSelectChange} value={selectedOption}>
          <option value="">Status of order</option>
          <option value=""></option>
          <option value="Preparing the food 🍸">Preparing the food </option>
          <option value="Food reaches within 15mins ⏰">Food reaches within 15mins  </option>
          <option value=" 🛵 The agent is at you doorstep collect the food">The agent is at you doorstep collect the food 🛵</option>
        </select>
        <table class="table table-striped table-light mt-5">
        <thead>
             <tr>
             <th></th>
              <th>Menu Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
         </thead>
         <tbody>
          {cart.map((item, index) => (
         
          <tr>
                <td><img src={item.images} style={{ height: "100px", width:"100px" }}  ></img></td>
                <td>{item.name}</td>
                <td>Rs.{item.price}</td>
                
                <td>
                <input type="number"  />
                </td>
               
                
            </tr>
        
        ))}
        </tbody>
        <tfoot>
          <tr>
       
            
          <td colspan="5">
       
            </td>
            </tr>
            <tr>
           
          <td colspan="5">      
            </td>
            </tr>
            </tfoot>
        </table>
      </div>
    );
  };

export default Corders;
