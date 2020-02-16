from flask import Flask, render_template, url_for, request, session, redirect, jsonify
import pymongo
import bcrypt
from livereload import Server
from flask_cors import CORS
from eye_movement.eyepi import EyeTracker
from detect_blinks import Blinker
import subprocess
import pyautogui 

eyetracker = EyeTracker()
blinker = Blinker()


app = Flask(__name__)
cors=CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

client = pymongo.MongoClient(
   "mongodb+srv://admin:zemotacqy@hack36-kadbj.mongodb.net/test?retryWrites=true&w=majority")
db = client.test

@app.route('/')
def index():
    if 'username' in session:
        return render_template('viva.html')

    return render_template('index.html')

    

@app.route('/inc_stimuli')
def inc_stimuli():
    return render_template('inc_stimuli.html')

@app.route('/reaction')
def reaction_time():
    subprocess.call('./ss.sh')
    return render_template('reaction.html')

@app.route('/eye')
def eye_track():
    return render_template('eye_track.html')

@app.route('/blink')
def blinker():
    # subprocess.call('blinky.sh')
    return render_template('blink.html')

@app.route('/blinker')
def blinki():
    subprocess.call('./blinky.sh')
    return render_template('blank.html')

# @app.route('/activateBlink/', methods=['POST'])
# def blinkOn():
#     bb = blinker.doer()

username = ''
@app.route('/login', methods=['POST'])
def login():
    users = db.users
    login_user = users.find_one({'name' : request.form['username']})

    if login_user:
        if bcrypt.hashpw(request.form['pass'].encode('utf-8'), login_user['password']) == login_user['password']:
            session['username'] = request.form['username']
            global username
            username=session.get('username')
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
            global username
            username=session.get('username')
            return redirect(url_for('index'))
        
        return 'That username already exists!'

    return render_template('register.html')

eyeData = {}
eyeData =[]
eye_coord = []
@app.route('/api/', methods=["POST"])
def main_interface():
    global eye_coord
    #global eyeData
    response = request.get_json()
    eyData = response
    eyeData = eyData.get('message') 
    print("js",eyeData)
    print("model",eye_coord)
    eff_size=min(len(eyeData), len(eye_coord)) or 10
    cnt = 0
    for i in range(eff_size):
        if (eyeData[i] == eye_coord[i]):
            cnt+=1
    per_match  = ( cnt/eff_size ) *100


    eyeres=db.eyeres
    users=db.users
    current_user = users.find_one({'name' : username})
    print(username)
    print(current_user)
    existing_rec = eyeres.find_one({'name' : username})
    if existing_rec is None:
        eyeres.insert_one({'name': username , 'percent' : [per_match]})
        #eyeres.insert_one({'percent' : [per_match]})
    else:
        obj = eyeres.find_one({'name' :username})
        current_list=[]
        current_list.append(obj.get('percent').tolist())
        current_list.append(per_match)
        eyeres.update_one({'name' : username} , {'$set': {'percent' : current_list }})  
    return response


@app.route('/activateModel/', methods=["POST"])
def model_interface():
    global eye_coord
    res=request.get_data()
    eye_coord=eyetracker.get_eye_direction()
    # print(eyeData)
    print("init",eye_coord)
    

        
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
