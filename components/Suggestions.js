import React from 'react'

const Suggestions = ({donationPreference,ngos}) => {
    // console.log("hi i am other Suggestions")
  return (
    <>
    <div className='text-2xl italic'>Other Suggestions :</div>
    <div className="px-5 py-2 mx-auto">
    <div className='flex flex-wrap justify-start  space-x-2'>
    {ngos.map((item) => 
    {
        // console.log("i am Suggestions")
        // console.log(item.target)
        // console.log(donationPreference == item.target);
        if(donationPreference == item.target) return ;
        else 
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
    </div>
    </div>
    </>
  )
}

export default Suggestions

