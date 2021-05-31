import re
import numpy as np
from skimage.feature import greycomatrix, greycoprops
from skimage.color import rgb2gray
from skimage.io import imread_collection

if __name__ == '__main__':

    GRAY_LEVELS = 32
    D = 5  # horizontal displacement
    Θ = 0  # angular displacement

    image_collection = imread_collection('texture swatches/*.png')
    data = []

    # loop through the different GLCM properties
    props = ['contrast', 'dissimilarity', 'homogeneity', 'ASM', 'energy', 'correlation']

    # loop through all the images
    for name, image in zip(image_collection.files, image_collection):
        row = {}
        row['name'] = re.match('texture swatches.(.*_corrected.png)', name).group(1)
        for prop in props:
            # convert the image from rgb to grayscale
            # but rgb2gray makes a float image from 0 to 1, so multiply by GRAY_LEVELS and floor
            # make an image of integers from [0,32)
            gray_image = np.floor(GRAY_LEVELS * rgb2gray(image)).astype(int)
            # calculate the glcm for an image
            glcm = greycomatrix(gray_image, [D], [Θ], 256, symmetric=True, normed=True)
            row[prop] = greycoprops(glcm, prop)[0, 0]
        data.append(row)

    # print the dataframe
    print(data)
