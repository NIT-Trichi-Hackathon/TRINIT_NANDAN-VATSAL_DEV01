import Link from 'next/link'
import { Router, useRouter } from 'next/router';
import React from 'react'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NavBar = ({user}) => {
  const router = useRouter();
    const logout = () => {
        localStorage.removeItem("token");
        toast.success("You have been logged out", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          router.push(`/login`);
        }, 3000);
      };
  return (
    <div className='w-full bg-slate-200 h-10 py-auto px-6 flex '>
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
        <Link className='flex my-auto mr-auto' href={"/"}>Home</Link>
        <Link className='flex my-auto px-2' href={"/chats"}>My Chats</Link>
        <Link className='flex my-auto px-2' href={"/donations"}> My Donations</Link>
        <div className='flex my-auto cursor-pointer px-2' onClick={logout}>LogOut</div>
    </div>
  )
}

export default NavBar