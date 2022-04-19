import * as bodyParser from "body-parser";

import { Request, Response } from "express";

import express from "express";

var CronJob = require('cron').CronJob;
var cors = require("cors");
var helmet = require("helmet");
var axios = require("axios");

const port = 8080;

const ivaoData = { whazzup: {}, lastUpdated: "", atis: {} };
var job = new CronJob(
  "*/30 * * * * *",
  function () {
    console.log("requesting whazzup data from ivao");
    //fetch from https://api.ivao.aero/v2/tracker/whazzup
    axios.get("https://api.ivao.aero/v2/tracker/whazzup").then((response: any) => {
      ivaoData.whazzup = response.data;
      console.log("whazzup data updated");
    });

    console.log("requesting atis data from ivao");
    //fetch from https://api.ivao.aero/v2/tracker/whazzup/atis
    axios.get("https://api.ivao.aero/v2/tracker/whazzup/atis").then((response: any) => {
      ivaoData.atis = response.data;
      console.log("atis data updated");
    });
    ivaoData.lastUpdated = new Date().toISOString();

  },
  null,
  false,
  "America/Los_Angeles"
);
// create express app
const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200);
  var data = {}
  if (req.query.atis) {
    data = ivaoData.atis;
  } else if (req.query.whazzup) {
    data = ivaoData.whazzup;
  } else {
    data = ivaoData;
  }
  res.json(data);
});

app // start express server
  .listen(port, () => {
    console.log(`API running on port ${port}.`);
    job.start()
    console.log("Cron job started");
  });
module.exports = app;