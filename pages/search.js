import { useRouter } from "next/router";
import React, { useState } from "react";
import Ngo from "../models/Ngo";
import mongoose from "mongoose";
import Link from "next/link";

const Search = ({ngos}) => {
    const [target, setTarget] = useState("generalSupport");
    const [search, setSearch] = useState("")
    const [locationSearch, setLocationSearch] = useState("")



  function handleTargetChange(event) 
  {
    setTarget(event.target.value);
    // console.log(event.target.value)
  }
  return (<>
  <div>
      <div className="flex flex-row py-3">
      <div className="ml-2 flex w-[25%]">
        <form className="flex items-center w-full">
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-4 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="search"
              value={search}
              onChange={(e)=>{setSearch(e.target.value)}}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              placeholder="Search By Name"
            />
          </div>
          <Link href={`/search?title=${search}`}><button
            type="submit"
            className="p-2.5 ml-1 text-sm font-medium text-white bg-orange-500 rounded-lg border border-orange-700 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-600 dark:focus:ring-orange-800"
          >
            <svg
              className="w-5 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
          </Link>
        </form>
      </div>
      <div className="ml-10 flex w-[25%]">
        <form className="flex items-center w-full">
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-4 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="locationSearch"
              value={locationSearch}
              onChange={(e)=>{setLocationSearch(e.target.value)}}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              placeholder="Search By Location"
            />
          </div>
          <Link href={`/search?location=${locationSearch}`}><button
            type="submit"
            className="p-2.5 ml-1 text-sm font-medium text-white bg-orange-500 rounded-lg border border-orange-700 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-600 dark:focus:ring-orange-800"
          >
            <svg
              className="w-5 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
          </Link>
        </form>
      </div>
          <div className=" rounded-sm border-b px-1 py-2 ml-10">Target Field : </div>
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
                <Link passHref={true}
                href={`/ngoDetails/${item.email}`} key={item._id} className="space-y-3  w-1/4 px-4 border border-black">
                {
                    <div>
                    <div className='font-semibold text-2xl underline capitalize'>{item.name}</div>
                    <div>
                        <div className='text-sm'> Target area : {item.target}</div>
                    <div className='text-xl'>Future Plans :</div>
                    <ol className='list-decimal pl-3'>
                    {item.futurePlans.slice(0, 2).map((plan) => {
                    return ( <li key={plan} className="text-sm">{plan}</li>)}) }
                    </ol>
                    </div>

                    <div>
                    <div className='text-xl'>History :</div>
                    <ol className='list-decimal pl-3'>
                    {item.history.slice(0, 2).map((hist) => {
                    return ( <li key={hist} className="text-sm">{hist}</li>)}) }
                    </ol>
                    </div>
                    </div>
    }
                </Link>
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
    let ngos
    if(context.query.title) {
      var regex = new RegExp(context.query.title, "i");
      ngos = await Ngo.find({ name: regex });
    } 
    else if(context.query.target)
    {
      ngos = await Ngo.find({ target: context.query.target });
    }
    else{
      ngos = await Ngo.find({ location: context.query.location });
    }
    return {
      props: { ngos: JSON.parse(JSON.stringify(ngos)) }, // will be passed to the page component as props
    };
  }
  
  export default Search;