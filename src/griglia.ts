export class Griglia {
  public dimensione: number;
  public griglia: HTMLTableCellElement[][] = [];
  public id: string;

  public constructor(dimensione: number, id: string) {
    this.dimensione = dimensione;
    this.id = id;
    this.genera_griglia(this.dimensione, this.id);
  }

  public genera_griglia(n: number, id: string) {
    this.griglia = [];
    const app = document.getElementById(id);
    const gioco = document.createElement("div");
    gioco.id = "gioco";
    const table = document.createElement("table");
    table.style.position = "relative"
    table.id = "griglia";
    for (let i = 0; i < n; i++) {
      const tr = document.createElement("tr");
      this.griglia.push([]);
      for (let j = 0; j < n; j++) {
        const td = document.createElement("td");
        this.griglia[i][j] = td;
        td.style.fontSize = "larger"
        td.style.color = "white"
        if ((j + i) % 2 == 0) {
          td.style.backgroundColor = "darkgreen"
        } else {
          td.style.backgroundColor = "green"
        }
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    gioco.appendChild(table);
    app!.appendChild(gioco);
  }
}
