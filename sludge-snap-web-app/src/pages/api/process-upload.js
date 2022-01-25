import requests from '../../util/requests';

/*
 * Controller function that makes several API calls after a user submits an upload
 * this function stores the user's submitted upload to the Uploads db table
 * then sends their upload to the python server for processing
 * then stores the returned analysis in the Analyses db table
 *
 */

export default async function processUpload(req, res) {
    console.log('\n\n\nOne\n\n\n');
    const uploadInput = JSON.parse(req.body);

    // const postCBFcn = (response) => {
    //     const jsonPromiseWrappingParsingOfTheJSONString = response.json();
    //     return jsonPromiseWrappingParsingOfTheJSONString;
    // };

    // requests
    //     .post('/api/create-upload', {})
    //     .then(postCBFcn)
    //     .then((literallyTheJSONStringValueFromTheResolvedPromise) => {
    //         upload = json.upload;

    //         requests
    //             .post('/api/run-model', {
    //                 body: JSON.stringify(upload),
    //             })
    //             .then((response) => {
    //                 const json = response.json();
    //                 return json;
    //             })
    //             .then((json) => {
    //                 analysis = json.analysis;

    //                 requests
    //                     .post('/api/create-upload-analysis', {
    //                         body: JSON.stringify({ analysis, upload }),
    //                     })
    //                     .then((response) => {
    //                         const json = response.json();
    //                         return json;
    //                     })
    //                     .then((json) => {
    //                         const uploadAnalysis = json.uploadAnalysis;
    //                         return res.status(200).json({ uploadAnalysis });
    //                     });
    //             });
    //     });

    // API call to store upload information on db
    const uploadResponse = await requests.post('/api/create-upload', {
        body: JSON.stringify(uploadInput),
    });
    const { upload } = await uploadResponse.json();
    // console.log("\n\n\t\tCalled '/api/create-upload'");

    // call to python server to run model and return analysis
    const analysisResponse = await requests.post('/api/run-model', {
        body: JSON.stringify(upload),
    });

    // creates a variable analysis with value equal to the property 'analysis' of the object
    // that gets returned from the promise on the right side of the assignment
    const { analysis } = await analysisResponse.json();

    // add: function to check what comes from the server and make it db-friendly

    // stores returned analysis information
    const uploadAnalysisResponse = await requests.post(
        '/api/create-upload-analysis',
        {
            body: JSON.stringify({ analysis, upload }),
        }
    );
    const { uploadAnalysis } = await uploadAnalysisResponse.json();
    // console.log("\n\n\t\tCalled '/api/create-upload-analysis'");

    res.status(200).json({ uploadAnalysis });
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb',
        },
    },
};

// calls createUpload - creates upload in db, calls runModel
// runModel - runs model on the upload,
// persist analysis to db, return analysis
