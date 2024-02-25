from flask import Flask,render_template
from internal.routes.Pacient_routes import api

app = Flask(__name__)
app.register_blueprint(api)

# route home
@app.route('/')
def home():
    return render_template("index.html")

