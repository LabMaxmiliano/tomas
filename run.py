from flask import Flask
from flask import render_template
from flask import request

import forms

app = Flask(__name__)

@app.route('/', methods =['GET', 'POST'])
def index():
	comment_form = forms.commentForm(request.form)
	if request.method == 'POST':
		print (comment_form.usuario.data)
		print (comment_form.email.data)
	title = "Admind Emp"
	return render_template('index2.html', title = title, form = comment_form)
	

 
if __name__ == "__main__":
	app.run(debug=True)