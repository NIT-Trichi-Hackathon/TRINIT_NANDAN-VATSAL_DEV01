import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Donations = () => {
    
  const [donations, setDonations] = useState([]);
  const router = useRouter;
  useEffect(() => {
    const fetchDonations = async () => {
      let a = await fetch(`api/mydonations`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: localStorage.getItem("token") }),
      });
      let res = await a.json();
      setDonations(res.mydonations);
      console.log(res.mydonations);
    };
    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      fetchDonations();
    }
  }, [router]);


  return (
    <div className=" min-h-[60vh]">
      <div className=" text-3xl text-center font-bold py-8  ">
        My donations
      </div>

      <div className="relative ">
        <table className="w-full text-sm text-left text-gray-900 ">
          <thead className="text-xs text-gray-700  uppercase bg-gray-100 ">
            <tr className="">
              <th scope="col" className="py-3 px-6"></th>
              <th scope="col" className="py-3 px-6">
                Donation ID
              </th>
              <th scope="col" className="py-3 px-6">
                Date
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
              Receiver Mail
              </th>
            </tr>
          </thead>
          <tbody >
          
            {donations.map((item) => {
              return (
                <tr
                  key={item._id}
                  className="bg-white border-b  hover:bg-orange-100  cursor-pointer"
                >
                  <td class="px-6 py-3">
                    
                    </td>
                  
                    <th
                      scope="row"
                      className="py-3 px-6 font-medium whitespace-nowrap text-gray-900  "
                    >

                        {item.donationID}
                    </th>

                  <td class="px-6 py-3">{item.createdAt.slice(0, 10)}</td>

                    <td className="py-3 px-6">₹ {item.amount}</td>

                    <td className="py-3 px-6">{item.receiver_mail}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donations

