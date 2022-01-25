const { hasuraRequest } = require('../../util/hasura');

/*
 * This function adds the users input to the uploads table of the database
 * Using GraphQL format
 *
 */

const GQL_DEFINITIONS = {
    title: 'String!',
    ph: 'numeric!',
    notes: 'String = ""',
    image: 'String!',
    user_email: 'String!',
    ec: 'numeric!',
    foam_height: 'numeric = 0',
    oss_type_simplified: 'String = ""',
    toilet_type_simplified: 'String = ""',
    water_connection: 'String = ""',
    origin_simplified: 'String = ""',
    oder_before: 'String = ""',
    bulk_color: 'String = ""',
};

export const UPLOAD_GQL_DEFINITION = `
    createdAt: created_at
    id
    image
    notes
    title
    ph
    userEmail: user_email
    ec
    foam_height
    oss_type_simplified
    toilet_type_simplified
    water_connection
    origin_simplified
    oder_before
    bulk_color
`;

async function createUpload(req, res) {
    console.log('\n\n\nTwo\n\n\n');

    const {
        title,
        ph,
        notes,
        image,
        userEmail,
        ec,
        foam_height,
        oss_type_simplified,
        toilet_type_simplified,
        water_connection,
        origin_simplified,
        oder_before,
        bulk_color,
    } = JSON.parse(req.body);

    const variables = {
        title,
        ph,
        notes,
        image,
        user_email: userEmail,
        ec,
        foam_height,
        oss_type_simplified,
        toilet_type_simplified,
        water_connection,
        origin_simplified,
        oder_before,
        bulk_color,
    };

    const query = buildQuery(variables);

    console.log('\n\n\nThree\n\n\n');

    const data = await hasuraRequest({
        query,
        variables,
    });

    res.status(200).json({ upload: data.insert_uploads_one });
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
        mutation CreateUpload(${typeDef}) {
            insert_uploads_one(object: {${inputDef}}) {
                ${UPLOAD_GQL_DEFINITION}
            }
        }
    `;
}

exports.createUpload = createUpload;
export default createUpload;

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb',
        },
    },
};
