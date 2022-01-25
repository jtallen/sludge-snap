import React, { useState } from 'react';
import { useRouter } from 'next/router';
import UploadForm from '../components/UploadForm';
import AnalysisView from '../components/AnalysisView';
import LoadingScreen from '../components/LoadingScreen';
import requests from '../util/requests';

export default function AnonymousUpload() {
    const router = useRouter();

    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (form) => {
        const { image, ...formData } = form;
        const body = JSON.stringify({ ...form });
        // console.log({ body });
        setLoading(true);
        // console.log({ body });

        const analysisResponse = await requests.post('/api/run-model', {
            body,
        });

        const { analysis: analysisString } = await analysisResponse.json();

        const oldAnalysis = JSON.parse(analysisString);

        // hacky way of swapping property names
        // TODO: move into mapping function
        const analysis = {
            cod: Number(oldAnalysis.COD),
            cst: Number(oldAnalysis.CST),
            density: Number(oldAnalysis.Density),
            nh4: Number(oldAnalysis.NH4),
            tkn: Number(oldAnalysis.TKN),
            toc: Number(oldAnalysis.TOC),
            ts: Number(oldAnalysis.TS),
            ts_dew: Number(oldAnalysis.TSdew),
            turbidity: Number(oldAnalysis.Turb),
            vs: Number(oldAnalysis.VS),
        };

        analysis.upload = form;

        setLoading(false);
        setAnalysis(analysis);
        window.scrollTo(0, 0);
    };

    if (analysis) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <AnalysisView
                    analysis={analysis}
                    onUploadNew={() => setAnalysis(null)}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <UploadForm onSubmit={onSubmit} isAnonymous={true} />
            {loading && <LoadingScreen />}
        </div>
    );
}
