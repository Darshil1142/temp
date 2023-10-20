const express = require("express")
const connectToMongo = require("./db.js")
connectToMongo();
const auth = require("./routes/auth.js");
const category_crud = require("./routes/category_crud.js");
const add = require("./routes/add.js")
const dlt=require("./routes/delete.js")
const save=require("./routes/save.js")
const cors = require("cors")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken");
const Payment = require("./routes/payment.js");

const app = express();
//const port = 4000;

dotenv.config()

let port = process.env.port || 4000


//to get data from the client we need to make a cors beetween two
app.use(cors())

//to send some information to server
app.use(express.json());
 
//Available Routes
app.use("/auth", auth);
app.use("/category_crud", category_crud);
app.use("/add", add);
app.use("/save", save);
app.use("/delete", dlt);
app.use("/payment", Payment);


app.listen(port, (err) => {
    console.log(`Server Running on port ${port}`)
})

app.post("/generateToken", (req, res) => { 
    let jwtSecretKey = process.env.JWT_SECRET_KEY; 
    let data = { 
        time: Date(), 
        userId: 12, 
    } 
  
    const token = jwt.sign(data, jwtSecretKey); 
  
    res.send(token); 
}); 

// Verification of JWT 
app.get("/validateToken", (req, res) => { 
    // Tokens are generally passed in header of request 
    // Due to security reasons. 
  
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY; 
    let jwtSecretKey = process.env.JWT_SECRET_KEY; 
  
    try { 
        const token = req.header(tokenHeaderKey); 
  
        const verified = jwt.verify(token, jwtSecretKey); 
        if(verified){ 
            return res.send("Successfully Verified"); 
        }else{ 
            // Access Denied 
            return res.status(401).send(error); 
        } 
    } catch (error) { 
        // Access Denied 
        return res.status(401).send(error); 
    } 
});
