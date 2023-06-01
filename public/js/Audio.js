import Media from "./media.js";

export default function AudioParaTexto() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition =
    SpeechRecognition !== undefined ? new SpeechRecognition() : null;

  if (!recognition) {
    alert("SpeechRecognition não suportado.");
    return null;
  }

  recognition.lang = "pt_BR";

  recognition.onstart = () => console.log("iniciado");
  recognition.onend = () => console.log("finalizado");
  recognition.onerror = (e) => console.log("Erro ao iniciar recognition", e);
  recognition.onresult = (e) => {
    const resultado = e.results[0][0].transcript;
    const media = new Media();
    media.postText(resultado);
    console.log(resultado);
    return resultado;
  };

  return recognition;
}
