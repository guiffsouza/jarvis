export default class Media {
  async getAudioUsuario() {
    const audio = navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    return audio;
  }

  getAudio() {
    fetch("http://localhost:3000/audio")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      });
  }

  postAudio(blob) {
    const formData = new FormData();
    formData.append("audio", blob, "gravacao_audio.weba");

    fetch("http://localhost:3000/audio/upload", {
      method: "POST",
      body: formData,
    }).then((res) => {
      if (res.ok) {
        console.log("Audio enviado com sucesso");
      }
    });
  }

  postText(text) {
    fetch("http://localhost:3000/audio", {
      method: "POST",
      body: JSON.stringify({ frase: text }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.ok) {
        console.log("Audio enviado com sucesso");
      }
    });
  }
}
