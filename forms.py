from wtforms import Form
from wtforms import StringField, TextField
from wtforms.fields.html5 import * 
from wtforms import validators
from wtforms import PasswordField
from wtforms import HiddenField


def len_honeypot(form, field):
	if len(field.data)>0:
		raise validators.ValidationError('el campo debe estar vacio.')

#class commentForm(Form):
#	usuario = StringField('usuario',[validators.length(min=4, max=25, message='Ingrese un username valido'),
#	validators.Required(message = 'El usuario es requerido')])
#	email = EmailField('Correo electronico')
#	password = PasswordField('Password', [validators.Required(message='La contraseña es requerida')])
#	honeypot = HiddenField('', [len_honeypot])
	
class loginForm(Form):
	usuario = StringField('usuario',[validators.length(min=4, max=25, message='Ingrese un username valido'),
	validators.Required(message = 'El usuario es requerido')])
	#email = EmailField('Correo electronico')
	password = PasswordField('Password', [validators.Required(message='La contraseña es requerida')])
	honeypot = HiddenField('', [len_honeypot])
	nombre = StringField('nombre')
	apellido = StringField('apellido')
	puesto = StringField('puesto')
	nombreEditar = StringField('nombre', id = "nombreEmpleadoModificar")
	apellidoEditar = StringField('apellido', id = "apellidoEmpleadoModificar")
	puestoEditar = StringField('puesto', id = "puestoEmpleadoModificar")
	idEditar = StringField('id', id = "idEmpleadoModificar")
	random = StringField('id', id = "random")
	
	