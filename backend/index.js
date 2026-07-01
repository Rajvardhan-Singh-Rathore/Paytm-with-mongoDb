const express = require("express");
const app = express();
const mainRouter = require("./routes/index");
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const corsOptions = {
    origin:'https://localhost:5173',
    methods:'GET,POST,PUT'
}
app.use(cors(corsOptions));

app.use('/api/v1',mainRouter);


app.listen(3000,()=>console.log('listening on port 3000'));

