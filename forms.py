from wtforms import Form
from wtforms import StringField, TextField
from wtforms.fields.html5 import * 
from wtforms import validators
from wtforms import PasswordField
from wtforms import HiddenField


class commentForm(Form):
	usuario = StringField('usuario')
	email = EmailField('Correo electronico')
	