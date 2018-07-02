from flask import Flask
from flask import render_template
from flask import request
from flask import make_response
from flask import session
from flask import redirect
from flask import url_for
from flask_wtf import CsrfProtect
from flask import flash
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Empleado, Objeto, Usuario
from sqlalchemy import update
from flask_sqlalchemy import SQLAlchemy
import datetime
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from db import DemoDB
from db import DB
from db import list_profiles
from db import db


#!/usr/bin/env python
# -*- coding: utf-8 -*

import forms

app = Flask(__name__)

app.secret_key = 'miContraseña'
csrf = CsrfProtect(app)


@app.route('/', methods =['GET', 'POST'])
def index():
	login_form = forms.loginForm(request.form)
	if request.method == 'POST' and login_form.validate():
		usuario = login_form.usuario.data
		
		session['usuario'] = login_form.usuario.data
		usuario = login_form.usuario.data
		contraseña = login_form.password.data
		acceso = listaUsuarios(usuario, contraseña)
		if acceso == True:
			success_message = 'Bienvenido {}'.format(usuario)
			flash(success_message)
			return redirect(url_for('administrarEmpleados'))	
			
	else:
		
		print ('error en el formulario')
	return render_template('index2.html', form = login_form)
	
def listaUsuarios(usuario, contraseña):
	lista=listaMod()
	for y in lista:
		print (y)
		print (y[0])
		print (y[1])
		if y[0] == usuario and y[1] == contraseña:
			
			return True
			
	

def listaMod():
	engine = create_engine('sqlite:///adminObjetosDB.db')
	Base.metadata.bind = engine

	DBSession = sessionmaker(bind=engine)
	session= DBSession()
	resultado = session.query(Usuario).all();
	#print (resultado)
	lista=[]
	for x in resultado:
		lista2=[]
		lista2.append(x.nombreUsuario)
		lista2.append(x.contraseña)
		lista.append(lista2)
		#print(x.nombre)	
	session.close()
	engine.dispose()
	return lista
	

def listaEmp():
	engine = create_engine('sqlite:///adminObjetosDB.db')
	Base.metadata.bind = engine

	DBSession = sessionmaker(bind=engine)
	session= DBSession()
	resultado = session.query(Empleado).all();
	#print (resultado)
	lista=[]
	for x in resultado:
		lista2=[]
		lista2.append(x.id)
		lista2.append(x.nombre)
		lista2.append(x.apellido)
		lista2.append(x.puesto)
		lista2.append(x.activo)
		lista.append(lista2)
		#print(x.nombre)	
	session.close()
	engine.dispose()
	return lista
			
			
#def listaObjetos():
				
	
@app.route('/AdministrarEmpleados', methods =['GET', 'POST'])
def administrarEmpleados():
	login_form = forms.loginForm(request.form)
	usuario = session['usuario']
	nombre = login_form.nombre.data
	apellido = login_form.apellido.data
	puesto = login_form.puesto.data
	if nombre != "" and request.method == 'POST' :
		agregarEmpleado(nombre, apellido, puesto)
	idEditar = login_form.idEditar.data
	print (idEditar)
	nombreEditar = login_form.nombreEditar.data
	#print (nombreEditar)
	apellidoEditar = login_form.apellidoEditar.data
	puestoEditar = login_form.puestoEditar.data
	lista = listaMod()
	print(idEditar)
	#print("fasfasfgagagaghhas")
	if idEditar != "":
		print("entro al if de idEditar")
		editarEmpleado(idEditar, nombreEditar, apellidoEditar, puestoEditar )
	#print (lista)
	listaEmpleados = listaEmp()
	#print (listaEmpleados)
	for x in lista:
		if usuario == x[0]:
			login_form = forms.loginForm(request.form)
			print(listaEmpleados)
			return render_template('AdministrarEmpleados.html', form = login_form, listaEmpleados = listaEmpleados)
		
	return redirect(url_for('index'))

@app.route('/A+dministrarObjeto', methods =['GET', 'POST'])
def administrarObjetos():
	login_form = forms.loginForm(request.form)
	#usuario = session['usuario']
	#lista = listaMod()
	#print (lista)
	#listaEmpleados = listaEmp()
	#print (listaEmpleados)
	#for x in lista:
	#	if usuario == x[0]:
	#		login_form = forms.loginForm(request.form)
	return render_template('AdministrarObjetos.html', form = login_form)
		
	#return redirect(url_for('index'))


