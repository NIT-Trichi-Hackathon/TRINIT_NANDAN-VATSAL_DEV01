import inbox from '@/models/inbox';
import mongoose from 'mongoose';
import React, { useState } from 'react'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Link from 'next/link';


const Chats = ({chats}) => {
  // console.log(chats);
  const router = useRouter();
  const [members, setMembers] = useState([""]);
  const [convName, setConvName] = useState("");

  function handleNameChange(event) 
  {
    setConvName(event.target.value);
    // console.log(event.target.value)
  }

  const addItem = () => {
    setMembers([...members, ""]);
  };
  const updateItem = (index, value) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
    // console.log(members)
    // console.log(members[0])
    // console.log("ha")
  };
  const createNewConv = async ({chats}) => 
  {
    // console.log(chats.inboxUIDs)
    const data = {"members": members, "inboxUID": convName }
    
    // console.log(data)

    let res = await fetch(`api/newConversation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let response = await res.json();

      for (let index = 0; index < members.length; index++) 
      {
        // console.log(`index = ${index}`)
        // console.log(members[0]);
        const hahaData = {"userEmail" : members[index], "inboxUID": convName}
        // console.log(hahaData)
        let haha = await fetch(`api/updateInbox`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hahaData),
        });
        let resp = await haha.json();
        // console.log(`done ${index}`);

      }

      toast.success("Your conversation has been created", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        setMembers([""]);
        setConvName("");
        router.push(`/chats?email=${router.query.email}`);
      }, 3000);
      
    

  };



  return (
    <div className='p-3 flex flex-col m-3'>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        <div className='mx-auto mt-4 text-3xl flex font-serif'> Inbox </div>
        <div className="px-5 py-2"> Click to see messages : 
        <div className="flex flex-col w-1/3 justify-start  space-y-2 text-xl uppercase ">

           {chats[0] && chats[0].inboxUIDs.map((item) => {
            return (
              <Link passHref={true} href={`/messages/${item}`} className='border border-black/50 p-2' key={item}>{item}</Link>
            )
          })} 
          {!chats[0] && <div>No chats yet</div>}
          </div>
          </div>


        <div className='text-xl pt-10'> Add participants to a new conversation :</div>
        <div className="flex flex-col p-1 w-1/3 ">
          <div className="text-md">Add Email ids of Participants :</div>
          {members.map((item, index) => (
            <div className="mb-3" key={index}>
              <input
                className="inputField"
                type="text"
                value={item}
                onChange={(e) => updateItem(index, e.target.value)}
              />
              <button
                className="bg-red-500 text-white mx-1 p-2 rounded-md"
                onClick={() => setMembers(members.filter((_, i) => i !== index))}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="bg-blue-500 text-white text-sm mr-auto  p-2 w-auto rounded-md"
            onClick={addItem}
          >
            Add Another Participant
          </button>
          <div className='flex space-x-2 pt-2'>
          <input
                className="inputField"
                type="text"
                placeholder='Name For Conversation'
                
        value={convName} onChange={handleNameChange}
              />
        <button
            className="bg-green-500 text-white text-sm mr-auto  p-2 w-auto rounded-md"
            onClick={createNewConv}
          >
            Create New Conversation
          </button></div>
        </div>
        
    </div>
  )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }
    // console.log(context.query.email)
    var email = context.query.email;
    // console.log(email)
    let chats = await inbox.find( {"userEmail" : email});
    // console.log(chats);
    //let similar = await Book.find({title: books.title});
    return {
      props: { chats: JSON.parse(JSON.stringify(chats)) }, // will be passed to the page component as props
    };
  }

export default Chats

