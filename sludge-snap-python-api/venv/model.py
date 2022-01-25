STUB_DATA_0 = {
    'CST': '345.5',
    'Turb': '167',
    'TSdew': '25.91',
    'COD': '51.2',
    'NH4': '0.2',
    'TS': '1.35',
    'VS': '56.46',
    'TOC': '10.10695187',
    'TKN': '1.071',
    'Density': '.419887',
}

STUB_DATA_1 = {
    'CST': '123.4',
    'Turb': '110',
    'TSdew': '15.78',
    'COD': '129.1',
    'NH4': '0.8',
    'TS': '13.79',
    'VS': '57.68',
    'TOC': '15.72192513',
    'TKN': '1.33',
    'Density': '1.0545',
}

STUB_DATA_2 = {
    'CST': '262.4',
    'Turb': '1027',
    'TSdew': '14.8',
    'COD': '132.3',
    'NH4': '0.4',
    'TS': '18.51',
    'VS': '88.7',
    'TOC': '8.556149733',
    'TKN': '1.83',
    'Density': '1.1515',
}

def fake_process(input_data):
    if input_data['ph'] == 5:
        return STUB_DATA_0
    elif input_data['ph'] == 6:
        return STUB_DATA_1

    return STUB_DATA_2

def process(input_data):
    print('\n\n\nSix\n\n\n')
    return fake_process(input_data)