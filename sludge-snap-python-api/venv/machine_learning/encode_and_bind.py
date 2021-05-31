# One-Hot Encode function (Convert categorical data to dummy/indicator variables.)
import pandas as pd

def encode_and_bind(original_dataframe, features_to_encode):
    # Encode specific features in feature_to_encode list.
    dummies = pd.get_dummies(original_dataframe[[features_to_encode]])

    # Concatenate original features with newly encoded variables.
    res = pd.concat([original_dataframe, dummies], axis=1)

    # Remove old features that were encoded.
    res = res.drop([features_to_encode], axis=1)

    return (res)