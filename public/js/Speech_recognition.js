import BackendService from "./Backend_service.js";

export default class SpeechRecognition {
  constructor() {
    this.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.BackendService = new BackendService();
    this.recognition = this.iniciar();
  }

  _setup() {
    if (this.SpeechRecognition === undefined) {
      return null;
    }
    return new this.SpeechRecognition();
  }

  iniciar(button, audio) {
    const recognition = this._setup();
    if (!recognition) alert("SpeechRecognition não suportado.");
    recognition.lang = "pt_BR";
    recognition.onstart = () => console.log("iniciando");
    recognition.onend = () => button.click();
    recognition.onerror = (e) => console.log("Erro ao iniciar", e);
    recognition.onresult = (e) => this.audioToText(e, audio);
    return recognition;
  }

  async audioElement(audio) {
    audio.src = "./audio/audio.mp3";
    audio.muted = false;
    await audio.play();
    this.BackendService.deletaAudio(
      "/home/guiffsouza/projects/lidando-com-audios/jarvis/public/audio/audio.mp3"
    );
  }

  async audioToText(e, audio) {
    const resultado = e.results[0][0].transcript;
    const response = await this.BackendService.postText(resultado);
    if (response) {
      await this.audioElement(audio);
    }
  }
}
