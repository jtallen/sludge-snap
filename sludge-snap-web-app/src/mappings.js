// used to handle naming transitions between front-end, database, and back-end

// Client-side only
// Display values

// Server-side
// DB values == values coming back from your front end
// Model values

const DB_TO_MODEL_VALUES_MAP = {
    ph: 'pH',
};

const MODEL_TO_DB_VALUES_MAP = {};
Object.keys(DB_TO_MODEL_VALUES_MAP).forEach((key) => {
    MODEL_TO_DB_VALUES_MAP[DB_TO_MODEL_VALUES_MAP[key]] = key;
});

// Get the model value for a db value:
const modelValue = DB_TO_MODEL_VALUES_MAP['ph'];

// Get the db value for a model value:
const dbValue = MODEL_TO_DB_VALUES_MAP['pH'];
