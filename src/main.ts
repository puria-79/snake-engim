import './style.css'

let grillia: HTMLTableCellElement[][] = [];
genera_grillia(10)

function genera_grillia(n: number) {
  const app = document.getElementById("app")
  const gioco = document.createElement("div")
  gioco.id = "gioco"
  const table = document.createElement("table")
  table.id = "grillia"
  for (let i = 0; i < n; i++) {
    const tr = document.createElement("tr")
    grillia.push([])
    for (let j = 0; j < n; j++) {
      const td = document.createElement("td")
      console.log(i, j)
      grillia[i][j] = td
      tr.appendChild(td)
    }
    table.appendChild(tr)
  }
  gioco.appendChild(table)
  app!.appendChild(gioco)
}