import { Propuesta } from "./propuesta";
import { Jugador } from "./jugador";

export class Sala {
    public id: number;
    public propuesta: Propuesta;
    //creador le asignamos el id del admin_
    public creador: string;
    public Jugadores: { [clave: string]: Jugador} = {} ;
    public juegoIniciado: boolean = false;
    public qrCode: String = ""
    public juegoTerminado = false
     
    constructor(id: number, propuesta: Propuesta,  creador: string) {
        this.propuesta = propuesta;
        this.creador = creador;
        this.id = id;
        
    }

    public setQRCode(qr: String){
        this.qrCode = qr
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

    public iniciarJuego(){
        this.juegoIniciado  = true;
    }

    public terminarJuego(){
        this.juegoIniciado = false
        this.juegoTerminado = true
        this.Jugadores = {}
        this.creador = ""
    }

    public getCantidadJugadores(){
        return Object.keys(this.Jugadores).length;
    }


    public obtenerJugador(jugadorSocketID: string){
        return this.Jugadores[jugadorSocketID]
    }

    



}
