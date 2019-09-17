const express=require('express');
const {join}=require('path');
const PORT =process.env.PORT||3000;

const app=express();

app.use(express.static('.'));
app.get('/*',(req,res)=>{
res.sendFile(join(__dirname,'index.html'));
});

app.listen(PORT,() =>
    console.log(`Listening on PORT: ${PORT}`)
);