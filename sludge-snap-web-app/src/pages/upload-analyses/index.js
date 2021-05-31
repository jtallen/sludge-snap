import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import UploadAnalysesIndexPage from '../../components/UploadAnalysesIndexPage';
import Loader from '../../components/Loader';

export default function UploadAnalysesIndex() {
    const { user, error, isLoading } = useUser();
    const router = useRouter();

    // Redirect if not auth'd
    useEffect(() => {
        if (!(user || isLoading)) {
            router.push('/');
        }
    }, [user, isLoading]);

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <Loader />
            </div>
        );
    }

    return <UploadAnalysesIndexPage user={user} />;
}
