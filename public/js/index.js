import Controller from "./controller.js";
import Media from "./media.js";
import Record from "./record.js";
import View from "./view.js";

const view = new View();
const media = new Media();
const recorder = new Record();

Controller.iniciador({
  view,
  media,
  recorder,
});
