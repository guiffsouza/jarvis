export class NaoExiste extends Error {
  constructor() {
    super();
    this.message = "Arquivo não existe.";
    this.name = "Não existe";
    this.status = 404;
  }
}

export class ErroInesperado extends Error {
  constructor() {
    super();
    this.message = "Aconteceu um erro inesperado.";
    this.name = "Erro Inesperado";
    this.status = 500;
  }
}
