# Sludge Snap

Sludge Snap is a mobile-first web app that uses realtime image recognition and machine learning in order to provide characterizations for sludge samples collected in the field by sanitation workers.

Developed for the Swiss Federal Institute of Aquatic Science and Technology ([eawag](https://www.eawag.ch/en/) for short).

## Collaborators

This app was developed by Turner Allen with help from Devin Sivick, Kimberley Yu, Brandon Sun, and Andres Escamilla. It was built in collaboration with and from specifications provided by the eawag.

## File Structure

This app is divided between two subdirectories. One folder containing the React front end and Node back end, and one folder containing the Python back end.

If run locally, they must both be spun up separately, using the instructions provided at the bottom of this README.

## Tech Stack

- React front end using a [NextJS](https://nextjs.org/) framework.
- [Tailwind CSS](https://tailwindcss.com/) for styling.
- [Node](https://nodejs.org/en/about/) back end for UI and control logic.
- Python with a [Flask](https://flask.palletsprojects.com/en/2.0.x/#) API for image recognition and machine learning.
- [Vercel](https://vercel.com/) used for deployment and various CD/CI features.
- [Hasura](https://hasura.io/) used for database hosting, using a [GraphQL](https://graphql.org/) API.
- [Auth0](https://auth0.com/) used for third-party Authorization.

## Site Link

The currently hosted development version of Sludge Snap can be found [here](#).

## Usage <!-- What do I call this? -->

To start, clone the project using

```
git clone https://github.com/jtallen/sludge-snap.git
```

### Web App Setup

To spin up a local development version of the app, first CD into the web app subdirectory with

```
cd sludge-snap-web-app
```

then install dependencies using

```
npm install
```

finally, spin up local development server using

```
npm run dev
# or
yarn dev
```

And navigate to [http://localhost:3000/](http://localhost:3000/) for local testing.

### Python Server Setup

<!--
django-admin startproject sludge-snap --extension py,yml,json --name Procfile,Dockerfile,README.md,.env.example,.gitignore,Makefile --template=https://github.com/vintasoftware/django-react-boilerplate/archive/boilerplate-release.zip
-->

In order to spin up a local version of the Python back end, first navigate to the correct Python subdirectory from the project root folder:

```
cd sludge-snap-python-api
```

<!-- Potentially necessary:
install your dependencies

```
pip install -r requirements.txt
```
-->

then start your virtual environment

```
python3 -m venv venv
```

next activate it

```
. venv/bin/activate
```

then cd into the virtual environment directory

```
cd venv
```

finally, spin up the local server using

```
flask run
```
