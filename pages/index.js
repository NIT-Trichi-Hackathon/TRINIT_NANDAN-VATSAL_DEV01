import React, { useState } from 'react'
import Ngo from '@/models/Ngo'
import mongoose from "mongoose";
import TopPreferences from '@/components/TopPreferences';
import Suggestions from '@/components/Suggestions'
import Link from 'next/link';
// export default function Home() 
const Home = ({ngos}) => {
{
  
  const [target, setTarget] = useState("generalSupport");


  function handleTargetChange(event) 
  {
    setTarget(event.target.value);
    // console.log(event.target.value)
  }
  // console.log(ngos);
  return (
    <div className="py-4 pl-4">

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

    <TopPreferences donationPreference={"health"} ngos={ngos}></TopPreferences>
    <Suggestions donationPreference={"health"} ngos={ngos}></Suggestions>
    </div>

  )
}
}
export default Home
export async function getServerSideProps(context) 
{
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    let ngos = await Ngo.find();
    // let ngos = await Ngo.find({target:"insueasa"});
    return {
      props: { ngos: JSON.parse(JSON.stringify(ngos)) }, // will be passed to the page component as props
    };
  }
  
