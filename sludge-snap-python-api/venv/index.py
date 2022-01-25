from flask import Flask, request, jsonify
import images.process_upload
import model
import machine_learning.test_main
import json

app = Flask(__name__)

@app.route('/run-model', methods=['POST'])
def run_model():

    input_data = request.json

    # run image processing
    # processed_input_data = images.process_upload.run(input_data)
    
    # json_transit = json.dumps(processed_input_data)

    # run model
    # output_data = machine_learning.test_main.main(json_transit)

    # using stubbed data for public site display
    output_data = json.dumps(model.process(input_data))


    print("Output data:")
    print(output_data)
    
    return jsonify(output_data)


# make a new one for the model