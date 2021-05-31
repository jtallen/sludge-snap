import Loader from './Loader';

export default function LoadingScreen() {
    return (
        <div className="fixed top-0 bottom-0 right-0 left-0 bg-black opacity-60 flex justify-center items-center pointer-events-none">
            <div className="text-white text-xl font-semibold flex items-center">
                <Loader>Processing upload...</Loader>
            </div>
        </div>
    );
}
