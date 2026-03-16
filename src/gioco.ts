import type { Griglia } from "./griglia";
import type { Serpente } from "./serpente";

export class Gioco {
  serpente: Serpente;
  griglia: Griglia;
  public constructor(serpente: Serpente, griglia: Griglia) {
    this.serpente = serpente;
    this.griglia = griglia;
  }

  public init() {
    this.serpente.mela()
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowRight":
          this.serpente.cambia_verso("o");
          break;
        case "ArrowUp":
          this.serpente.cambia_verso("n");
          break;
        case "ArrowDown":
          this.serpente.cambia_verso("s");
          break;
        case "ArrowLeft":
          this.serpente.cambia_verso("v");
          break;
      }
      this.serpente.aggiorna_serpente()
    });
    setInterval(() => {
      this.serpente.muovi()
      this.serpente.aggiorna_serpente()
      this.serpente.aggiorna_coda()
    }, 500);
  }
}
