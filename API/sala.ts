import { Propuesta } from "./propuesta";
import { Jugador } from "./jugador";

export class Sala {
    public id: number;
    public propuesta: Propuesta;
    //creador le asignamos el id del admin_
    public creador: string;
    public Jugadores: Jugador[] = [];
    public juegoIniciado: boolean = false;
    public qrCode: String = ""
    public juegoTerminado = false

    constructor(id: number, propuesta: Propuesta, creador: string) {
        this.propuesta = propuesta;
        this.creador = creador;
        this.id = id;

    }

    public setQRCode(qr: String) {
        this.qrCode = qr
    }
    public agregarJugador(id: number, pseudonimo: String, socketID: string) {
        this.Jugadores.push(new Jugador(id, pseudonimo, socketID))
    }

    public eliminarJugador(socketID: string) {
        this.Jugadores = this.Jugadores.filter(elemento => elemento.socketID != socketID)
    }

    public obtenerIDUltimoJugador() {
        const idUltimoJugador = this.Jugadores.length;
        return idUltimoJugador
    }

    public iniciarJuego() {
        this.juegoIniciado = true;
    }

    public terminarJuego() {
        this.juegoIniciado = false
        this.juegoTerminado = true
        this.Jugadores = []
        this.creador = ""
    }

    public getCantidadJugadores() {
        return Object.keys(this.Jugadores).length;
    }


    public obtenerJugador(jugadorSocketID: string) {
        for (let jugador of this.Jugadores) {
            if (jugador.socketID == jugadorSocketID) {
                return jugador
            }
        }
        return null
    }






}
