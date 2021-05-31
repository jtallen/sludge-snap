# Training the model for fields that use supernatant color.
# Training doesn't need to be repeated every time and can be run on an as-needed basis
# whenever the models need to be updated.
# To run this, just change the csv file in the load_data code file to your source data csv filename
# and run the main function in this code.
# Saves the models to .sav files.
# Can be run in an IDE.

import pickle
import json
import numpy as np
import pandas as pd
import statsmodels.api as sm
import matplotlib.pyplot as plt
import itertools
from math import sqrt
from scipy import stats
from sklearn.ensemble import RandomForestRegressor
from sklearn.multioutput import MultiOutputRegressor
from sklearn.linear_model import LinearRegression
from sklearn.inspection import partial_dependence
from sklearn.inspection import plot_partial_dependence
from sklearn import metrics
from sklearn.metrics import mean_squared_error, make_scorer
from sklearn.model_selection import cross_val_score, cross_val_predict, cross_validate, train_test_split, KFold, RepeatedKFold, LeaveOneOut, ShuffleSplit
from sklearn.tree import DecisionTreeRegressor
from multiprocessing import Pool
from tqdm.notebook import tqdm

from machine_learning.analyze_all_the_things import analyze_all_the_things
from machine_learning.flatten import flatten
from machine_learning.load_data import load_data

# suppress warning
import warnings
warnings.filterwarnings("ignore")
plt.rcParams.update({'font.size': 14})

for label in ['Turb', 'CST', 'TSdew']:
    features = [
        'EC',
        'pH',
        'Foam_height',
        ['bH', 'bS', 'bV'],
        ['contrast', 'dissim', 'homog', 'ASM', 'energy', 'corr'],
        ['sH', 'sS', 'sV'],
        'containment_type',
        'toilet_type_simplified',
        'water_connection',
        'source',
        'odor',
        'color_qualitative'
    ]

    # Load CSV
    data = load_data()
    # Line up Columns
    data = data[[*flatten(features), label]]
    # Drop all rows with NaN Values
    data = data.dropna()

    print(label)

    # Instantiate random forest model with 1000 decision trees
    rf = RandomForestRegressor(n_estimators=1000, random_state=42)

    # Return analyze_all_the_things.
    def analyze(feature_list):
        return analyze_all_the_things(
            data,
            model=rf,
            label_column=label,
            feature_columns=feature_list)

    # Train the data.
    if __name__ == '__main__':
        feature_list = flatten(features)
        analyze(feature_list)