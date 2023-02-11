import React from 'react'
import Ngo from '@/models/Ngo'
import mongoose from "mongoose";


// export default function Home() 
const Home = ({ngos}) => {
{
  console.log(ngos);
  return (
    <div className=" text-3xl ">Hi</div>

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
  
