import { UPLOAD_ANALYSIS_GQL_DEFINITION } from '../create-upload-analysis';

const { hasuraRequest } = require('../../../util/hasura');

async function getUploadAnalyses(req, res) {
    const { email } = req.query;
    console.log({ email });

    const query = `
        query GetUploadAnalyses($user_email: String!) {
            upload_analyses(where: {user_email: {_eq: $user_email}}) {
                id
                upload {
                    id
                    title
                    createdAt: created_at
                }
            }
        }
    `;

    const data = await hasuraRequest({
        query,
        variables: { user_email: email },
    });

    res.status(200).json({ uploadAnalyses: data.upload_analyses });
}

export default getUploadAnalyses;
