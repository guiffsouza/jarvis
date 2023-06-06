import SpeechRecognition from "./Speech_recognition.js";

export default class Controller {
  constructor({ view }) {
    this.view = view;
    this.SpeechRecognition = new SpeechRecognition();
  }

  static iniciador(dependencias) {
    const instance = new Controller(dependencias);
    return instance.__iniciar();
  }

  __iniciar() {
    this.view.configureStartRecognitionButton(
      this.startReconhecimentoDeVoz.bind(this)
    );

    this.view.configureStopRecognitionButton(
      this.stopReconhecimentoDeVoz.bind(this)
    );
  }

  async startReconhecimentoDeVoz() {
    const htmlAudioElement = this.view.audio;
    const recognition = this.SpeechRecognition.audioToText(htmlAudioElement);
    recognition.start();
    return recognition;
  }

  async stopReconhecimentoDeVoz() {
    const recognition = this.SpeechRecognition.audioToText();
    recognition.stop();
  }
}
