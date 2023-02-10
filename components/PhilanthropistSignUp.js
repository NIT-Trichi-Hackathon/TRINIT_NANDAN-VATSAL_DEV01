import React from 'react'
import { useForm } from "react-hook-form";

const PhilanthropistSignUp = () => 
{
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-2">
      <input type="text" {...register("name", { required: true }) } placeholder="Name" className='inputField'/>
      <input type="email" {...register("email", { required: true })} placeholder="Email"  className='inputField'/>

      <input type="tel" {...register("phoneNumber")} placeholder="Contact Number"  className='inputField'/>
      {/* <input {...register("donationPreference")} placeholder="Donation Preference" className='inputField'/> */}
      <div className='flex flex-row '>
      <div className=' rounded-sm border-b px-1 py-2'>Donation Preference : </div>
      <select {...register("donationPreference")} className='inputField' >
        <option value="generalSupport">General Support</option>
        <option value="education">Education</option>
        <option value="health">Health</option>
        <option value="HandP">Hunger and Poverty</option>
        <option value="environment">Environment</option>
        <option value="humanitarianAid">Humanitarian Aid</option>
        <option value="animals">Animals</option>
        <option value="artsAndCulture">Arts and Culture</option>
        <option value="other">Other</option>
      </select>
      </div>

      {errors.exampleRequired && <span>This field is required</span>}
      
      <button type='submit' onClick={handleSubmit(onSubmit)} className='font-bold text-md rounded-lg tracking-widest py-2 bg-green-300 '>Submit</button>
    </form>
    </>
  )
}

export default PhilanthropistSignUp