import * as googleTTS from "google-tts-api";
import axios from "axios";
import fs from "fs";
import path from "path";

export default class Audio {
  constructor() {
    this.diretorio = path.resolve();
  }

  async textoParaAudio(texto) {
    try {
      const url = this.createAudioGoogle(texto);
      const download = await this.realizaDownload(url);
      const validador = await this.salvarAudio(download);
      if (validador) {
        console.log(validador);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  createAudioGoogle(texto) {
    const url = googleTTS.getAllAudioUrls(texto, {
      lang: "pt-BR",
      slow: false,
      host: "https://translate.google.com",
    });
    return url[0].url;
  }

  async realizaDownload(url) {
    try {
      const download = await axios.get(url, {
        responseType: "arraybuffer",
      });
      return download.data;
    } catch (error) {
      console.log("Erro ao realizar download", error);
    }
  }

  async salvarAudio(audio) {
    return new Promise((resolve, reject) => {
      const file = fs.writeFileSync(
        `${this.diretorio}/public/audio/audio.mp3`,
        audio
      );
      setTimeout(() => {
        if (file === undefined) {
          console.log("concluido");
          resolve(true);
        } else {
          console.log("Saiu");
          reject();
        }
      });
    });
  }

  deleta(diretorio) {
    console.log("diretorio", diretorio);
    fs.unlink(diretorio, (error) => {
      if (error) {
        console.error("Erro ao deletar o arquivo:", error);
      } else {
        console.log("Arquivo deletado com sucesso.");
      }
    });
  }
}
