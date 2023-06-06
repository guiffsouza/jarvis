import BackendService from "./Backend_service.js";

export default class SpeechRecognition {
  constructor() {
    this.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.BackendService = new BackendService();
    this.recognition = this._setup();
  }

  _setup() {
    if (this.SpeechRecognition === undefined) {
      return null;
    }

    const recognition = new this.SpeechRecognition();

    if (!recognition) {
      alert("SpeechRecognition não suportado.");
      throw new Error("Seu browser não suporta o SpeechRecognition");
    }
    recognition.lang = "pt_BR";
    recognition.onstart = () => {
      console.log("iniciado");
    };
    recognition.onend = () => {
      const button = document.querySelector("#btnStop");
      button.click();
    };
    recognition.onerror = (e) => {
      console.log("Erro ao iniciar recognition", e);
    };
    return recognition;
  }

  async audioElement(audioElement) {
    audioElement.src = "./audio/audio.mp3";
    audioElement.muted = false;
    await audioElement.play();
    this.BackendService.deletaAudio(
      "/home/guiffsouza/projects/lidando-com-audios/jarvis/public/audio/audio.mp3"
    );
  }

  audioToText(audioElement) {
    const recognition = this._setup();
    recognition.onresult = async (e) => {
      const resultado = e.results[0][0].transcript;
      const response = await this.BackendService.postText(resultado);
      if (response) {
        await this.audioElement(audioElement);
      }
    };
    return recognition;
  }
}
