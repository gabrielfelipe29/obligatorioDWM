use obligatorio
db.createCollection("administradores")
db.createCollection("propuestas")
db.createCollection("actividades")
db.createCollection("salas")
db.administradores.insertOne({id: "admin",contraseña: "admin"})
db.administradores.find()
db.createUser({user: "admin",pwd: "admin", roles:[{ role: 'root', db: 'admin' }]})
db.getUsers()
db.getRoles()
show tables

