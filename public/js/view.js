export default class View {
  constructor() {
    this.btnStart = document.querySelector("#btnStart");
    this.btnStop = document.querySelector("#btnStop");
    this.audio = document.querySelector("audio");
  }

  start(comando) {
    return () => {
      comando();
    };
  }

  stop(comando) {
    return () => {
      comando();
    };
  }

  configureStartRecognitionButton(comando) {
    this.btnStart.addEventListener("click", this.start(comando));
  }

  configureStopRecognitionButton(comando) {
    this.btnStop.addEventListener("click", this.stop(comando));
  }
}
