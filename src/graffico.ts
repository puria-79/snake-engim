import { gsap } from "gsap";
import type { Griglia } from "./griglia";
import type { Serpente } from "./serpente";
import type { Gioco } from "./gioco";

export class Graffico {
    public tl: GSAPTimeline;
    constructor(private serpente: Serpente, private griglia: Griglia, private gioco: Gioco) {
        this.tl = gsap.timeline()
    }
    public dipingi() {
        switch (this.serpente.verso) {
            case "n":
                this.tl.from(this.griglia.griglia[this.serpente.posizione.i][this.serpente.posizione.j], { y: 46, duration: this.gioco.velocita / 1000, ease: "none" })
                break;
            case "s":
                this.tl.from(this.griglia.griglia[this.serpente.posizione.i][this.serpente.posizione.j], { y: -46, duration: this.gioco.velocita / 1000, ease: "none" })
                break;
            case "o":
                this.tl.from(this.griglia.griglia[this.serpente.posizione.i][this.serpente.posizione.j], { x: -46, duration: this.gioco.velocita / 1000, ease: "none" })
                break;
            case "v":
                this.tl.from(this.griglia.griglia[this.serpente.posizione.i][this.serpente.posizione.j], { x: 46, duration: this.gioco.velocita / 1000, ease: "none" })
        }
        if (this.serpente.coda.length > 1) {
            for (const coda of this.serpente.coda.slice(1)) {
                switch (coda.verso) {
                    case "n":
                        this.tl.from(this.griglia.griglia[coda.posizione.i][coda.posizione.j], { y: 46 })
                        break;
                    case "s":
                        this.tl.from(this.griglia.griglia[coda.posizione.i][coda.posizione.j], { y: -46 })
                        break;
                    case "o":
                        this.tl.from(this.griglia.griglia[coda.posizione.i][coda.posizione.j], { x: -46 })
                        break;
                    case "v":
                        this.tl.from(this.griglia.griglia[coda.posizione.i][coda.posizione.j], { x: 46 })
                }
            }
        }
    }
}