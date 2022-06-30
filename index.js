const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// sagor oNz1p79D7YYXAKzK


app.use(cors());
app.use(express.json());




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://sagor:oNz1p79D7YYXAKzK@cluster0.qzo0a.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log('connect to db')
  
// });

async function run() {
    try {
      await client.connect();
      console.log('database connected');

      const Taskcollection = client.db('task-manager').collection('taskadd');


    //   http://localhost:5000/task
      app.get('/task',async (req,res)=>{
        const q = req.query;
        console.log(q);
        const cursor = Taskcollection.find({});
        const result = await cursor.toArray();
        res.send(result);
      })

    //   http://localhost:5000/task 
      app.post('/task',async (req,res)=>{
        const data = req.body;
        console.log(data);
        const result = await Taskcollection.insertOne(data)
        res.send(result);
      });


      //update
    //   http://localhost:5000/task/62bddc50a456c6bd8ac58e51

      app.put('/task/:id', async(req,res)=>{
        const id = req.params.id;
        const data = req.body;
        console.log('from update api',data);
        const filter = { _id : ObjectId(id)}
        const options = { upsert: true };
        const updateDoc = {
          $set: {name:data.name}
 
        };
        const result = await Taskcollection.updateOne(filter,updateDoc,options);
        res.send(result);
      })

      //delete

      app.delete('/task/:id',async(req,res)=>{
        const id = req.params.id;
        const filter = {_id:ObjectId(id)};
        const result = await Taskcollection.deleteOne(filter);
        res.send(result);
      })

    }
    finally{

    }
};
    run().catch(console.dir);


app.get('/', (req,res)=>{
    res.send('look mama  can code node now');
});


app.listen(port,()=>{
    console.log('listening to port', port);
})