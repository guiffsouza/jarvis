export default class Controller {
  constructor({ view, media, recorder }) {
    this.view = view;
    this.media = media;
    this.recorder = recorder;
  }

  static iniciador(dependencias) {
    const instance = new Controller(dependencias);
    return instance.__iniciar();
  }

  __iniciar() {
    this.view.configureStartRecordButton(this.startRecord.bind(this));
    this.view.configureStopRecordButton(this.stopRecord.bind(this));
  }

  async startRecord() {
    const audio = await this.media.getAudioUsuario();
    this.recorder.startRecord(audio);
  }

  async stopRecord() {
    this.recorder.stopRecord();
    setTimeout(() => {
      const audioUrl = this.recorder.getRecordingUrl();
      this.view.playAudio(audioUrl);
    });
  }
}
