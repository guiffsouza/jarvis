import { ErroInesperado, NaoExiste } from "../errors/errors.js";

export default class MiddlewaresErro {
  static erro(erro, req, res, next) {
    if (erro instanceof NaoExiste) {
      const naoExiste = new NaoExiste();
      return res.status(naoExiste.status).send(naoExiste);
    }

    if (erro instanceof ErroInesperado) {
      const naoExiste = new ErroInesperado();
      return res.status(naoExiste.status).send(naoExiste);
    }
  }
}
