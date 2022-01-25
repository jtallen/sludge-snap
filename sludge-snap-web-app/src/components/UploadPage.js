import React, { useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';
import UploadForm from './UploadForm';
import Button from './Button';
import LoadingScreen from './LoadingScreen';
import Loader from './Loader';
import Link from 'next/link';
import requests from '../util/requests';
import { useUser } from '@auth0/nextjs-auth0';

export default function UploadPage(props) {
    const { user, error, isLoading } = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const mainStyles = 'flex justify-center p-4';

    if (isLoading)
        return (
            <div className={mainStyles}>
                <Loader />
            </div>
        );
    if (error) return <div className={mainStyles}>{error.message}</div>;
    if (!user) {
        return (
            <div className={mainStyles}>
                <div className="max-w-md w-full bg-white p-4 shadow-lg">
                    <div className="flex justify-center mt-4 mb-10">
                        <h1 className="font-fancy font-semibold text-5xl">
                            Sludge Snap
                        </h1>
                    </div>
                    <div className="flex justify-center mb-4">
                        <h2>Log in to save your upload analysis</h2>
                    </div>
                    <div className="flex justify-center mb-4">
                        <Link href="/api/auth/login">
                            <Button className="w-64">Login</Button>
                        </Link>
                    </div>
                    <div className="flex justify-center mb-4">
                        <h2>Or</h2>
                    </div>
                    <div className="flex justify-center mb-12">
                        <Link href="/anonymous-upload">
                            <Button className="w-64" transparent>
                                Upload without Saving
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // console.log(user);

    // callback for pressing "submit" on upload form
    // processes upload: posts inputs to db, runs ml model, posts analysis to db, returns db analysis id
    // if all is successful, routes user to analysis page
    const onSubmit = (formData) => {
        setLoading(true);
        requests
            .post('/api/process-upload', {
                body: JSON.stringify({ ...formData, userEmail: user.email }),
            })
            .then((response) => response.json())
            .then(({ uploadAnalysis }) => {
                console.log('\n\n\nNine\n\n\n');

                setLoading(false);
                router.push(`/upload-analyses/${uploadAnalysis.id}`);
            });
    };

    return (
        <div
            className={cn(
                'flex flex-col justify-center items-center min-h-screen',
                { 'pointer-events-none': loading }
            )}
        >
            <UploadForm onSubmit={onSubmit} />
            <a
                className="mt-4 text-purple-400 hover:text-purple-700 transition-all"
                href="/api/auth/logout"
            >
                Logout
            </a>
            {loading && <LoadingScreen />}
        </div>
    );
}
