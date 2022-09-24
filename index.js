require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

require('./modles/Student');
require('./modles/Instructor');
require('./modles/User');
require('./modles/WorkShop');


//Connection to DB
mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

    .then(() => console.log("MongoDB has been connected"))
    .catch((err) => console.log(err));


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
//import routes
// require('./routes/adminRoute.js')(app)
// require('./routes/instructorRoute.js')(app)
require('./routes/studentRoute.js')(app)
// require('./routes/usersRoute.js')(app)
// require('./routes/workshopRoute.js')(app)


const PORT = process.env.PORT || 5000;

// Accessing the path module
const path = require("path");

// Step 1:
app.use(express.static(path.resolve(__dirname, "./client/build")));
// Step 2:
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});



// //PortNo to listen on
// app.use(express.json())

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});





