import Audio from "../services/audio.js";
import ValidadorAudio from "../validations/validador-audio.js";

export default class AudioController {
  static async recebeAudioClient(req, res, next) {
    try {
      const { file } = req;
      ValidadorAudio.existeFile(file);
      const audio = new Audio();
      const output = await audio.converteWeBaToMp3(file);
      ValidadorAudio.output(output);
      return res.send({
        msg: "Áudio recebido e salvo com sucesso!",
      });
    } catch (error) {
      next(error);
    }
  }
}
