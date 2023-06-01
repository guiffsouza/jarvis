import express from "express";
import routerAudio from "./routerAudio.js";
import cors from "cors";
import MiddlewaresErro from "../middlewares/error.js";

const routers = (app) => {
  app.use(cors());
  app.use(express.json(), routerAudio);
  app.use(MiddlewaresErro.erro);
};

export default routers;
