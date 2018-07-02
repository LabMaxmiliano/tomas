from . import app
from flask import render_template
import forms
@app.route('/')
def index():
	return render_template ('index.html')

@app.route('/test')
def test():
	return render_template('index.html')
