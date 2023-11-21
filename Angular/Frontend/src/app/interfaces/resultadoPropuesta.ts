export class ResultadoPropuesta {
    public primerLugar: { 
        nombreActividad: "",
        puntaje: 0
    } 
    public segundoLugar: {
        nombreActividad: "",
        puntaje: 0
    } 
    public tercerLugar: { 
        nombreActividad: "",
        puntaje: 0
    }

    constructor(primerLugar: any, segundoLugar: any, tercerLugar: any){
        this.primerLugar = primerLugar
        this.segundoLugar = segundoLugar
        this.tercerLugar = tercerLugar
    }   


}