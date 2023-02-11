import React from 'react'

const TopPreferences = ({donationPreference,ngos}) => {
    console.log(donationPreference)
  return (
    <>
    <div>Top Preferences :</div>
    <div className="px-5 py-2 mx-auto">
    <div className='flex flex-wrap justify-start  space-x-2'>
    {ngos.map((item) => 
    {
        console.log(item)
        if(donationPreference != item.target) return ;
        else 
              return (
                <div key={item._id} className="space-y-3  w-1/4 px-4 border border-black">
                {
                    donationPreference == item.target &&  <div>
                    <div>{item.name}</div>
                    <div>
                    <div className='text-xl'>Future Plans :</div>
                    <ol className='list-decimal pl-3'>
                    {item.futurePlans.map((plan) => {
                    return ( <li key={plan} className="text-xl">{plan}</li>)}) }
                    </ol>
                    </div>

                    <div>
                    <div className='text-xl'>History :</div>
                    <ol className='list-decimal pl-3'>
                    {item.history.map((hist) => {
                    return ( <li key={hist} className="text-xl">{hist}</li>)}) }
                    </ol>
                    </div>
                    </div>
    }
                </div>
)  
})
    }
    </div>
    </div>
    </>
  )
}

export default TopPreferences

  