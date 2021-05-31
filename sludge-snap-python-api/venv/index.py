from flask import Flask, request, jsonify
import images.process_upload
import model
import machine_learning.test_main
import json

app = Flask(__name__)

@app.route('/run-model', methods=['POST'])
def run_model():
    input_data = request.json

    # return an error reponse here from flask if error happens on 
    # look up how to return error from flask api
    processed_input_data = images.process_upload.run(input_data)
    
    # print(processed_input_data)
    json_transit = json.dumps(processed_input_data)
    output_data = machine_learning.test_main.main(json_transit)
    # print(output_data)
    return jsonify(output_data)