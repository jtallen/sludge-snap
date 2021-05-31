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

    const onSubmit = (form) => {
        const { image, ...formData } = form;
        const body = JSON.stringify({ ...form });
        console.log({ body });
        setLoading(true);
        requests
            .post('/api/run-model', {
                body,
            })
            .then((response) => {
                return response.json();
            })
            .then(({ analysis }) => {
                // console.log(analysis);
                setLoading(false);
                setAnalysis(analysis);
                window.scrollTo(0, 0);
            });
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
