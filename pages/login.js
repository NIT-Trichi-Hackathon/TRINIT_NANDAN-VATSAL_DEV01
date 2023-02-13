import React, { useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';

const Login = () => {
  const router = useRouter();
  const [category, setCategory] = useState("");
//   console.log(category);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = async emailPass => {
    console.log(emailPass)
    console.log(category)

    const data = { ...emailPass, category}
    console.log(data)

    let res = await fetch(`api/login${category}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let response = await res.json();
      
      if (response.success) {
        localStorage.setItem("token", response.token);
        toast.success("You are Logged In", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        toast.error(response.error, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }


  }
    ;

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
      <div className="text-4xl tracking-wider">Log In /</div><div className="cursor-pointer text-blue-400/70 pl-2 text-2xl" onClick={()=>{router.push("/signup");}}>Sign Up </div>
      </div>
      <div className="flex flex-row">
        <div className="flex items-center border-b-2 px-4 pb-3">
          <div className="px-10">Log in as : </div>
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
      <input type="email" {...register("email", { required: true })} placeholder="Email"  className='inputField'/>
      <input type="password" {...register("password", { required: true })} placeholder="Password"  className='inputField'/>
      
      <button type='submit' onClick={handleSubmit(onSubmit)} className='font-bold text-md rounded-lg tracking-widest py-2 bg-green-300 '>Submit</button>
    </form>

      

    </div>
  )
}

export default Login