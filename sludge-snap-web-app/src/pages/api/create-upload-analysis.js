const { hasuraRequest } = require('../../util/hasura');
import { UPLOAD_GQL_DEFINITION } from './create-upload';

const GQL_DEFINITIONS = {
    upload_id: 'Int!',
    cst: 'numeric = -1',
    turbidity: 'numeric = -1',
    ts_dew: 'numeric = -1',
    cod: 'numeric!',
    nh4: 'numeric!',
    ts: 'numeric!',
    vs: 'numeric!',
    toc: 'numeric!',
    tkn: 'numeric!',
    density: 'numeric = -1',
    user_email: 'String!',
};

export const UPLOAD_ANALYSIS_GQL_DEFINITION = `
    id
    cod
    created_at
    cst
    density
    nh4
    tkn
    toc
    ts
    ts_dew
    turbidity
    vs
    upload {
        ${UPLOAD_GQL_DEFINITION}
    }
`;

/*
 * This function uploads the model's predicted characteristics in an analysis object
 * to the analyses table of the database
 *
 * It returns an analysis object with its corresponding upload added to a .upload property
 *
 */

async function createUploadAnalysis(req, res) {
    const { analysis: analysisString, upload } = JSON.parse(req.body);

    const analysis = JSON.parse(analysisString);

    const variables = {
        upload_id: upload.id,
        cst: analysis.CST,
        turbidity: analysis.Turb,
        ts_dew: analysis.TSdew,
        cod: analysis.COD,
        nh4: analysis.NH4,
        ts: analysis.TS,
        vs: analysis.VS,
        toc: analysis.TOC,
        tkn: analysis.TKN,
        density: analysis.Density,
        user_email: upload.userEmail,
    };

    const query = buildQuery(variables);

    const data = await hasuraRequest({
        query,
        variables,
    });

    res.status(200).json({ uploadAnalysis: data.insert_upload_analyses_one });
}

function buildQuery(variables) {
    const varNames = Object.keys(variables);

    // Produces eg '$title: String!, $text: String!'
    const typeDef = varNames
        .map((name) => `$${name}: ${GQL_DEFINITIONS[name]}`)
        .join(', ');

    // Produces eg 'title: $title, text: $text'
    const inputDef = varNames.map((name) => `${name}: $${name}`).join(', ');

    return `
        mutation CreateUploadAnalysis(${typeDef}) {
            insert_upload_analyses_one(object: {${inputDef}}) {
                ${UPLOAD_ANALYSIS_GQL_DEFINITION}
            }
        }
    `;
}

export default createUploadAnalysis;

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb',
        },
    },
};
