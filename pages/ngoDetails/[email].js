import { useRouter } from "next/router";
import mongoose from "mongoose";
import Ngo from "../../models/Ngo";

import React, { useState } from "react";

import Head from "next/head";
import Script from "next/script";

const Post = ({ ngo }) => {
  const router = useRouter();
  //   console.log(ngo);

  const [amount, setAmount] = useState(0);

  function handleTargetChange(event) {
    setAmount(event.target.value);
    // console.log(event.target.value)
  }

  const { email } = router.query;

  const initiatePayment = async () => {
    //Get a transaction token
    let oid = Math.floor(Math.random() + Date.now());

    const data = { oid, amount, email };
    console.log(data);
    let a = await fetch("http://localhost:3000/api/pretransaction", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });


    // 1. database -> model donations /////// donations ----> d_id donor_email receiver amount 
    // 2. news ----> api call -----> category donation --->
    // 'ngo name' just  got a new donation of rs '  ' by ' -- '   


    let txnRes = await a.json();
    console.log(txnRes);
    let txnToken = txnRes.txnToken;

    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: oid,
        token: txnToken,
        tokenType: "TXN_TOKEN",
        amount: amount,
      },
      handler: {
        notifyMerchant: function (eventName, data) {
          console.log("notifyMerchant handler function called");
          console.log("eventName=>", eventName);
          console.log("data=>", data);
          console.log("hello handler");
        },
      },
    };
    window.Paytm.CheckoutJS.init(config)
      .then(function onSuccess() {
        console.log("This is window success");
        // after successfully updating configuration, invoke checkoutjs
        window.Paytm.CheckoutJS.invoke();
      })
      .catch(function onError(error) {
        console.log("error => ", error);
      });
  };
  return (
    <div className="p-3 pl-10 pt-6">
      <meta
        name="viewport"
        content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
      />
      <Script
        type="application/javascript"
        crossorigin="anonymous"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
      />
      <div className="text-4xl text-bold tracking-widest">{ngo.name}</div>
      <div>
        <div className="text-black/50">Email : {email}</div>
        <div className="text-black/50">Contact : {ngo.phoneNumber}</div>
        <div className="text-black/50">Location : {ngo.location}</div>
      </div>
      <div className="capitalize font-semibold">Target Area : {ngo.target}</div>
      <div className="capitalize text-xl py-2">
        Our End Goal is : <span className="font-semibold">{ngo.endGoal}</span>
      </div>

      <div className="mt-10">
        <div className="font-semibold text-xl pb-2">
          In the past we have been successfull in :
        </div>
        <ol className="list-decimal space-y-1 pl-10">
          {ngo.history.slice(0, 2).map((hist) => {
            return (
              <li key={hist} className="text-md">
                {hist}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-10">
        <div className="font-semibold text-xl pb-2">
          Our Future Plans are :{" "}
        </div>
        <ol className="list-decimal space-y-1 pl-10">
          {ngo.futurePlans.map((plan) => {
            return (
              <li key={plan} className="text-md">
                {plan}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-10 text-2xl font-semibold">
        If you wish to donate us : ₹
        <input
          type={Number}
          value={amount}
          onChange={handleTargetChange}
          className="inputField"
        ></input>{" "}
        <button
          onClick={initiatePayment}
          className="bg-blue-500 text-white p-2 px-6 rounded-xl"
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let ngo = await Ngo.findOne({ email: context.query.email });
  //let similar = await Book.find({title: books.title});
  return {
    props: { ngo: JSON.parse(JSON.stringify(ngo)) }, // will be passed to the page component as props
  };
}

export default Post;
