import { Gioco } from './gioco';
import { Griglia } from './griglia'
import { Serpente } from './serpente';
import './style.css'

const griglia = new Griglia(10, "app");
const serpente = new Serpente(false, griglia);
serpente.render()
const gioco = new Gioco(serpente, griglia);
gioco.init()