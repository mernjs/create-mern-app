from flask import Flask, redirect, url_for, render_template, request, session, flash
from datetime import timedelta
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)

app.secret_key = "vijay123"
app.permanent_session_lifetime = timedelta(minutes=5)

basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'users.sqlite3')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):  
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100))

    def __init__(self, name, email):
        self.name = name
        self.email = email

@app.route('/')
def home():
    return "Hello"

@app.route('/view')
def view():
    return render_template("view.html", values=User.query.all())

@app.route('/info/<name>')
def user(name):
    return f"<h1>Hello {name}</h1>"

@app.route('/admin')
def admin():
    return redirect(url_for("user", name="Admin"))

@app.route('/about')
def about():
    return render_template("index.html", content="My Flask Website", data=["Python", "Flask", "React"], userName="vprt", firstName="Vijay", lastName="Singh")

@app.route('/contactus')
def contactus():
    return render_template("contactus.html", content="My Flask Website")

@app.route('/login', methods=["POST", "GET"])
def login():
    if request.method == "POST":
        session.permanent = True
        email = request.form["email"]
        name = request.form.get("name", "Guest") 

        found_user = User.query.filter_by(email=email).first()
        if found_user:
            session["email"] = found_user.email
        else:
            usr = User(name, email)
            db.session.add(usr)
            db.session.commit()
        flash("Login Successful!")
        return redirect(url_for("dashboard", email=email))
    else:
        if "email" in session:
            email = session["email"]
            return redirect(url_for("dashboard", email=email))
        else:
            return render_template("login.html")


@app.route('/<email>')
def dashboard(email):
    if "email" in session:
        email = session["email"]
        return render_template("dashboard.html", email=email)
    else:
        return redirect(url_for("login"))

@app.route('/logout')
def logout():
    if "email" in session:
        email = session["email"]
        flash(f"You have been logged out! {email}", "info")
    session.pop("email", None)
    return redirect(url_for("login"))

if __name__ == "__main__":
    with app.app_context():
        try:
            db.create_all()
            print("Database tables created successfully")
        except Exception as e:
            print(f"Error creating database: {e}")
    app.run(debug=True)
