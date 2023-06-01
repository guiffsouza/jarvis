import { exec } from "child_process";
import path from "path";

const diretorio = path.resolve();
const audio = {
  weba: `${diretorio}/src/audio/a6c705378911506940e33bd86bc3981e`,
  mp3: `a6c705378911506940e33bd86bc3981e.mp3`,
};

console.log(audio.weba);

exec(`ffmpeg -i ${audio.weba} ${audio.mp3}`, (error, stdout, stderr) => {
  if (error) {
    console.log(error);
  }

  if (stderr) {
    console.error("stderr --> ", stderr);
    return;
  }

  if (stdout) {
    console.log("resolvido");
  }
});
