import base64
import images.MainColorCorrect
import re


def run(upload):
    # image = upload['image']
    image = re.sub('^data:image/.+;base64,', '', upload['image'])
    image_tmp_filename = "imageToSave.png"

    with open(image_tmp_filename, "wb") as fh:
        fh.write(base64.b64decode(image))

    # Run image processing code
    # try catch here?
    image_output = images.MainColorCorrect.process(image_tmp_filename)

    # print("Upload:")
    # print(upload)


    print("Image output:")
    print(image_output)
    output = upload | image_output

    # remove image from output
    del output["image"]

    print("Full output:")
    print(output)

    return output

    # for try catch - 