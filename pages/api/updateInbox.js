import inbox from "@/models/inbox";
import connectDB from "@/middleware/mongoose";

const handler = async (req, res) => 
{
    // console.log(req.body);
  if (req.method == "POST") 
  {
    if(inbox.findOne({userEmail : req.body.userEmail}))
    {
        const updatedInbox = await inbox.findOneAndUpdate(
          { "userEmail" : req.body.userEmail },
          { $addToSet: { inboxUIDs: req.body.inboxUID } },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        res.json(updatedInbox);
      }
       else 
       {
        if (req.method == "POST") 
        {
            
            console.log(req.body);
            let n = new inbox({
              userEmail: req.body.userEmail,
              inboxUID: req.body.inboxUID,
            });
            await n.save();
          } else {
            res.status(400).json({ error: "This method is not allowed" });
          }
      }
  }
//   {
//     if(inbox.findOne({userEmail : req.body.email}))
//     {
//         var data = inbox.findOne({userEmail : req.body.email});
//         inbox.deleteOne({userEmail : req.body.email})
//         console.log(data);
//         const newUIDs = {...data.inboxUIDs , req.body.inboxUID};
//         let n = new inbox({
//             userEmail: req.body.email,
//             inboxUID: 
//     });
        
//     }
//     let n = new inboxParticipants({
//       members: req.body.members,
//       inboxUID: req.body.inboxUID,
//     });
//     await n.save();
//   } else {
//     res.status(400).json({ error: "This method is not allowed" });
//   }

//   let response = await inboxParticipants.find();
//   res.status(200).json({ response });
};

export default connectDB(handler);
