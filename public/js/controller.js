export default class Controller {
  constructor({ view, audio }) {
    this.view = view;
    this.audio = audio;
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
    const recognition = this.audio.audioToText();
    recognition.start();
    return recognition;
  }

  async stopReconhecimentoDeVoz() {
    const recognition = this.audio.audioToText();
    recognition.stop();
  }
}
