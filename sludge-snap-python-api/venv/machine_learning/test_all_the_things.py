# Testing the data with previous Random Forest Model.
import json

from machine_learning.encode_and_bind import encode_and_bind

def test_all_the_things(data,
                        model,
                        feature_columns,
                        label,
                        dummy=True):
    # Features are inputs we want to use in our prediction
    features = data[feature_columns]

    # Convert categorical data into dummy/indicator values.
    if dummy:
        features_to_encode = ['containment_type',
                              'toilet_type_simplified',
                              'water_connection',
                              'source',
                              'odor',
                              'color_qualitative']

        # Go through and encode all features_to_encode.
        for feature in features_to_encode:
            res = encode_and_bind(features, feature)
            features = res

    # Predict output based on given features.
    print("Post-Encoding Data:")
    print(features)
    y = model.predict(features)
    output = y[0]

    # Convert ndarray to list
    lists = output.tolist()
    # Convert list to json string object
    json_str = json.dumps(lists)

    # Create temporary dictionary to story each label at a time
    tmp_dic = {}
    tmp_dic[label] = json_str

    # Return the temporary dictionary to be combined later
    return tmp_dic