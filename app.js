const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
// curl --request GET \
// --url 'https://<dc>.api.mailchimp.com/3.0/' \
// --user 'anystring:TOKEN

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");   
})

app.post("/",function(req,res){
    const axios = require('axios');
    const apiKey = <YOUR API KEY>;
    const listId = '84865a8654';
    const apiUrl = `https://us21.api.mailchimp.com/3.0/lists/${listId}/members/`; // Replace <dc> with your Mailchimp data center code
    const firstName= req.body.fName;
    const lastName= req.body.lName;
    const email= req.body.email;
    // Subscriber data
    const subscriberData = {
      email_address: email,
      status: 'subscribed', // or 'pending' for double opt-in
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
        // Add any additional merge fields as needed
      }
      
    };
    
    // Make the API request to add the subscriber
    axios.post(apiUrl, subscriberData, {
        headers: {
          'Authorization': `apikey ${apiKey}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        const status = response.status;
      
        if (status === 200) {
          console.log('Subscriber added successfully. Redirecting to success.html');
          // Redirect to success.html for status 200
          res.sendFile(__dirname+"/success.html");
        } else {
          console.log(`Unexpected status: ${status}. Redirecting to error.html`);
          // Redirect to error.html for any other status
          res.sendFile(__dirname+"/failure.html");
        }
      })
      .catch(error => {
        console.error('Error adding subscriber:', error.response.data);
        // Redirect to error.html for API request error
        res.sendFile(__dirname+"/failure.html");
      });
     //const jsonData = JSON.stringify(data);

 });
// const axios = require('axios');
// const apiKey = 'c5071f84e178f73737fe322e2f8fb9f4';
// const listId = '84865a8654';
// const apiUrl = `https://us21.api.mailchimp.com/3.0/lists/${listId}/members/`; // Replace <dc> with your Mailchimp data center code
// const firstName= req.body.fName;
// const lastName= req.body.lName;
// const email= req.body.email;
// // Subscriber data
// const subscriberData = {
//   email_address: email,
//   status: 'subscribed', // or 'pending' for double opt-in
//   merge_fields: {
//     FNAME: firstName,
//     LNAME: lastName
//     // Add any additional merge fields as needed
//   }
// };

// // Make the API request to add the subscriber
// axios.post(apiUrl, subscriberData, {
//     headers: {
//       'Authorization': `apikey ${apiKey}`,
//       'Content-Type': 'application/json'
//     }
//   })
//   .then(response => {
//     console.log('Subscriber added successfully:', response.data);
//   })
//   .catch(error => {
//     console.error('Error adding subscriber:', error.response.data);
//   });



app.listen(4000,function(){
    console.log("The server is running on port 4000.");
})



