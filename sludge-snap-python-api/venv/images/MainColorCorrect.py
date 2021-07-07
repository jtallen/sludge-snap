import os
import pathlib
import colour
import numpy
import cv2
import imutils
import io
import imageio

import images.ColorCorrect
import images.SpyderCHECKR24
from images.FindCircle import FindCircle

def process(file):
    print(type(file))
    
    # define stuff
    path = pathlib.Path(file)
    filename = path.stem
    extension = path.suffix

    print("processing {:}".format(filename))

    # performance: reduce amount of img variables
    # benchmark this function 
    # print out time before function, time after function, etc.
    # look into benchmarking

    # decodes image in file using imageio with cctf decoding
    # i think using this specific decoding is important to this color correction library,
    # and it seems to specifically take a file as input (os.path.join(IN_DIR, file))
    image = colour.cctf_decoding(
        colour.io.read_image(path, method='Imageio'), function='sRGB')

    # color corrects cctf decoded image
    corrected_image = numpy.clip(images.ColorCorrect.color_correct(
        image, images.SpyderCHECKR24.colour_checker, method='Finlayson 2015'), 0.0, 1.0)

    # cctf encodes color corrected image (now the image is in imageio format)
    final_image = colour.cctf_encoding(corrected_image, function='sRGB')
    final_image = imutils.resize(final_image, height=800)

    # define the output image filename (can take this out if we don't want to save the image)
    # output_filename = os.path.join(
        # OUT_DIR, filename + '_corrected' + extension)

    # converts our imageio format image to byte array as an intermediary
    img_byte_arr = io.BytesIO()
    imageio.imwrite(img_byte_arr, final_image, format='jpg')

    # converts our byte array image to numpy format because cv2 uses numpy images
    img_byte_arr = img_byte_arr.getvalue()
    nparr = numpy.frombuffer(img_byte_arr, numpy.uint8)
    img_np = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # calls FindCircle, which finds the petri dishes and prints each color/texture and returns
    # the processed image with the found circles drawn on it, then saves the output image
    # into output_filename
    # if not saving the processed image, can delete the cv2.imwrite line but
    # it might be good to at least temporarily save it to display with the output results
    # to assure the user that the petri dishes were properly identified
    # try catch here?
    texture_data = FindCircle(img_np)

    return texture_data
