const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors());

app.get('/', (req,res)=>{
    res.send('look mama  can code node now');
});


app.listen(port,()=>{
    console.log('listening to port', port);
})