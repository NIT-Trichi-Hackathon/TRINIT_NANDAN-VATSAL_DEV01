import React from 'react'
import { useForm } from "react-hook-form";

const NgoSignUp = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
      <input type="text" {...register("name", { required: true }) } placeholder="NGO Name" className='inputField'/>
      <input type="email" {...register("email", { required: true })} placeholder="Email"  className='inputField'/>

      <input type="tel" {...register("phoneNumber")} placeholder="Contact Number"  className='inputField'/>
      <input type="file" {...register("donationPreference")} placeholder="Donation Preference" className='inputField'/>
      

      {errors.exampleRequired && <span>This field is required</span>}
      
      <button type='submit' onClick={handleSubmit(onSubmit)} className='font-bold text-md rounded-lg tracking-widest py-2 bg-green-300 '>Submit</button>
    </form>
    </>
  )
}

export default NgoSignUp