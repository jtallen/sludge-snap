import Link from 'next/link';
import Button from './Button';
import { Home, CloudUpload } from './icons/outline';

export default function NavBar() {
    return (
        <nav className="flex justify-between border-b-2 p-2 w-screen bg-gray-50">
            <Link href="/">
                <Button icon transparent theme="primaryLight">
                    <Home />
                </Button>
            </Link>
            <Link href="/upload">
                <Button icon transparent theme="primaryLight">
                    <CloudUpload />
                </Button>
            </Link>
        </nav>
    );
}
