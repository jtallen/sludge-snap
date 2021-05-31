# Loads data for testing.
# Loads in data from source CSV file, renames columns, and drops outlier values.
import pandas as pd

def load_test_data(input):

    # Read in CSV file of testing data with pandas to numpy array.
    # data = pd.read_csv('Testing_Data_Copy.csv', delimiter = ',')

    data = input

    # Read in CSV file of dummy data with pandas to numpy array.
    # This is necessary because the process that converts the categorical data to 1s and 0s
    # only does it for existing data in the sheet, so we need one example of each category
    # option for each field in the datasheet when we do this.
    # We remove the dummy rows before doing the prediction
    # so it does not affect the final result.
    # TURNER: < What exactly is happening here? It reads the dummy data in,
    # then replaces the first row with our input data? >
    dummy = pd.read_csv('machine_learning/Dummy_Data_Copy.csv', delimiter = ',')
    data = pd.concat([data, dummy])

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

    return data