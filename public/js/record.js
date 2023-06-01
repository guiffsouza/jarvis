import Media from "./media.js";

export default class Record {
  constructor() {
    this.audioType = "audio/webm;codecs=opus";
    this.mediaRecorder = {};
    this.recordBlobs = [];
  }

  _setup() {
    const options = { MimeType: this.audioType };
    const isSupported = MediaRecorder.isTypeSupported(options.MimeType);
    if (!isSupported) {
      const msg = `O codec: ${options.MimeType} não suporta.`;
      alert(msg);
      throw new Error(msg);
    }
    return options;
  }

  startRecord(stream) {
    const options = this._setup();
    this.mediaRecorder = new MediaRecorder(stream, options);

    this.mediaRecorder.onstop = (event) => {
      console.log("Recorded Blobs", this.recordBlobs);
    };

    this.mediaRecorder.ondataavailable = (event) => {
      if (!event.data || !event.data.size) return;

      console.log("Evento mediaRecord: ", event);
      this.recordBlobs.push(event.data);
    };

    this.mediaRecorder.start();
    console.log("Media Recorder started", this.mediaRecorder);
  }

  async stopRecord() {
    if (this.mediaRecorder.state === "inactive") {
      return;
    }

    this.mediaRecorder.stop();
    console.log("MediaRecordStoped");
  }

  getRecordingUrl() {
    const blob = new Blob(this.recordBlobs, { type: this.audioType });
    const media = new Media();
    media.postAudio(blob);
    const url = window.URL.createObjectURL(blob);
    return url;
  }
}
