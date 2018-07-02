from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import  Base, Empleado, Objeto, Usuario

#!/usr/bin/env python
# -*- coding: utf-8 -*

engine = create_engine('sqlite:///adminObjetosDB.db')
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session= DBSession()


elEmpleado = Empleado(nombre = "Tomassini", apellido = "Niessinni", puesto = "Chepibe")
session.add(elEmpleado)
session.commit()

elEmpleado = Empleado(nombre = "juan", apellido = "alberto", puesto = "kapoDeLaEmpresa")
session.add(elEmpleado)
session.commit()

elEmpleado = Empleado(nombre = "pepe", apellido = "argento", puesto = "zapatero")
session.add(elEmpleado)
session.commit()

elEmpleado = Empleado(nombre = "elChabo", apellido = "DelOcho", puesto = "jefe")
session.add(elEmpleado)
session.commit()

elEmpleado = Empleado(nombre = "armando", apellido = "barreras", puesto = "ArmadorDeBarreras")
session.add(elEmpleado)
session.commit()

elEmpleado = Empleado(nombre = "Ezequiel", apellido = "Atencio", puesto = "putaDeJuan")
session.add(elEmpleado)
session.commit()

elEmpleado = Empleado(nombre = "jorgito", apellido = "????", puesto = "asesino")
session.add(elEmpleado)
session.commit()

elEmpleado = Empleado(nombre = "bruno", apellido = "bassi", puesto = "jefeDeJorgito")
session.add(elEmpleado)
session.commit()

elUsuario = usuario(nombreUsuario = "tomas", contraseña = "soyElMejorEmpleado")
session.add(elEmpleado)
session.commit()

elEmpleado = Empleado(nombre = "Tomassini", apellido = "Niessinni", puesto = "Chepibe")
session.add(elEmpleado)
session.commit()

elUsuario = Usuario(nombreUsuario = "atencio", contraseña = "brunitoElMejor")
session.add(elUsuario)
session.commit()

elUsuario = Usuario(nombreUsuario = "destacado", contraseña = "123456")
session.add(elUsuario)
session.commit()



resultado = session.query(Empleado).all();
#print (resultado)
lista=[]
for x in resultado:
	lista2=[]
	lista2.append(x.nombre)
	lista2.append(x.apellido)
	lista2.append(x.puesto)
	lista.append(lista2)
	#print(x.nombre)
	
print(lista)	

session.close()
engine.dispose()