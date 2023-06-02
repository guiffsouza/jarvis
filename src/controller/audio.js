import ChatGPT from "../services/chatgpt.js";

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
}
