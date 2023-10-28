import { Propuesta } from "./propuesta";
import { Jugador } from "./jugador";

export class Sala {
    public id: number;
    public propuesta: Propuesta;
    //creador le asignamos el id del admin_
    public creador: String;
    public Jugadores: Jugador[];
    constructor(id: number, propuesta: Propuesta, link: String, creador: String) {
        this.propuesta = propuesta;
        this.creador = creador;
        this.Jugadores = []
        this.id = id;
    }

    public agregarJugador(jugador: Jugador) {
        this.Jugadores.push(jugador);
    }

}
