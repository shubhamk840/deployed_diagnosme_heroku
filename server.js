import express from 'express';
import Mongoose from  'mongoose';
import Datavalues from './dbdata.js'
import LoginData from './logindata.js'
import cors from 'cors'

const app = express();
const port = process.env.PORT || 8001;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send(" i am working");
})




const connection_url = "mongodb+srv://iamskk0502:iamskk0502@firstcluster.6271j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

Mongoose.connect( connection_url ,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
).then(()=>{
    console.log("connections is successful");
}).catch((e)=>{
    console.log("No connection");
});


app.post('/signup',(req,res)=>{
    const currentvalue = req.body;
    LoginData.create(currentvalue,(err,data)=>{
        if(err)
        res.status(500).send(err);
    else
        res.status(201).send(data);
    })
})

app.post('/login',(req,res)=>{
    console.log("id pass is getting fetched");
      LoginData.find({"id":req.body.id,"pass":req.body.pass},(err,data)=>{
          if(err) {res.status(500).send(errr);}
          else res.status(200).send(data);
      });
})
app.post('/new',(req,res)=>{
    const currentvalue = req.body;

    Datavalues.create(currentvalue,(err,data)=>{
        if(err) {
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    })
})

app.post('/search_by_id',(req,res)=>{
    const id = req.body.id;
     console.log("A disease is getting fetched");
       Datavalues.find({"id":req.body.id},(err,data)=>{
           if(err) res.status(500).send(err);
           else
           res.status(200).send(data);
       });
});
const sort = {name:1};
app.get('/viewlist',(req,res)=>{
      Datavalues.find((err,data)=>{
          if(err) res.status(500).send(err);
          else{
              res.status(200).send(data);
          }
      }).sort(sort)
})


app.listen(port,()=>{
    console.log("port has been succesfully connected at ",port);
})