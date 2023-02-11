import message from "@/models/message";
import mongoose from "mongoose";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Post = ({ messages}) => {
  const router = useRouter();
  const { inboxUID } = router.query;
  const [newMessage, setNewMessage] = useState("");
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState("");

  const jwt = require("jsonwebtoken");
  // console.log(user.value)

  // setUserData(jwt.verify(user.value, process.env.JWT_Key))

  useEffect(() => {
    const mytoken = localStorage.getItem("token");
    if (!mytoken) {
      router.push("/");
    } else {
      // console.log(mytoken);
      setToken(mytoken);

      //   console.log(mytoken);
      //   console.log(token);
      fetchData(mytoken);

    //   console.log(userData);
    //   console.log("hi");
    }
  }, []);

  const fetchData = async (mytoken) => {
    // console.log("this is fetch Data")
    // console.log(mytoken);
    // console.log(token);
    let data = { token: mytoken , category:"phl"};
    // console.log(data);
    let a = await fetch(`http://localhost:3000/api/getUserDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await a.json();
    // console.log(res);
    setUserData(res.userDetails)
    // console.log("yay");
    // await setUserData(jwt.verify(mytoken, "secretjwt"));
    // console.log(data);
  };
console.log(userData.email)
  // const token = localStorage.getItem("token");
  // console.log(token)
  // const jwt = require('jsonwebtoken')
  // console.log(userData);
  // var decoded = jwt.verify(user.value, process.env.JWT_Key);
  // console.log(decoded) // bar
  const email = router.query.email;
console.log(userData.email)
  const handleSendMessage = async () => {
    const data = { inboxUID: inboxUID, message: newMessage, token: token };

    let res = await fetch(`http://localhost:3000/api/newMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let response = await res.json();

    setNewMessage("")
    router.push("/messages/"+inboxUID)

  };
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="text-4xl py-2">Viewing messages for : {inboxUID} </div>
{/* ( item.senderEmail.localeCompare(userData.email)  && " bg-blue-300") + ((item.senderEmail===(userData.email)) && " bg-green-300") */}
            
      <div className="w-full">
        {messages.map( (item) => 
        (
          <div className="flex mb-3 w-full" key={item._id}>
            
            {item.senderEmail=== (userData.email) &&<div className={`flex space-x-2  mr-auto `}> 
             <div className="text-xs my-auto"> {item.senderEmail} </div>
              <div className="text-lg">{item.message}</div></div>}
              { !(item.senderEmail=== (userData.email)) &&<div className={`flex space-x-2  ml-auto `}> 
              <div className="text-lg">{item.message}</div><div className="text-xs my-auto"> {item.senderEmail} </div>
              </div>}
            
          </div>
        ))}
      </div>
      <div className="pt-10 flex space-x-5 align-middle ">
        <div className="my-auto">Add new message </div>
        <div className="flex space-x-2">
          <input
            className="inputField"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
          />
          <button
            className="bg-red-200 py-auto px-2 rounded-md cursor-pointer"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let messages = await message.find({ inboxUID: context.query.inboxUID });
  //let similar = await Book.find({title: books.title});
  return {
    props: { messages: JSON.parse(JSON.stringify(messages)) }, // will be passed to the page component as props
  };
}
