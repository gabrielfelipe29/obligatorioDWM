import { Propuesta } from "./propuesta";
import { Jugador } from "./jugador";

export class Sala {
    public id: number;
    public propuesta: Propuesta;
    //creador le asignamos el id del admin_
    public creador: string;
    public Jugadores:{ [clave: string]: Jugador} = {} ;
    public juegoIniciado: boolean = false;
     
    constructor(id: number, propuesta: Propuesta, link: String, creador: string) {
        this.propuesta = propuesta;
        this.creador = creador;
        this.id = id;
    }

    public agregarJugador(jugador: Jugador) {
        this.Jugadores[jugador.socketID] = jugador;
    }

    public eliminarJugador(socketID: string){
        delete  this.Jugadores[socketID];
    }

    public obtenerIDUltimoJugador(){
        const idUltimoJugador = Object.keys(this.Jugadores).length;
        return idUltimoJugador
    }

    iniciarJuego(){
        this.juegoIniciado  = true;
    }

    public getCantidadJugadores(){
        return Object.keys(this.Jugadores).length;
    }

    public vaciarSala(){
        this.Jugadores = {}
        this.creador = ""
    }

    



}
