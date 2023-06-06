import { Router } from "express";
import AudioController from "../controller/audio.js";

const routerAudio = Router();

routerAudio.post("/audio", AudioController.recebeAudioClient);
routerAudio.post("/deletar", AudioController.deletarAudio);

export default routerAudio;
