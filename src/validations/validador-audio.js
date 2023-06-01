import { ErroInesperado, NaoExiste } from "../errors/errors.js";

export default class ValidadorAudio {
  static existeFile(file) {
    if (!file) {
      throw new NaoExiste();
    }
    return;
  }

  static output(output) {
    if (!output.valido) {
      throw new ErroInesperado();
    }
  }
}
