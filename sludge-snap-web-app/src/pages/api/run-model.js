import analyzeUpload from '../../services/analyze-upload';

/*
 * This function calls the Python server to run the model and
 * return predicted characteristics.
 *
 */

export default async function runModel(req, res) {
    console.log('\n\n\nFour\n\n\n');

    const upload = JSON.parse(req.body);
    const analysis = await (
        await fetch(process.env.FLASK_APP_URL + '/run-model', {
            method: 'POST',
            body: JSON.stringify(upload),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
    ).json();

    // Respond to the caller of this function with an HTTP response
    // that has status 200 and body = output, json-ified
    res.status(200).json({ analysis });
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb',
        },
    },
};
