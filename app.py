from flask import Flask, render_template, url_for, request, session, redirect, jsonify
import pymongo
import bcrypt
from livereload import Server
from flask_cors import CORS
from eye_movement.eyepi import EyeTracker
eyetracker = EyeTracker()

app = Flask(__name__)
cors=CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

client = pymongo.MongoClient(
   "mongodb+srv://admin:#####@hack36-kadbj.mongodb.net/test?retryWrites=true&w=majority")
db = client.test

@app.route('/')
def index():
    if 'username' in session:
        return 'You are logged in as ' + session['username']

    return render_template('index.html')

@app.route('/inc_stimuli')
def inc_stimuli():
    return render_template('inc_stimuli.html')

@app.route('/reaction')
def reaction_time():
    return render_template('reaction.html')

@app.route('/eye')
def eye_track():
    return render_template('eye_track.html')

@app.route('/blink')
def blinker():
    return render_template('blink.html')


@app.route('/login', methods=['POST'])
def login():
    users = db.users
    login_user = users.find_one({'name' : request.form['username']})

    if login_user:
        if bcrypt.hashpw(request.form['pass'].encode('utf-8'), login_user['password'].encode('utf-8')) == login_user['password'].encode('utf-8'):
            session['username'] = request.form['username']
            return redirect(url_for('index'))

    return 'Invalid username/password combination'

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        users = db.users
        existing_user = users.find_one({'name' : request.form['username']})

        if existing_user is None:
            hashpass = bcrypt.hashpw(request.form['pass'].encode('utf-8'), bcrypt.gensalt())
            users.insert({'name' : request.form['username'], 'password' : hashpass})
            session['username'] = request.form['username']
            return redirect(url_for('index'))
        
        return 'That username already exists!'

    return render_template('register.html')

eyeData = {}
@app.route('/api/', methods=["POST"])
def main_interface():
    response = request.get_json()
    eyeData = response
    # print(response)
    return response


@app.route('/activateModel/', methods=["POST"])
def model_interface():
    res=request.get_data()
    eye_coord=eyetracker.get_eye_direction()
    print(eye_coord)
    if(res=="true"):
        print(res)
    return res

# @app.route('/eyepy', methods=["GET"])
# def eyefunc():
#     return eyeData

@app.after_request
def add_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers',
                         'Content-Type,Authorization')
    return response


# @app.route('/servejson', methods=["POST"])

if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(debug=True)
    server = Server(app.wsgi_app)
    server.serve()
