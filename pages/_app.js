import '@/styles/globals.css'
import React, { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) 
{
  
  const [user, setUser] = useState({ value: null });
  // const [token, setToken] = useState("");
    // console.log(messages);
    useEffect(() => {
      console.log("hey i am nandan useeffect from app.js");
      const token = localStorage.getItem("token");
      if (token) {
      setUser({ value: token });
    }
  }, []);
      // setToken(localStorage.getItem("token"));
    //   console.log("hi this is useEFFect");
    //   console.log(token);
    // }, [token])
    
  return <Component {...pageProps} user={user} />
}
