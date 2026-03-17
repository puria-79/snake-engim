import type { Griglia } from "./griglia";

type Verso = "n" | "s" | "v" | "o";

interface Posizione {
  i: number;
  j: number;
}

interface Coda {
  verso?: Verso;
  posizione: Posizione;
}

export class Serpente {
  public verso: Verso = "o";
  public posizione: Posizione = { i: 3, j: 4 };
  public coda: Coda[] = [{ verso: this.verso, posizione: { ...this.posizione } }];
  public coda_tbd?: Coda;
  public fuori: boolean = false;
  constructor(casuale: Boolean, private griglia: Griglia) {
    if (casuale) {
      this.verso = Array("n", "s", "v", "s")[
        Math.floor(Math.random() * 4)
      ] as Verso;
    }
  }

  public cambia_verso(verso: Verso) {
    if ((this.coda[0].verso == "n" || this.coda[0].verso == "s") != (verso == "n" || verso == "s")) {
      this.verso = verso;
    }
  }

  private aggiuni_coda() {
    this.coda_tbd = { ...this.coda[this.coda.length - 1] }
  }

  public aggiorna_coda() {
    let tmp: Coda = { ...this.coda[0] }, tmp1: Coda;
    for (const i in this.coda) {
      if (i == "0") {
        this.coda[i] = { verso: this.verso, posizione: { ...this.posizione } }
      } else {
        tmp1 = { ...this.coda[i] }
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
    let vuoti: HTMLTableCellElement[][] = [];
    this.griglia.griglia.forEach((el, i) => vuoti[i] = el.filter(element => element.innerText == ""))
    const i = Math.floor(Math.random() * vuoti.length)
    const j = Math.floor(Math.random() * vuoti[i].length)
    vuoti[i][j].innerHTML = "&#127822;"
  }

  public aggiorna_serpente() {
    if (this.coda[0]) {
      const verso = `${this.verso}${this.coda[0].verso}`;
      switch (verso) {
        case "vn":
        case "so":
          this.griglia.griglia[this.coda[0].posizione.i][this.coda[0].posizione.j].innerHTML = "&#9559;";
          break;
        case "on":
        case "sv":
          this.griglia.griglia[this.coda[0].posizione.i][this.coda[0].posizione.j].innerHTML = "&#9556;";
          break;
        case "os":
        case "nv":
          this.griglia.griglia[this.coda[0].posizione.i][this.coda[0].posizione.j].innerHTML = "&#9562;";
          break;
        case "vs":
        case "no":
          this.griglia.griglia[this.coda[0].posizione.i][this.coda[0].posizione.j].innerHTML = "&#9565;";
          break;
        case "vv":
        case "oo":
          this.griglia.griglia[this.coda[0].posizione.i][this.coda[0].posizione.j].innerHTML = "&#9552;";
          break;
        case "nn":
        case "ss":
          this.griglia.griglia[this.coda[0].posizione.i][this.coda[0].posizione.j].innerHTML = "&#9553;";
          break;
      }
    }
    this.griglia.griglia[this.coda[this.coda.length - 1].posizione.i][this.coda[this.coda.length - 1].posizione.j].innerHTML = ""
    this.controlla_testa()
  }

  public controlla_testa() {
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
          if (this.coda.filter((e) => e.posizione.i == this.posizione.i + 1 && e.posizione.j == this.posizione.j).length != 0) {
            this.serpente_fuori()
          }
          this.posizione.i += 1;
        } else {
          this.serpente_fuori()
        }
        break;
      case "n":
        if (this.posizione.i - 1 >= 0) {
          if (this.coda.filter((e) => e.posizione.i == this.posizione.i - 1 && e.posizione.j == this.posizione.j).length != 0) {
            this.serpente_fuori()
          }
          this.posizione.i -= 1;
        } else {
          this.serpente_fuori()
        }
        break;
      case "o":
        if (this.posizione.j + 1 < this.griglia.dimensione) {
          if (this.coda.filter((e) => e.posizione.i == this.posizione.i && e.posizione.j == this.posizione.j + 1).length != 0) {
            this.serpente_fuori()
          }
          this.posizione.j += 1;
        } else {
          this.serpente_fuori()
        }
        break;
      case "v":
        if (this.posizione.j - 1 >= 0) {
          if (this.coda.filter((e) => e.posizione.i == this.posizione.i && e.posizione.j == this.posizione.j - 1).length != 0) {
            this.serpente_fuori()
          }
          this.posizione.j -= 1;
        } else {
          this.serpente_fuori()
        }
        break;
    }
    if (this.griglia.griglia[this.posizione.i][this.posizione.j].innerHTML == "🍎") {
      this.aggiuni_coda()
      this.mela()
    }
  }

  private serpente_fuori() {
    this.fuori = true;
  }
}

