const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/SocketDemo",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("DB is Connected")
})
.catch((e)=>{
    console.log("DB is not Connected")
});