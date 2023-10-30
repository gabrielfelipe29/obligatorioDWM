use obligatorio
//crear colecciones
db.createCollection("administradores")
db.createCollection("propuestas")
db.createCollection("actividades")
db.createCollection("salas")

//agregar o borrar usuario administrador
db.administradores.insertOne({id: "admin",contraseña: "admin"})
db.administradores.find()
db.administradores.deleteOne({id:"admin"})

//usuario con roles
db.createUser({user: "admin",pwd: "admin", roles:[{ role: 'root', db: 'admin' }]})

db.getUsers()
db.getRoles()



show tables


