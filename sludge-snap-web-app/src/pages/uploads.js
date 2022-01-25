import React from 'react';
import { useRouter } from 'next/router';
// import UploadList from '../components/UploadList';
import Button from '../components/Button';
import Link from 'next/link';
import requests from '../util/requests';
import { useUser } from '@auth0/nextjs-auth0';

export default function Upload() {
    const { user, error, isLoading } = useUser();
    const router = useRouter();

    const mainStyles = 'flex justify-center p-4';

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    if (!user) {
        return (
            <div className={mainStyles}>
                <Link href="/api/auth/login">
                    <Button>Login</Button>
                </Link>
            </div>
        );
    }

    // console.log(user);

    const onSubmit = (formData) =>
        requests
            .post('/api/create-upload', {
                body: JSON.stringify({ ...formData, userEmail: user.email }),
            })
            .then((response) => {
                alert('Uploaded!!');

                return response.json();
                // router.push('/');
            })
            .then((upload) => {
                // console.log(upload);
                return requests.get('/api/analyze');
            })
            .then((data) => {
                // console.log(data);
            });

    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <UploadForm onSubmit={onSubmit} />
            <a
                className="mt-4 text-purple-400 hover:text-purple-700 transition-all"
                href="/api/auth/logout"
            >
                Logout
            </a>
        </div>
    );
}
