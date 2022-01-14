const credentials = {secretUser:"user" , secretPassword:"password"}

const cors = require("cors")
const express = require("express")
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get("/", (req ,res)=>{
   const encodedAuth = (req.headers.authorization || '').split(' ')[1] || '' // getting the part after Basic
   const [user, password] = Buffer.from(encodedAuth, 'base64')
      .toString().split(':')
      if(user===credentials.secretUser && password===credentials.secretPassword){
         res.status(200).send({"STATUS":"SUCCESS"})
         console.log("Logged in")
     }else{
         res.set('WWW-Authenticate', 'Basic realm="Access to Index"')
         res.status(401).send("Unauthorised access")
     }
})

app.get("/health", (req ,res)=>{
   headers={"http_status":200, "cache-control":  "no-cache"}
   body={"status": "available"}
})


app.post('/authorize', (req, res) => {
   // Insert Login Code Here
   let user = req.body.user;
   let password = req.body.password;
   console.log(`User ${user}`)
   console.log(`Password ${password}`)

   if(user===credentials.secretUser && password===credentials.secretPassword){
         console.log("Authorized")
      res.status(200).send({"STATUS":"SUCCESS"})
  }else{
      console.log("Not authorized")
      res.status(200).send({"STATUS":"FAILURE"})
   }
});

app.listen(PORT , ()=>{
     console.log(`STARTED LISTENING ON PORT ${PORT}`)
});