# Loads data for training.
# Loads in CSV file, renames columns, and drops outlier values.
import pandas as pd
import numpy as np

def load_data():

    # Read in CSV file of training data with pandas to numpy array.
    data = pd.read_csv('Mastersheet_FINAL_Ward2020.csv', delimiter=',')

    # Rename the predictors.
    data.rename(columns={
        # MODEL INPUTS: Simple analytical measurements
        'ec': 'EC',
        'ph': 'pH',
        'foam_height': 'Foam_height',
        'bulk_H': 'bH',
        'bulk_S': 'bS',
        'bulk_V': 'bV',
        'contrast': 'contrast',
        'dissimilarity': 'dissim',
        'homogeneity': 'homog',
        'ASM': 'ASM',
        'energy': 'energy',
        'correlation': 'corr',
        'super_H': 'sH',
        'super_S': 'sS',
        'super_V': 'sV',

        # MODEL INPUTS: Categorical variables - Questionnaire data and expert assessments
        'oss_type_simplified': 'containment_type',
        'toilet_type_simplified': 'toilet_type_simplified',
        'water_connection': 'water_connection',
        'origin_simplified': 'source',
        'oder_before': 'odor',
        'bulk_color': 'color_qualitative',

        # MODEL TARGETS: Solid-liquid separation performance indicators
        'cst': 'CST',
        'turbidity': 'Turb',
        'ts_dewatered': 'TSdew',

        # MODEL TARGETS: Physical-chemical characteristics
        'cod': 'COD',
        'nh4': 'NH4',
        'ts_%': 'TS',
        'vs_%ts': 'VS',
        'TOC': 'TOC',
        'TKN': 'TKN',
        'density': 'Density',

    }, inplace=True)

    # Drop ultra-large values of CST and Turbidity.
    data = data[np.logical_or(data['CST'] < 2000, np.isnan(data['CST']))]
    data = data[np.logical_or(data['Turb'] < 2000, np.isnan(data['Turb']))]

    # Drop ultra-large values of TSdew > 60%ds.
    data = data[np.logical_or(data['TSdew'] < 60, np.isnan(data['TSdew']))]

    return data