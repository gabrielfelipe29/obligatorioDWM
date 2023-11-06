export class Jugador {
    public id: number;
    public pseudonimo: String;
    public socketID: string

    constructor(id: number, pseudonimo: String, socketID: string) {
        this.pseudonimo = pseudonimo;
        this.id = id;
        this.socketID = socketID;
    }

}
