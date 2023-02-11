import React from 'react'
import Philanthropist from '@/models/Philanthropist'
import mongoose from "mongoose";

const Philan = ({philanthropists}) => {
    console.log(philanthropists)
  return (
    <div>philan</div>
  )
}

export default Philan

export async function getServerSideProps(context) 
{
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    let philanthropist = await Philanthropist.find();
    return {
      props: { philanthropists: JSON.parse(JSON.stringify(philanthropist)) }, // will be passed to the page component as props
    };
  }
  