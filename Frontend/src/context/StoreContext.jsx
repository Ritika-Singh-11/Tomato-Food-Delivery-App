import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios"
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});

  const url = "http://localhost:4000";

  // Load token from localStorage when app starts
  const [token, setToken] = useState(localStorage.getItem("token") || "");

   const [food_list,setFoodList]=useState([])

  const addToCart =async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({
        ...prev,
        [itemId]: 1,
      }));
    } else {
      setCartItem((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }

    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };

  const removeFromCart =async (itemId) => {
    setCartItem((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));

    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  };

  const getTotalCartamount = () => {
    let totalAmount = 0;

    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const itemInfo = food_list.find(
          (product) => product._id === item
        );

        if (itemInfo) {
          totalAmount += itemInfo.price * cartItem[item];
        }
      }
    }

    return totalAmount;
  };
     const fetchFoodList = async () => {
  try {
    const response = await axios.get(url + "/api/food/list");

    if (response.data.success) {
      setFoodList(response.data.data);
    }
  } catch (error) {
    console.log(error);
  }
};

const loadCartData = async (token) => {
  try {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );

    setCartItem(response.data.cartData);
  } catch (error) {
    console.log(error);
  }
};



  useEffect(()=>{
   async function loadData(){
    await fetchFoodList();
      if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"));
      await loadCartData(localStorage.getItem("token"));
    }
   }
loadData();
  },[])

  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartamount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;