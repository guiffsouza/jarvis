import AudioParaTexto from "./Audio.js";

export default class View {
  constructor() {
    this.btnStart = document.querySelector("#btnStart");
    this.btnStop = document.querySelector("#btnStop");
    this.audioElement = document.querySelector("audio");
    this.recognition = AudioParaTexto();
  }

  clicarGravar(comando) {
    return () => {
      comando();
      this.toggleAudioElement({ visible: false });
      this.recognition.start();
    };
  }

  clicarPauseGravar(comando) {
    return () => {
      comando();
      this.recognition.stop();
    };
  }

  configureStartRecordButton(comando) {
    this.btnStart.addEventListener("click", this.clicarGravar(comando));
  }

  configureStopRecordButton(comando) {
    this.btnStop.addEventListener("click", this.clicarPauseGravar(comando));
  }

  toggleAudioElement({ visible }) {
    const classList = this.audioElement.classList;
    visible ? classList.remove("hidden") : classList.add("hidden");
  }

  playAudio(url) {
    const audio = this.audioElement;
    audio.src = url;
    audio.muted = false;
    this.toggleAudioElement({ visible: true });
    audio.addEventListener("loadedmetadata", (_) => audio.play());
  }
}
