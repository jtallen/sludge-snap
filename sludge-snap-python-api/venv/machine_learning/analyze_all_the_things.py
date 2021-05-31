# Training the data with Random Forest Model.

import numpy as np
import pickle

from machine_learning.encode_and_bind import encode_and_bind

def analyze_all_the_things(data,
                           model,
                           label_column,
                           feature_columns,
                           dummy=True):
    # Labels are the values we want to predict (y variables).
    # Convert list to data.
    labels = np.array(data[label_column])
    features = data[feature_columns]

    # Convert categorical data into dummy/indicator values.
    if dummy:
        features_to_encode = ['containment_type',
                              'water_connection',
                              'toilet_type_simplified',
                              'source',
                              'odor',
                              'color_qualitative']

        # Go through and encode all features_to_encode.
        for feature in features_to_encode:
            res = encode_and_bind(features, feature)
            features = res

    # Fit and train the model
    y = model.fit(features, labels)

    # Save model into .sav file for later testing
    filename = 'finalized_model_' + label_column + '.sav'
    print(filename)
    pickle.dump(y, open(filename, 'wb'))

    return None