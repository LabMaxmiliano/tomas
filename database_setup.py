import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from sqlalchemy import update

#!/usr/bin/env python
# -*- coding: utf-8 -*

Base = declarative_base()

class Empleado(Base):
	__tablename__ = 'empleado'

	id = Column(Integer, primary_key = True)
	nombre = Column(String(40), nullable = False)
	apellido = Column(String(40), nullable = False)
	puesto = Column(String(80), nullable = False)
	activo = Column(String(10), nullable = False)
	
	
class Usuario(Base):
	__tablename__ = 'usuario'

	id = Column(Integer, primary_key = True)
	nombreUsuario = Column(String(40), nullable = False)
	contraseña = Column(String(40), nullable = False)

class Objeto(Base):
	__tablename__ = 'objeto'

	id = Column(Integer, primary_key = True)
	nombre = Column(String(40), nullable = False)
	descripcion = Column(String(200), nullable = False)
	empleado_id = Column(Integer, ForeignKey('empleado.id'))
	empleado = relationship(Empleado)

engine=create_engine('sqlite:///adminObjetosDB.db')
Base.metadata.create_all(engine)