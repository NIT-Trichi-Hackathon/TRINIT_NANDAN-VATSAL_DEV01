import Link from 'next/link';
import React from 'react'

const TopPreferences = ({donationPreference,ngos}) => {
    // console.log(donationPreference)
    
  return (
    <>
    <div className='text-2xl italic'>Top Preferences :</div>
    <div className="px-5 py-2 mx-auto">
    <div className='flex flex-wrap justify-start  space-x-2'>
    {ngos.map((item) => 
    {
        // console.log(item)
        if(donationPreference != item.target) return ;
        else 
              return (
                <Link key={item._id} passHref={true}
                href={`/ngoDetails/${item.email}`} className="space-y-3  w-1/4 px-4 border border-black">
                {
                    donationPreference == item.target &&  <div>
                    <div className='font-semibold text-2xl underline capitalize'>{item.name}</div>
                    <div>
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
    </div>
    </div>
    </>
  )
}

export default TopPreferences

  