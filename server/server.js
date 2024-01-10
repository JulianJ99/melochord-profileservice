require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const cors = require("cors");
const port = 8081;

const corsOptions ={
  origin:['http://localhost:3000'], 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.use(cors(corsOptions))
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {


    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db("melochord");
    const databaseCollection = database.collection("profiles");

    app.get("/", async (req, res) => {
      const data = databaseCollection.find();
      const result = await data.toArray();
      res.send(result);
    });

    app.get("/profiles/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const profile = await databaseCollection.findOne(query);
      res.send(profile);
    });

    app.put("/profiles/:id", async (req, res) => {
      const data = req.body;
      const paramsId = req.params.id;
      const filter = { _id: new ObjectId(paramsId) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          username: data.username,
          profilepicture: data.profilepicture,
          userid: data.userid,
        },
      };
      const result = await databaseCollection.updateOne(
        filter,
        updateDoc,
        options
      );

      res.send(result);
    });

    app.delete("/profiles/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await databaseCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/profiles", async (req, res) => {
      const data = req.body;

      const doc = {
        user: data.user,
        profilepicture: data.profilepicture,
        userid: data.userid,
      };

      const result = await databaseCollection.insertOne(doc);

      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});