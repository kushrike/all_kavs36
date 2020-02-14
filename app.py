from flask import Flask, render_template, url_for
import bcrypt
from livereload import Server

app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def inc_stimuli():
    return render_template('inc_stimuli.html')


if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(debug=True)
    server = Server(app.wsgi_app)
    server.serve()
