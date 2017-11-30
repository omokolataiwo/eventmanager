import express from "express";
import bodyParser from "body-parser";
// import apiv1 from './v1/routes/api1';
import apiv2 from "./v2/routes/api2";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/v1', apiv1);
app.use("/v2", apiv2);

app.get("/", (req, res) => res.status(200).send("Welcome to EventMan"));

app.listen(process.env.PORT || 5000);

module.exports = app;