@app.route('/logaut', methods =['GET', 'POST'])
def logaut():
	if 'usuario' in session:
		
		session.pop('usuario')
		
	return redirect(url_for('index'))	

@app.route('/usuario', methods =['GET', 'POST'])	
def usuario():
	if 'usuario' in session:
		usuario = session['usuario']
		print (usuario)
	return render_template('usuario.html')

	
def agregarEmpleado(nombre, apellido, puesto):
	engine = create_engine('sqlite:///adminObjetosDB.db')
	Base.metadata.bind = engine
	DBSession = sessionmaker(bind=engine)
	session= DBSession()	
	elEmpleado = Empleado(nombre = nombre, apellido = apellido, puesto = puesto, activo = "1")
	print (elEmpleado.nombre)
	print (elEmpleado.apellido)
	print (elEmpleado.puesto)
	print (elEmpleado.activo)
	session.add(elEmpleado)
	session.commit()
	session.close()
	engine.dispose()

def editarEmpleado(idEmp, nombreEdit, apellidoEdit, puestoEdit):
	engine = create_engine('sqlite:///adminObjetosDB.db')
	Base.metadata.bind = engine
	DBSession = sessionmaker(bind=engine)
	session= DBSession()
	resultado = session.query(Empleado).all();
	num = str(idEmp)
	#db.session.delete(me)
	#stmt = update(Empleado).where(Empleado.id==5).\
    #    values(name='user #5')
	#session.commit()
	#admin = empleado.query.filter_by(id = 1).first()
	admin = session.query(Empleado).filter_by(id = idEmp).first();
	admin.nombre = nombreEdit
	print(admin.nombre)
	print(admin.apellido)
	print(admin.puesto)
	admin.apellido = apellidoEdit
	admin.puesto = puestoEdit
	session.commit()
	#session.add(admin)
	#session.commit()
	session.close()
	engine.dispose()
	#admin.nombre
	#print (admin.nombre)
	
	#user = empleado.query.get(5)
	#user.apellido = 'nuevo apellido'
	#de.session.commit()
	
	
	"""
	
	
	#empleadoMod = session.query(Empleado).filter_by(id = id).first;
	#session.query(empleado)
	#empleadoMod = Empleado.query.filter_by(id = id).first()
	#empleadoMod.nombre = nombreEdit
	#empleadoMod.apellido = apellidoEdit
	#empleadoMod.puesto = puestoEdit
	session.add(empleadoMod)
	session.commit()
	session.close()
	engine.dispose()
	
	
	
	
	
	stmt = update(empleado).where(empleado.id==idEmp).\
        values(nombre=nombreEdit)
		
	session.add(stmt)
	session.commit()
	
	stmt1 = update(empleado).where(empleado.id==idEmp).\
    values(apellido=apellidoEdit)
	
	session.add(stmt1)
	session.commit()
	
	stmt2 = update(empleado).where(empleado.id==idEmp).\
    values(puesto=puestoEdit)
	
	session.add(stmt2)
	session.commit()
	

	
	
	
	
	stmt = resultado.update().\
		where(Empleado.c.id==idEmp).\
		values(nombre = nombreEdit)
		
	session.add(stmt)
	session.commit()
	
	stmt1 = resultado.update().\
		where(Empleado.c.id==idEmp).\
		values(apellido = apellidoEdit)
		
	session.add(stmt1)
	session.commit()
	
	stmt2 = Empleado.update().\
		where(Empleado.c.id==idEmp).\
		values(puesto = puestoEdit)
		
	session.add(stmt2)
	session.commit()
"""		
		
	"""
	for x in resultado:
		
		idEmpleado = str(x.id)
		print (idEmpleado)
		print (num)
		if idEmpleado == num:
			print ("deberia estar editando")
			#x[1] = nombre
			#x[2] = apellido
			#x[3] = puesto
			stmt = users.update().\
            where(users.c.id==5).\
            values(name='user #5')
			
	"""		
			
			
			
			
			
			
			
			
			
	

#@app.route('cookie')
#def cookie():
#	response = make_response( )


#para manejar sesiones
#if 'username' in session:
#	usename= session['username']
#print username 
if __name__ == "__main__":
	app.run(debug=True)