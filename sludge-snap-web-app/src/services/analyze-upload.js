const STUB_DATA_0 = {
    cst: '345.5',
    turbidity: '167',
    ts_dew: '25.91',
    cod: '51.2',
    nh4: '0.2',
    ts: '1.35',
    vs: '56.46',
    toc: '10.10695187',
    tkn: '1.071',
    density: '.419887',
};

const STUB_DATA_1 = {
    cst: '123.4',
    turbidity: '110',
    ts_dew: '15.78',
    cod: '129.1',
    nh4: '0.8',
    ts: '13.79',
    vs: '57.68',
    toc: '15.72192513',
    tkn: '1.33',
    density: '1.0545',
};

const STUB_DATA_2 = {
    cst: '262.4',
    turbidity: '1027',
    ts_dew: '14.8',
    cod: '132.3',
    nh4: '0.4',
    ts: '18.51',
    vs: '88.7',
    toc: '8.556149733',
    tkn: '1.83',
    density: '1.1515',
};

async function analyzeUpload(upload) {
    if (upload.pH === 5) {
        return STUB_DATA_0;
    } else if (upload.pH === 6) {
        return STUB_DATA_1;
    }

    return STUB_DATA_2;
}

export default analyzeUpload;
