import NgoSignUp from "@/components/NgoSignUp";
import PhilanthropistSignUp from "@/components/PhilanthropistSignUp";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Signup = () => {
  const router = useRouter();
  

  const [category, setCategory] = useState("");
  console.log(category);
  return (
    <div className="flex flex-col p-2 pt-10 items-center justify-center bg-green-500/10  space-y-5">
        <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex items-center">
      <div className="text-4xl tracking-wider">Sign Up /</div><div className="cursor-pointer text-blue-400/70 pl-2 text-2xl" onClick={()=>{router.push("/login");}}>Log in </div>
      </div>
      <div className="flex flex-row">
        <div className="flex items-center border-b-2 px-4 pb-3">
          <div className="px-10">Sign Up as : </div>
          <input
            type="checkbox"
            className="appearance-none border-2 border-solid border-black/20 h-4 w-4 rounded-full checked:bg-purple-500 checked:border-green-400/70"
            id="philanthropist"
            checked={category === "philanthropist"}
            onChange={() => setCategory("philanthropist")}
          />
          <label className="ml-3" htmlFor="philanthropist">
            Philanthropist
          </label>
        </div>
        <div className="flex items-center border-b-2 px-4 pb-3">
          <input
            type="checkbox"
            className="appearance-none border-2 border-solid border-black/20 h-4 w-4 rounded-full checked:bg-purple-500 checked:border-green-400/70"
            id="ngo"
            checked={category === "ngo"}
            onChange={() => setCategory("ngo")}
          />
          <label className="ml-3" htmlFor="ngo">
            NGO
          </label>
        </div>
      </div>

      {category == "ngo" && <NgoSignUp />}
      {category == "philanthropist" && <PhilanthropistSignUp />}
    </div>
  );
};

export default Signup;
