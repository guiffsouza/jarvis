export default class BackendService {
  async postText(text) {
    const response = await fetch("http://localhost:3000/audio", {
      method: "POST",
      body: JSON.stringify({ frase: text }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      return false;
    }
    return true;
  }

  deletaAudio(url) {
    fetch("http://localhost:3000/deletar", {
      method: "POST",
      body: JSON.stringify({ url: url }),
      headers: { "Content-Type": "application/json" },
    });
  }
}
