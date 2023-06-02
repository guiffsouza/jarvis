import Controller from "./controller.js";
import Audio from "./Audio.js";
import View from "./view.js";

const view = new View();
const audio = new Audio();

Controller.iniciador({
  view,
  audio,
});
