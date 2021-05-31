# Testing the models that use supernatant color inputs
# This gives 'Turb', 'CST', 'TSdew'

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

from machine_learning.test_all_the_things import test_all_the_things
from machine_learning.load_test_data import load_test_data
from machine_learning.flatten import flatten
from machine_learning.merge_dicts import merge_dicts

# suppress warning
import warnings
warnings.filterwarnings("ignore")
plt.rcParams.update({'font.size': 14})

def test_main_with_super(input):

    # Create empty dictionary named results
    results = {}

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
        # Load in model from training
        filename = 'machine_learning/finalized_model_' + label + '.sav'
        rf = pickle.load(open(filename, 'rb'))

        # Load in data to be tested
        data = load_test_data(input)

        # Return analyze_all_the_things.
        def analyze(feature_list):
            return test_all_the_things(
                data,
                model=rf,
                label=label,
                feature_columns=feature_list)

        # Test the data.
        feature_list = flatten(features)
        # Run testing code
        result = analyze(feature_list)
        # Merge temporary dictionaries with final dictionary called results
        merge_dicts(result, results)

    return results