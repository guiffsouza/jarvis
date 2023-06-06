export default class Controller {
  constructor({ view, speechRecognition }) {
    this.view = view;
    this.SpeechRecognition = speechRecognition;
  }

  static iniciador(dependencias) {
    const instance = new Controller(dependencias);
    return instance._iniciar();
  }

  _iniciar() {
    this.view.configureStartRecognitionButton(
      this.startReconhecimentoDeVoz.bind(this)
    );

    this.view.configureStopRecognitionButton(
      this.stopReconhecimentoDeVoz.bind(this)
    );
  }

  async startReconhecimentoDeVoz() {
    const audio = this.view.audio;
    const btnStop = this.view.btnStop;
    const recognition = this.SpeechRecognition.iniciar(btnStop, audio);
    recognition.start();
  }

  async stopReconhecimentoDeVoz() {
    this.SpeechRecognition.iniciar().stop();
  }
}
