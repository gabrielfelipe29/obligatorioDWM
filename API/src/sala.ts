<<<<<<< HEAD
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
=======
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
>>>>>>> b40f81b840f2ad8dbca8a9d7fe72966e69af7b3c
