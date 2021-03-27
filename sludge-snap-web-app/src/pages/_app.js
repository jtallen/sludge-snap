import '../styles/globals.css';
import NavBar from '../components/NavBar';
import { UserProvider } from '@auth0/nextjs-auth0';

export default function App({ Component, pageProps }) {
    return (
        <UserProvider>
            <div>
                <NavBar />
                <Component {...pageProps} />
            </div>
        </UserProvider>
    );
}
