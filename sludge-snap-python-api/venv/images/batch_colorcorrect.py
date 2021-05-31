import os
import pathlib
import colour
import numpy
import cv2
import imutils
import io
import imageio

import ColorCorrect
import SpyderCHECKR24
from FindCircle import FindCircle

if __name__ == '__main__':

    # identifies input and output directories
    IN_DIR = 'JPG_uncorrected'
    OUT_DIR = 'JPG_corrected'

    # get all files in the input directory
    # filter all the *.JPG files
    files = [file for file in os.listdir(IN_DIR) if file.endswith('JPG')]
    processed = [file for file in os.listdir(OUT_DIR) if file.endswith('JPG')]

    files = [file for file in files if pathlib.Path(file).stem + '_corrected' + pathlib.Path(file).suffix not in processed]
    files = [file for file in files if file[0] != 'z']
    print(files)

    def process(file):
        # define stuff
        IN_DIR = 'JPG_uncorrected'
        OUT_DIR = 'JPG_corrected'
        path = pathlib.Path(file)
        filename = path.stem
        extension = path.suffix
        print(os.path.join(IN_DIR, file))

        print("processing {:}".format(filename))
        try:
            # decodes image in file using imageio with cctf decoding
            # i think using this specific decoding is important to this color correction library,
            # and it seems to specifically take a file as input (os.path.join(IN_DIR, file))
            image = colour.cctf_decoding(
                colour.io.read_image(os.path.join(IN_DIR, file), method='Imageio'), function='sRGB')

            # color corrects cctf decoded image
            corrected_image = numpy.clip(ColorCorrect.color_correct(
                image, SpyderCHECKR24.colour_checker, method='Finlayson 2015'), 0.0, 1.0)

            # cctf encodes color corrected image (now the image is in imageio format)
            final_image = colour.cctf_encoding(corrected_image, function='sRGB')
            final_image = imutils.resize(final_image, height=800)

            # define the output image filename (can take this out if we don't want to save the image)
            output_filename = os.path.join(
                OUT_DIR, filename + '_corrected' + extension)

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
            newimage = FindCircle(img_np)
            cv2.imwrite(output_filename, newimage)

        except:
            print("error processing {:}".format(filename))


    from multiprocess import Pool
    # the number in Pool(x) represents number of threads the code uses i think
    p = Pool(1)
    p.map(process, files)