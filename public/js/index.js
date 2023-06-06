import Controller from "./controller.js";
import View from "./view.js";
import SpeechRecognition from "./Speech_recognition.js";

const view = new View();
const speechRecognition = new SpeechRecognition();

Controller.iniciador({
  view,
  speechRecognition,
});
