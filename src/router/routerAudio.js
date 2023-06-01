import { Router } from "express";
import multer from "multer";
import AudioController from "../controller/audio.js";
import Audio from "../services/audio.js";

const routerAudio = Router();
const upload = multer({ dest: "./src/assets/weba" });

routerAudio.post("/audio/upload", upload.single("audio"), (req, res) => {
  const { file } = req;
});

routerAudio.post("/audio", async (req, res) => {
  const { frase } = req.body;
  console.log(frase);
  const audio = new Audio();
  await audio.textoParaAudio(frase);
});

export default routerAudio;
