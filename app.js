const credentials = {secretUser:"user" , secretPassword:"password"}
const cors = require("cors")
const express = require("express")
const app = express()
process.env.PORT = 3000

app.use(cors())
app.get("/", (req ,res)=>{
   const encodedAuth = (req.headers.authorization || '')
      .split(' ')[1] || '' // getting the part after Basic

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

app.listen(3000 , ()=>{
     console.log(`STARTED LISTENING ON PORT ${process.env.PORT}`)
});