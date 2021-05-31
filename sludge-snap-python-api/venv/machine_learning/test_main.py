# Main function for testing.
# Calls both test_main_no_super and test_main_with_super, then concats their results
# and makes it into a json object.

# Can be modified into a function that accepts a json object as input argument:
# eg: def test_main(json_input): instead of our current main function declaration,
# and then adding a "return json_final" statement at the end, which returns
# the json object with all the results.

import json
import pandas as pd

from machine_learning.merge_dicts import merge_dicts
from machine_learning.test_main_with_super import test_main_with_super
from machine_learning.test_main_no_super import test_main_no_super

def main(input_json):

    # print(input_json)

    # Currently this loads in the json object from file.
    # If modifying to accept json object as input instead of reading from file,
    # delete this line,
    # f = open('data.json')

    # then change f in this line to whatever your json object is called.
    # This makes the json object into a dict.
    input_dict = json.loads(input_json)

    # Then the dict is translated to a pandas dataframe.
    input = pd.DataFrame([input_dict])

    # this setting makes printing pandas dataframes more readable
    pd.set_option("display.max_rows", None, "display.max_columns", None)
    print("Pandas Dataframe")
    print(input)

    # Calls the two tester functions
    # withSuperResult = test_main_with_super(input)
    noSuperResult = test_main_no_super(input)

    # Merges the two result dictionaries
    # merge_dicts(noSuperResult, withSuperResult)
    # finalResult = withSuperResult

    # Convert to json string
    # json_final = json.dumps(finalResult)
    json_final = json.dumps(noSuperResult)
    print("json_final:")
    print(json_final)
    # Final result is held in json_final
    return json_final