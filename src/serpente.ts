import type { Griglia } from "./griglia";

type Verso = "n" | "s" | "v" | "o";

interface Posizione {
  i: number;
  j: number;
}

interface Coda {
  verso: Verso;
  posizione: Posizione;
}

export class Serpente {
  private verso: Verso = "o";
  private posizione: Posizione = { i: 3, j: 4 };
  public coda: Coda[] = [{verso: "o", posizione: {i: 3, j: 4}}];
  public coda_tbd?: Coda;
  private griglia: Griglia;
  public constructor(casuale: Boolean, grillia: Griglia) {
    if (casuale) {
      this.verso = Array("n", "s", "v", "s")[
        Math.floor(Math.random() * 4)
      ] as Verso;
    }
    this.griglia = grillia;
  }

  public cambia_verso(verso: Verso) {
    if ((this.coda[0].verso == "n" || this.coda[0].verso == "s") != (verso == "n" || verso == "s")) {
      this.verso = verso;
    }
  }

  private aggiuni_coda() {
    this.coda_tbd = {...this.coda[this.coda.length - 1]}
  }

  public aggiorna_coda() {
    let tmp: Coda, tmp1: Coda;
    for (const i in this.coda) {
      if (i == "0") {
        tmp = {...this.coda[i]}
        this.coda[i] = {verso: this.verso, posizione: {...this.posizione}}
      } else {
        tmp1 = {...this.coda[i]}
        this.coda[i] = tmp
        tmp = tmp1
      }
    }
    if (this.coda_tbd) {
      this.coda.push(this.coda_tbd)
      this.coda_tbd = undefined;
    }
  }

  public mela() {
    let i = Math.floor(Math.random() * this.griglia.dimensione)
    let j = Math.floor(Math.random() * this.griglia.dimensione)
    let aggiungibile: boolean = true;
    for (const element of this.coda) {
      aggiungibile = aggiungibile && i != element.posizione.i && j != element.posizione.j
    }
    if (aggiungibile) {
      this.griglia.griglia[i][j].innerHTML = "&#127822;"
    } else {
      this.mela()
    }
  }

  public aggiorna_serpente() {
    switch (this.verso) {
      case "n":
        this.griglia.griglia[this.posizione.i][this.posizione.j].innerHTML =
          "&#708;";
        break;
      case "s":
        this.griglia.griglia[this.posizione.i][this.posizione.j].innerHTML =
          "&#709;";
        break;
      case "o":
        this.griglia.griglia[this.posizione.i][this.posizione.j].innerHTML =
          "&#707;";
        break;
      case "v":
        this.griglia.griglia[this.posizione.i][this.posizione.j].innerHTML =
          "&#706;";
        break;
    }
  }

  public muovi() {
    switch (this.verso) {
      case "s":
        if (this.posizione.i + 1 < this.griglia.dimensione) {
          this.posizione.i += 1;
        }
        break;
      case "n":
        if (this.posizione.i - 1 >= 0) {
          this.posizione.i -= 1;
        }
        break;
      case "o":
        if (this.posizione.j + 1 < this.griglia.dimensione) {
          this.posizione.j += 1;
        }
        break;
      case "v":
        if (this.posizione.j - 1 >= 0) {
          this.posizione.j -= 1;
        }
        break;
    }
    if (this.griglia.griglia[this.posizione.i][this.posizione.j].innerHTML == "🍎") {
      this.aggiuni_coda()
      this.mela()
    }
  }
}
