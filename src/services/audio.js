import * as googleTTS from "google-tts-api";
import axios from "axios";
import fs from "fs";
import { exec } from "child_process";
import path from "path";

export default class Audio {
  constructor() {
    this.diretorio = path.resolve();
  }

  async textoParaAudio(texto) {
    try {
      const url = this.createAudioGoogle(texto);
      const download = await this.realizaDownload(url);
      this.salvarAudio(download);
    } catch (error) {
      console.log(error);
    }
  }

  async converteWeBaToMp3(file) {
    return await this.promiseConverteAudio(file)
      .then((output) => {
        return output;
      })
      .catch((erro) => {
        console.log("Erro: -->", erro);
        return erro;
      });
  }

  getAudioBrowser() {
    return navigator.mediaDevices.getDisplayMedia({
      audio: true,
    });
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

  salvarAudio(audio) {
    const file = fs.writeFileSync(
      `${this.diretorio}/src/assets/mp3/audio.mp3`,
      audio
    );
    return file;
  }

  async promiseConverteAudio(file) {
    return new Promise((resolve, reject) => {
      const audio = {
        weba: `${this.diretorio}/src/assets/weba/${file.filename}`,
        mp3: `${this.diretorio}/src/assets/mp3/${file.filename}.mp3`,
      };
      this.promise(resolve, reject, audio);
    });
  }

  promise(resolve, reject, { weba, mp3 }) {
    setTimeout(() => {
      exec(`ffmpeg -i ${weba} ${mp3}`, (erro, stdout, stderr) => {
        let erroExec = {
          valido: true,
          msg: stdout,
        };
        if (erro) {
          erroExec = {
            valido: false,
            msg: erro,
          };
          reject(erroExec);
          return erro;
        }
        resolve(erroExec);
      });
    });
  }
}
