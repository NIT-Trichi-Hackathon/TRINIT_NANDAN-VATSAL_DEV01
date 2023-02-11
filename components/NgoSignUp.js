import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const NgoSignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [plans, setPlans] = useState([""]);
  const [history, setHistory] = useState([""]);
  const onSubmit = async(e) => {
    // console.log(e);
    // console.log(plans);
    // console.log(history);

    const data = {...e,"futurePlans":plans,history}
    // console.log(data)

    let res = await fetch(`api/addNgo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let response = await res.json();

      // ------------------- //// addNews call -> api/addNews --> news ->CATEGORY : newNgo --> 
      // "A new ngo is found do check out " ` name ` hopfully link

      // amount oid 


      toast.success("Your account has been created", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    

  };

  const addItem = () => {
    setPlans([...plans, ""]);
  };

  const addHistory = () => {
    setHistory([...history, ""]);
  };

  const updateItem = (index, value) => {
    const newPlans = [...plans];
    newPlans[index] = value;
    setPlans(newPlans);
  };

  const updateHistory = (index, value) => {
    const newHistory = [...history];
    newHistory[index] = value;
    setHistory(newHistory);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-2"
      >
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="NGO Name"
          className="inputField"
        />
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="inputField"
        />

        <input
          type="tel"
          {...register("phoneNumber")}
          placeholder="Contact Number"
          className="inputField"
        />
        <div className="flex flex-row ">
          <div className=" rounded-sm border-b px-1 py-2">Target Field : </div>
          <select {...register("target")} className="inputField">
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

        <div className="flex flex-col border border-red-400 p-1">
          <div className="text-xl">History :</div>
          {history.map((item, index) => (
            <div className="mb-3" key={index}>
              <input
                className="inputField"
                type="text"
                value={item}
                onChange={(e) => updateHistory(index, e.target.value)}
              />
              <button
                className="bg-red-500 text-white mx-1 p-2 rounded-lg"
                onClick={() => setHistory(history.filter((_, i) => i !== index))}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="bg-blue-500 text-white p-2 rounded-xl"
            onClick={addHistory}
          >
            Add History
          </button>
        </div>

        <input
          type="text"
          {...register("endGoal")}
          placeholder="End Goal"
          className="inputField"
        />

        <div className="flex flex-col border border-red-400 p-1">
          <div className="text-xl">Future Plans :</div>
          {plans.map((item, index) => (
            <div className="mb-3" key={index}>
              <input
                className="inputField"
                type="text"
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
              />
              <button
                className="bg-red-500 text-white mx-1 p-2 rounded-lg"
                onClick={() => setPlans(plans.filter((_, i) => i !== index))}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="bg-blue-500 text-white p-2 rounded-xl"
            onClick={addItem}
          >
            Add Item
          </button>
        </div>

        {/* <input type="text" {...register("plans")} placeholder="Plans"  className='inputField'/> */}

        {/* <input type="file" {...register("donationPreference")} placeholder="Donation Preference" className='inputField'/> */}
        
        <input
          type="text"
          {...register("location")}
          placeholder="Location"
          className="inputField"
        />
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="Password"
          className="inputField"
        />

        {errors.exampleRequired && <span>This field is required</span>}

        <button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="font-bold text-md rounded-lg tracking-widest py-2 bg-green-300 "
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default NgoSignUp;
