import { useRouter } from "next/router";
import React, { useState } from "react";
import Ngo from "../models/Ngo";
import mongoose from "mongoose";
import Link from "next/link";

const Search = ({ngos}) => {
    const [target, setTarget] = useState("generalSupport");


  function handleTargetChange(event) 
  {
    setTarget(event.target.value);
    // console.log(event.target.value)
  }
  return (<>
  <div>
      <div className="flex flex-row py-3">
          <div className=" rounded-sm border-b px-1 py-2">Target Field : </div>
          <select value={target} onChange={handleTargetChange} className="inputField">
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
          <Link href={`/search?target=${target}`} className="font-bold text-md rounded-lg tracking-widest px-3 ml-3 bg-green-300 "><button className=''>Filter</button>
          </Link></div>
        
      </div>
    <div>Results : </div>
    <div className="px-5 py-2 mx-auto">
    <div className='flex flex-wrap justify-start  space-x-2'>
    {ngos.map((item) => 
    {
        // console.log("i am Suggestions")
        // console.log(item.target)
        // console.log(donationPreference == item.target);
        // if(donationPreference == item.target) return ;
        // else 
              return (
                <div key={item._id} className="space-y-3  w-1/4 px-4 border border-black">
                {
                    <div>
                    <div className='font-semibold text-2xl underline capitalize'>{item.name}</div>
                    <div>
                        <div className='text-sm'> Target area : {item.target}</div>
                    <div className='text-xl'>Future Plans :</div>
                    <ol className='list-decimal pl-3'>
                    {item.futurePlans.map((plan) => {
                    return ( <li key={plan} className="text-sm">{plan}</li>)}) }
                    </ol>
                    </div>

                    <div>
                    <div className='text-xl'>History :</div>
                    <ol className='list-decimal pl-3'>
                    {item.history.map((hist) => {
                    return ( <li key={hist} className="text-sm">{hist}</li>)}) }
                    </ol>
                    </div>
                    </div>
    }
                </div>
)  
})

    }
    </div></div>
    </>
  )
}

export async function getServerSideProps(context) {
    // console.log(context.query)
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    let ngos = await Ngo.find({ target: context.query.target });
    return {
      props: { ngos: JSON.parse(JSON.stringify(ngos)) }, // will be passed to the page component as props
    };
  }
  
  export default Search;