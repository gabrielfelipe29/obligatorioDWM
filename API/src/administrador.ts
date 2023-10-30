export class Administrador {
    public id: String;
    public contraseña: String;

    constructor(id: String, contraseña: String) {
        this.contraseña = contraseña;
        this.id = id;
    }

    public login(){
        //verificar si existe el usuario en la base de datos
    }
}
