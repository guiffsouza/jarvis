import Media from "./media.js";

export default class Audio {
  constructor() {
    this.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
  }

  _setup() {
    if (this.SpeechRecognition === undefined) {
      return null;
    }
    return new this.SpeechRecognition();
  }

  audioToText() {
    const recognition = this._setup();

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

    recognition.onresult = async (e) => {
      const resultado = e.results[0][0].transcript;
      const media = new Media();
      const response = await media.postText(resultado);
      if (response) {
        const audio = document.querySelector("audio");
        audio.src = "./audio/audio.mp3";
        audio.muted = false;
        await audio.play();
        media.deletaAudio(
          "/home/guiffsouza/projects/lidando-com-audios/jarvis/public/audio/audio.mp3"
        );
      }
      return resultado;
    };

    return recognition;
  }
}
