// import React, { useContext, useState } from "react";
// import "./LoginPopup.css";
// import { assets } from "../../assets/assets";
// import { StoreContext } from "../../context/StoreContext";
// import axios from "axios";

// const LoginPopup = ({ setShowLogin }) => {
//   const { url, setToken } = useContext(StoreContext);

//   const [currentState, setCurrentState] = useState("Login");

//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target;

//     setData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const onLogin = async (event) => {
//     event.preventDefault();

//     try {
//       let newUrl = url;

//       if (currentState === "Login") {
//         newUrl += "/api/user/login";
//       } else {
//         newUrl += "/api/user/register";
//       }

//       const response = await axios.post(newUrl, data);

//       if (response.data.success) {
//         setToken(response.data.token);
//         localStorage.setItem("token", response.data.token);
//         setShowLogin(false);
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       alert(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="login-popup">
//       <form onSubmit={onLogin} className="login-popup-container">
//         <div className="login-popup-title">
//           <h2>{currentState}</h2>
//           <img
//             src={assets.cross_icon}
//             alt=""
//             onClick={() => setShowLogin(false)}
//           />
//         </div>

//         <div className="login-popup-inputs">
//           {currentState === "Sign Up" && (
//             <input
//               type="text"
//               name="name"
//               placeholder="Your Name"
//               value={data.name}
//               onChange={onChangeHandler}
//               autoComplete="name"
//               required
//             />
//           )}

//           <input
//             type="email"
//             name="email"
//             placeholder="Your Email"
//             value={data.email}
//             onChange={onChangeHandler}
//             autoComplete="email"
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={data.password}
//             onChange={onChangeHandler}
//             autoComplete={
//               currentState === "Login"
//                 ? "current-password"
//                 : "new-password"
//             }
//             required
//           />
//         </div>

//         <button type="submit">
//           {currentState === "Login" ? "Login" : "Create Account"}
//         </button>

//         <div className="login-popup-condition">
//           <input type="checkbox" required />
//           <p>
//             By continuing, I agree to the Terms of Use & Privacy Policy.
//           </p>
//         </div>

//         {currentState === "Login" ? (
//           <p>
//             Create a new account?{" "}
//             <span onClick={() => setCurrentState("Sign Up")}>
//               Click here
//             </span>
//           </p>
//         ) : (
//           <p>
//             Already have an account?{" "}
//             <span onClick={() => setCurrentState("Login")}>
//               Login here
//             </span>
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default LoginPopup;




import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
const LoginPopup = ({ setShowLogin }) => {
 
   const {url,setToken} =useContext(StoreContext)


    const [currentstate, setCurrentstate] = useState("Login")
    const  [data,setData]=useState({
        name:"",
        email:"",
        password:"",
    })

   const onChangeHandler=(event)=>{
   const name=event.target.name;
   const value=event.target.value;
   setData(data=>({
    ...data,[name]:value
   }))
   }

   const onLogin=async (event)=>{
   event.preventDefault();
   let newUrl=url;
   if(currentstate==="Login"){
    newUrl+="/api/user/login"
   }
   else{
    newUrl+="/api/user/register"
   }
   const response =await axios.post(newUrl,data);

   if(response.data.success){
    setToken(response.data.token);
    localStorage.setItem("token",response.data.token);
    setShowLogin(false);
   }
   else{
    alert(response.data.message)
   }
   }


    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currentstate}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentstate==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type='text' placeholder='Your name' required />
}
                    <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required />
                    <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='password' required />


                </div>
                <button type='submit'>{
                    currentstate==="sign-up"?"create account":"Login"
                    }</button>
                    <div className="login-popup-condition">
                        <input type='checkbox' required/>
                        <p>By continuing, I agree to the terms of use & privacy policy</p>
                    </div>
                    {currentstate==="Login"
                    ? <p>create a new account?<span onClick={()=>setCurrentstate("sign-up")} >Click here</span></p>
                    :  <p>Already have an account? <span onClick={()=>setCurrentstate("Login")} >Login here</span></p>


                    }
            </form>
        </div>
    )
}

export default LoginPopup
