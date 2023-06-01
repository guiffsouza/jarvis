import express from "express";
import routers from "../router/index.js";

export default class App {
  client() {
    const app = express();
    app.use(express.static("public"));
    const portClient = 3000;
    routers(app);
    app.listen(portClient, () => {
      console.log(`Client rodando em http://localhost:${portClient}`);
    });
  }
}
