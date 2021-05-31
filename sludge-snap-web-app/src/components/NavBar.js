import Link from 'next/link';
import Button from './Button';
import { Cloud, CloudUpload, Table } from './icons/outline';
import { useUser } from '@auth0/nextjs-auth0';

export default function NavBar() {
    const { user, error, isLoading } = useUser();
    return (
        <nav className="flex justify-between border-b-2 p-2 w-screen bg-gray-50">
            <div className="flex-grow-0 w-12">
                <Link href="/">
                    <Button icon transparent theme="primaryLight">
                        <CloudUpload />
                    </Button>
                </Link>
            </div>
            <div className="flex-grow font-fancy text-xl text-center text-gray-400">
                Sludge Snap
            </div>
            <div className="flex-grow-0 w-12">
                {!!user && (
                    <Link href="/upload-analyses">
                        <Button icon transparent theme="primaryLight">
                            <Table />
                        </Button>
                    </Link>
                )}
            </div>
        </nav>
    );
}
