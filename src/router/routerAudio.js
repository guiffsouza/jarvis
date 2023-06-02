import { Router } from "express";
import AudioController from "../controller/audio.js";
import Audio from "../services/audio.js";

const routerAudio = Router();

routerAudio.post("/audio", AudioController.recebeAudioClient);
routerAudio.post("/deletar", (req, res) => {
  try {
    const { url } = req.body;
    const audio = new Audio();
    audio.deleta(url);
  } catch (error) {
    console.log("Erro rota delete", error);
  }
});

export default routerAudio;
