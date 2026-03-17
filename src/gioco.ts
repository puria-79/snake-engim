import { Graffico } from "./graffico";
import type { Griglia } from "./griglia";
import { serpente } from "./main";
import type { Serpente } from "./serpente";

export class Gioco {
  public graffico: Graffico
  constructor(private serpente: Serpente, private griglia: Griglia, public velocita: number) {
    this.graffico = new Graffico(this.serpente, this.griglia, this);
  }

  public init() {
    this.serpente.mela()
    this.evento()
    document.addEventListener("keydown", this.controlli);
  }

  private async evento() {
    const evento = setInterval(() => {
      this.serpente.muovi()
      this.serpente.aggiorna_serpente()
      this.serpente.aggiorna_coda()
      this.controlla_fuori(evento)
    }, this.velocita);
  }

  private modal() {
    const app = document.getElementById("griglia");
    if (app) {
      const sfondo = document.createElement("div");
      sfondo.style.width = "100%"
      sfondo.style.height = "100%"
      sfondo.style.position = "absolute"
      sfondo.style.top = "0"
      sfondo.style.left = "0"
      sfondo.style.display = "flex"
      sfondo.style.justifyContent = "center"
      sfondo.style.alignItems = "center"
      sfondo.style.backgroundColor = "rgba(0, 0, 0, 0.5)"
      const bottone = document.createElement("button")
      bottone.innerText = "Gioca"
      bottone.addEventListener("click", () => {
        document.getElementById("gioco")?.remove()
        this.griglia.genera_griglia(this.griglia.dimensione, this.griglia.id)
        this.serpente.coda = [{ verso: this.serpente.verso, posizione: { ...this.serpente.posizione } }];
        this.serpente.posizione = { i: 3, j: 4 }
        this.serpente.fuori = false
        this.init()
      })
      sfondo.appendChild(bottone)
      app.appendChild(sfondo)
    }
  }

  private controlla_fuori(interval: number) {
    if (this.serpente.fuori) {
      document.removeEventListener("keydown", this.controlli)
      clearInterval(interval)
      this.modal()
    }
  }

  private controlli(e: KeyboardEvent) {
    switch (e.key) {
      case "ArrowRight":
        serpente.cambia_verso("o");
        break;
      case "ArrowUp":
        serpente.cambia_verso("n");
        break;
      case "ArrowDown":
        serpente.cambia_verso("s");
        break;
      case "ArrowLeft":
        serpente.cambia_verso("v");
        break;
    }
    serpente.controlla_testa()
  }

}
