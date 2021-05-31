import { UPLOAD_ANALYSIS_GQL_DEFINITION } from '../create-upload-analysis';

const { hasuraRequest } = require('../../../util/hasura');

async function getUploadAnalysis(req, res) {
    const { id } = req.query;
    console.log({ id });

    const query = `
        query GetUploadAnalysis($id: Int!) {
            upload_analyses_by_pk(id: $id) {
                ${UPLOAD_ANALYSIS_GQL_DEFINITION}
            }
        }
    `;

    const data = await hasuraRequest({
        query,
        variables: { id: Number(id) },
    });

    res.status(200).json({ uploadAnalysis: data.upload_analyses_by_pk });
}

export default getUploadAnalysis;

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb',
        },
    },
};
