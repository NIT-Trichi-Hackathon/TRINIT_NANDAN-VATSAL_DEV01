import React, { useState } from 'react'
import Ngo from '@/models/Ngo'
import mongoose from "mongoose";
import TopPreferences from '@/components/TopPreferences';
import Suggestions from '@/components/Suggestions'
import Link from 'next/link';
import newsAndEvent from '@/models/newsAndEvent';
// export default function Home() 
const Home = ({ngos,news}) => {
{
  // console.log(news);
  const [target, setTarget] = useState("generalSupport");
  const [search, setSearch] = useState("")
  const [locationSearch, setLocationSearch] = useState("")

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
          <div className=" rounded-sm border-b px-1 py-2 ml-10">By Target Field : </div>
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
          <Link href={`/search?target=${target}`} className="font-bold text-md rounded-lg h-auto px-3 ml-3 flex bg-green-300 "><button className='py-auto tracking-widest'>Filter</button>
          </Link></div>
        
      </div>
      
    <TopPreferences donationPreference={"health"} ngos={ngos}></TopPreferences>
    <div className='flex flex-col py-4'>
    <div className='text-2xl italic animate-pulse'>Current News : </div>
    <ul className='pl-4 list-decimal space-y-0.5'>
      {news.map((item)=> {
        return (
          <li key={item._id} className="capitalize text-lg">{item.news}</li>
        )
      })}
      </ul>
    </div>
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
    let news = await newsAndEvent.find().sort({createdAt: -1}).limit(5);
    // let ngos = await Ngo.find({target:"insueasa"});
    return {
      props: { ngos: JSON.parse(JSON.stringify(ngos)), news: JSON.parse(JSON.stringify(news)) }, // will be passed to the page component as props
    };
  }
  