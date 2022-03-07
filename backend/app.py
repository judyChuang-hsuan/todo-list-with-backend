from email.policy import default
from enum import unique
from itertools import product
from flask import Flask,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
from flask_cors import CORS
import datetime

app=Flask(__name__)
CORS(app)

basedir=os.path.abspath(os.path.dirname(__file__))

#database
app.config["SQLALCHEMY_DATABASE_URI"]="sqlite:///"+os.path.join(basedir,'db.sqlite')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False

#init db
db=SQLAlchemy(app)
#init marshmallow
ma=Marshmallow(app)

#Class
class Todo(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    name=db.Column(db.String(100),unique=True)
    date=db.Column(db.DateTime,default=datetime.datetime.now)

    def __init__(self,name):
        self.name=name
        


#schema
class TodoSchema(ma.Schema):
    class Meta:
        fields=('id','name','date')

#init schema
Todo_schema=TodoSchema()
Todos_schema=TodoSchema(many=True)

@app.before_first_request
def create_tables():
    db.create_all()
    
#create todo
@app.route("/todo",methods=['POST'])
def add_todo():
    name=request.json['name']

    newTodo=Todo(name)
    db.session.add(newTodo)
    db.session.commit()
    return Todo_schema.jsonify(newTodo)

#get all todos
@app.route("/todos",methods=['GET'])
def get_todos():
    allTodos=Todo.query.all()
    result=Todos_schema.dump(allTodos)
    return jsonify(result)


# update a todo
@app.route("/todos/<id>",methods=['PUT'])
def update_todo(id):
    todo=Todo.query.get(id)
    name=request.json["name"]

    todo.name=name
    db.session.commit()

    return Todo_schema.jsonify(todo)

#delete a todo
@app.route("/todos/<id>",methods=['DELETE'])
def delete_todo(id):
    todo=Todo.query.get(id)
    db.session.delete(todo)
    db.session.commit()
    return Todo_schema.jsonify(todo)


#run server
if __name__=="__main__":
    app.run(debug=True)