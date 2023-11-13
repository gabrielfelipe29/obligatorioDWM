export class Administrador {
    public id: String;
    public contraseña: String;
    
    // Sala del juego creado recientemente
    public salaID: String = "";
    public socketID: string = "";

    constructor(id: String, contraseña: String) {
        this.contraseña = contraseña;
        this.id = id;
    }

   

    public unirseJuego(salaID: String, idSocket: string){
        this.salaID = salaID;
        this.socketID = idSocket;
    }

    public comprobarSalaActual(salaIDRecibida: String){
        return this.salaID == salaIDRecibida
    }




}
