const { hasuraRequest } = require('../../util/hasura');

/*
    This workaround is necessary because of how Hasura handles empty GQL field values
    that are non-nullable + default at the DB level: Instead of just using the default
    value, as expected, the API throws an error.
    TODO: Figure out a cleaner way to do this.
*/
const GQL_DEFINITIONS = {
    title: 'String!',
    ph: 'numeric!',
    notes: 'String = ""',
    image: 'String!',
    user_email: 'String!',
};

async function createUpload(req, res) {
    const { title, pH, notes, image, userEmail } = JSON.parse(req.body);
    console.log({ title, pH, notes, image, userEmail });

    const variables = {
        title,
        ph: pH,
        image,
        user_email: userEmail,
    };
    if (notes) {
        variables.notes = notes;
    }

    const query = buildQuery(variables);

    const data = await hasuraRequest({
        query,
        variables,
    });

    res.status(200).json({ data });
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
                createdAt: created_at
                id
                image
                notes
                title
                pH: ph
            }
        }
    `;
}

exports.createUpload = createUpload;
export default createUpload;
