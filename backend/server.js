const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()
const PORT = 5000;
const cors = require("cors")

app.use(cors())
app.use(cors(
{
origin:["https://deploy-mern-1whq.vercel.app"],
methods:["POST","GET"]
credentials:true
}
));
app.use(express.json())

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/Project')
.then(()=>{
    console.log("bd connection succesfully")
})
.catch((error)=>{
    console.log(error)
})

// User Schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
},
{timestamps: true})

const User = mongoose.model("User", userSchema)

// Create User
app.post("/createuser", async(req, res) => {
    try {
        const bodyData = req.body
        const user = new User(bodyData)
        const userData = await user.save()
        res.send(userData)
    } catch(error) {
       res.send(error)
    }
})
 
// Read all users
app.get("/readalluser", async (req, res) => {
    try {
        const userData = await User.find({})
        res.send(userData)
    } catch (error) {
        res.send(error)
    }
})

app.get("/read/:id", async(req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById({_id : id})
        res.send(user)
    } catch(error) {
        res.send(error)
    }
})

// Update User

app.put("/updateuser/:id", async (req,res) => {
    try {
        const id = req.params.id
        const user = await User.findByIdAndUpdate({_id: id }, req.body,{
            new:true,
        })
        res.send(error)
    } catch(error) {
        res.send(error)
    }
})

// Delete user

app.delete("/delete/:id", async (req, res)=> {
    try {
        const id = req.params.id
        const user = await User.findByIdAndDelete({_id: id})
        res.send(user)
    } catch(error) {
        res.send(error) }
})

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)

})
