import ChatGPT from "../services/chatgpt.js";
import Audio from "../services/audio.js";

export default class AudioController {
  static async recebeAudioClient(req, res, next) {
    try {
      const { frase } = req.body;
      const chatGpt = new ChatGPT();
      await chatGpt.post(frase);
      return res.send({
        msg: "Áudio recebido e salvo com sucesso!",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deletarAudio(req, res, next) {
    try {
      const { url } = req.body;
      const audio = new Audio();
      audio.deleta(url);
    } catch (error) {
      next(error);
    }
  }
}
