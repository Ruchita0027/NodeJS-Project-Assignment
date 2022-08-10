 const express = require('express');
 const path = require('path')
 const app = express()
 const port = 3001;

 const fs = require("fs");
 const users = require("./users");

 app.set("view",path.join(__dirname))
 app.set("view engine", "ejs")

 app.get('/', (req, res) => {
    res.send('API Called')
 })

 // Node Problem-1

 app.get('/age', async(req, res) => {
  
    var name = req.query.name;
    var year = req.query.year;
    const todaysDate = new Date()
    const currentYear = todaysDate.getFullYear()
  
    const age = (currentYear - year);
   
    console.log("year :", currentYear)
    console.log("age :", age)
  
    res.send(`
    <p>Hello ${name}</p>
    <p>You are currently ${age} years old.</p>`);

    // http://localhost:3001/age?year=2000&month=10&date=27&name=Ruchi
    
  })

  // Node Problem-2

   app.get('/vegetables', async(req, res) => {
      const user = require("./veg");
      console.log(user);
      res.send(user);
  })  

  // Node Problem-3

  // Area of Circle

   app.get('/area', async(req, res) => {

    var metric = req.query.metric;
    var object = req.query.object;
    var radius = req.query.radius;

    const value = ( 3.14 * radius * radius );
    console.log('area :', value)

    res.send(`${metric} of ${object} is ${value}`);

    // http://localhost:3001/area?object=circle&metric=area&radius=5
})
    
  // Volume of Sphere

   app.get('/volume', async(req, res) => {

    var metric = req.query.metric;
    var object = req.query.object;
    var radius = req.query.radius;

    const value = ((4/3) * 3.14 * radius * radius * radius );
    console.log('volume :', value)

    res.send(`${metric} of ${object} is ${value}`);

    // http://localhost:3001/volume?object=sphere&metric=volume&radius=5
})    

// Express Problem-1

let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));


app.post('/student/add', function(req, res) {
    const data = req.body;
    users.push(data);
    console.log(data);
    res.send({"result" : "success"})
    fs.writeFile("users.json", JSON.stringify(users), err => {

    if (err) throw err;
    console.log("Done writing");

    });
})

app.get('/student/getDetails', (req, res) => {
    res.header("Content-Type", 'application/json');
    res.sendFile(path.join(__dirname, 'users.json'));

})


// Express Problem-2

app.get('/Heroku', async(req, res) => {
    const user = require("./heroku");
    console.log(user);
    res.send({
        "results": [
        "Rajesh",
        "Ramesh",
        "Sayali",
        "Sanjana"
        ]
    });
})  


async function run() {

}

app.listen(port, async() => {
    run().catch(console.dir);
    console.log(`app is running on ${port}`)
})