# Sludge Snap

⇒ [Live Site](https://sludge-snap-web-app.vercel.app/){:target="\_blank"}

Sludge Snap is a mobile-first web app that uses realtime image recognition and machine learning in order to provide characterizations for sludge samples collected in the field by sanitation workers.

Developed for the Swiss Federal Institute of Aquatic Science and Technology ([eawag](https://www.eawag.ch/en/) for short).

## File Structure

This app is divided between two subdirectories. One folder containing the React front end and Node back end, and one folder containing the Python back end. I chose this separation in order to facilitate tailored provisioning for each service, since the resources required for each are significantly different.

If run locally, they must both be spun up separately, using the instructions provided at the bottom of this README.

## Tech Stack

- React front end using the [NextJS](https://nextjs.org/) framework.
- [Tailwind CSS](https://tailwindcss.com/) for styling.
- Serverless [Node](https://nodejs.org/en/about/) back end for control logic.
- Separate Python + [Flask](https://flask.palletsprojects.com/en/2.0.x/#) API to run image recognition and machine learning model.
- [Vercel](https://vercel.com/) for deployment and various CD/CI features.
- [Hasura](https://hasura.io/) for database hosting and [GraphQL](https://graphql.org/) API.
- [Auth0](https://auth0.com/) for third-party Authorization.

## Site Link

The currently hosted development version of Sludge Snap can be found [here](https://sludge-snap-web-app.vercel.app/).

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

set environment variables

```
export FLASK_APP=index.py
```

set environment to development

```
export FLASK_ENV=development
```

finally, spin up the local server using

```
flask run
```

## Collaborators

This app was developed by Turner Allen with support from Devin Sivick, Kimberley Yu, Brandon Sun, and Andres Escamilla. It was built in collaboration with and from specifications provided by the eawag.

## Questions

This project is no longer under active development. If you have any questions, please feel free to reach out to me at jturnerallen at gmail. Thanks!
