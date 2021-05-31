import numpy
import cv2
from skimage.feature import greycomatrix, greycoprops
from skimage.color import rgb2gray, rgba2rgb
import math

def FindCircle(image):

	# some constants
	texture = {}
	GRAY_LEVELS = 32
	D = 5  # horizontal displacement
	Θ = 0  # angular displacement
	props = ['contrast', 'dissimilarity', 'homogeneity', 'ASM', 'energy', 'correlation']

	# get gray and hsv copies of the image
	output = image.copy()
	gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
	hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

	# detect circles in the image
	circles = cv2.HoughCircles(gray, cv2.HOUGH_GRADIENT, 1.2, 100)
	# print("")
	# print("circles:")
	# print(circles)

	# ensure at least some circles were found
	if circles is not None:
		# convert the (x, y) coordinates and radius of the circles to integers
		circles = numpy.round(circles[0, :]).astype("int")
		# loop over the (x, y) coordinates and radius of the circles
		for (x, y, r) in circles:
			# define mask
			mask = numpy.zeros(image.shape, numpy.uint8)
			cv2.circle(mask, (x, y), r, (0, 255, 0), -1)
			# use mask
			where = numpy.where(mask == 255)
			intensity_values = hsv[where[0], where[1]]
			# get intensity values (these are in HSV format, but openCV HSV uses a different scale from
			# standard HSV for some reason)
			img_vals = numpy.mean(intensity_values, axis=0)
			# convert openCV HSV values into standard HSV values
			hsvvals = [0, 0, 0]
			hsvvals[0] = (360 / 179) * img_vals[0]
			hsvvals[1] = (100 / 255) * img_vals[1]
			hsvvals[2] = (100 / 255) * img_vals[2]
			# now the hsv values are held in list "hsvvals"; print them
			print("hsv values: ", hsvvals)

			# draw the circle in the output image, then draw a rectangle
			# corresponding to the center of the circle
			cv2.circle(output, (x, y), r, (0, 255, 0), 4)
			cv2.rectangle(output, (x - 5, y - 5), (x + 5, y + 5), (0, 128, 255), -1)

			# calculate math parameters to define the texture swatch
			dist = ((math.sqrt(2) * r)/2)
			ydown = round(y - dist)
			yup = round(y + dist)
			xleft = round(x - dist)
			xright = round(x + dist)

			# crop the texture swatch from the image and save it to a new image
			textureswatch = image[ydown:yup, xleft:xright]

			# blank list to hold texture data
			texture = {}

			# add hsv vals to texture list
			texture["bulk_H"] = hsvvals[0]
			texture["bulk_S"] = hsvvals[1]
			texture["bulk_V"] = hsvvals[2]

			# convert the image from rgb to grayscale
			# but rgb2gray makes a float image from 0 to 1, so multiply by GRAY_LEVELS and floor
			# make an image of integers from [0,32)
			gray_image = numpy.floor(GRAY_LEVELS * rgb2gray(textureswatch)).astype(int)

			# calculate the glcm for an image
			glcm = greycomatrix(gray_image, [D], [Θ], 256, symmetric=True, normed=True)

			for prop in props:
				texture[prop] = greycoprops(glcm, prop)[0, 0]

			# now the texture values are held in list "texture"; print them
			print("texture data: \n", texture)

	# return the texture data
	return texture