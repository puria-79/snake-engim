import { Gioco } from './gioco';
import { Griglia } from './griglia'
import { Serpente } from './serpente';
import './style.css'

const griglia = new Griglia(10, "app");
export const serpente = new Serpente(false, griglia);
const gioco = new Gioco(serpente, griglia, 500);
gioco.init()