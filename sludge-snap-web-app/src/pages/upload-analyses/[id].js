import React from 'react';
import { useRouter } from 'next/router';
import UploadAnalysisPage from '../../components/UploadAnalysisPage';
import Loader from '../../components/Loader';

export default function UploadAnalysis() {
    const router = useRouter();
    const { id } = router.query;

    if (id) {
        return <UploadAnalysisPage id={id} />;
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <Loader />
        </div>
    );
}
