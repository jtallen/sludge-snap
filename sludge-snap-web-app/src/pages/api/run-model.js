import analyzeUpload from '../../services/analyze-upload';

export default async function runModel(req, res) {
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

    res.status(200).json({ analysis });
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb',
        },
    },
};
