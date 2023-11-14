export class Actividad {
  public id: number = 0
  public nombre: string = ""
  public descripcion: string = ""
  public imagen: string = ""

  constructor(id: number, nombre: string, descripcion: string, imagen: string){
    this.id = id
    this.nombre = nombre
    this.descripcion = descripcion
    this.imagen = imagen
  }
}