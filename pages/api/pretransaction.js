const https = require("https");
// const PaytmChecksum = require("node_modules/paytmchecksum/PaytmChecksum");
const PaytmChecksum = require("paytmchecksum");

import connectDB from "../../middleware/mongoose";

const handler = async (req, res) => {
  console.log("In req body");
  console.log(req.body);
  if (req.method == "POST") {
    var paytmParams = {};

    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.NEXT_PUBLIC_PAYTM_MID,
      websiteName: process.env.NEXT_PUBLIC_WEBSITE,
      orderId: req.body.oid,
      callbackUrl: "http://localhost:3000/api/posttransaction",
      txnAmount: {
        value: req.body.amount,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.email,
      },
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MERCHANT_KEY
    );

    paytmParams.head = {
      signature: checksum,
    };

    var post_data = JSON.stringify(paytmParams);

    const requestAsync = () => {
      return new Promise((resolve, reject) => {
        //working
        var options = {
          /* for Staging */
          hostname: "securegw-stage.paytm.in",
          /* for Production */
          // hostname: 'securegw.paytm.in',
          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            console.log("response :".response);
            resolve(JSON.parse(response).body);
          });
        });
        // console.log(post_req);
        post_req.write(post_data);

        post_req.end();
      });
    };
    let myr = await requestAsync();
    res.status(200).json(myr);
  }
};
export default connectDB(handler);
