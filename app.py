from flask import Flask, render_template, redirect, request, jsonify
from flask_restful import Resource, Api

import json
import numpy as np
import pandas as pd

app = Flask(__name__)
api = Api(app)

char_num = ['4ch', '8ch']
structure_type = ['algType', 'minLen']
alg_type = [
                ['nb', 'Naive Bayesian'], 
                ['sgd', 'SGD/SVM'],
                ['lr', 'Logistic Regression'],
                ['rf', 'Random Forest']
            ]
min_lengths = ['10', '20', '30', '40', '50']

json_data = dict()

for i in char_num:
    json_data[i] = dict()
    for j in structure_type:
        json_data[i][j] = dict()
        
        if j == 'algType':
            for k in alg_type:
                json_data[i][j][k[1]] = dict()
                for l in min_lengths:
                    loop_df = pd.read_csv('futurama/results/{}_result_min_len_{}.csv'.format(i, l))
                    json_data[i][j][k[1]][l] = loop_df[k[0]].tolist()
                    
        elif j == 'minLen':
            for m in min_lengths:
                json_data[i][j][m] = dict()
                loop_df = pd.read_csv('futurama/results/{}_result_min_len_{}.csv'.format(i, m))
                for n in alg_type:
                    json_data[i][j][m][n[1]] = loop_df[n[0]].tolist()



@app.route("/")
def home():
        
    return render_template("index.html")

@app.route("/data")
def data():

    return jsonify(json_data)


if __name__ == '__main__':
    app.run()
