
    import connectDB from "@/middleware/mongoose";
    import newsAndEvent from "@/models/newsAndEvent";
    
    const handler = async (req, res) => 
    {
        // console.log(decoded.email) // bar
        // console.log(req.body);
      if (req.method == "POST") 
      {
        if(req.body.category == "newNGO")
        {
            const newsMSG = ` A new ngo has be founded named : ${req.body.ngoName} `; 
        let n = new newsAndEvent({
            news:newsMSG,
        });
        await n.save();
    }
    else if(req.body.category == "newDonation")
    {
        const newsMSG = `  ${req.body.Name} donated the amount of ₹ ${req.body.amount} to ${req.body.ngoName} `; 
        let n = new newsAndEvent({
            news:newsMSG,
        });
    }
      } else {
        res.status(400).json({ error: "This method is not allowed" });
      }
    
      let response = await message.find();
      res.status(200).json({ response });
    };
    
    export default connectDB(handler);
    
    
    
    
    
    
    // news  -> category : req 
    // '' ngo requested rs'' for the 'cause' PLs help as much as u can 
    
    //news -> category : newComm
    // a new community has been formed by the name ;;; do check it out 


    //------------------------------------------------////*************** */
    // if news -> size = maxSize .... remove the oldest news to make room for a new one ///////


    //  "category" : "VatsalPro"

    // ----> req ......... req.body.category ----------> to make the news string and link 
    /// -----> datatype ---

    // newsString --- string 
    // link : not necessary 
    // timestamps true