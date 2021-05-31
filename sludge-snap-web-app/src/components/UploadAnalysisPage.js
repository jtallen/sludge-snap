import React from 'react';
import { withRouter } from 'next/router';
import AnalysisView from './AnalysisView';
import requests from '../util/requests';
import Loader from './Loader';

class UploadAnalysisPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            uploadAnalysis: null,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        requests
            .get(`/api/upload-analyses/${this.props.id}`)
            .then((res) => res.json())
            .then(({ uploadAnalysis }) => {
                console.log({ uploadAnalysis });
                this.setState({ uploadAnalysis, loading: false });
            });
    }

    render() {
        const { uploadAnalysis, loading } = this.state;

        if (loading) {
            return (
                <div className="flex flex-col items-center mt-4 min-h-screen">
                    <div className="text-xl font-semibold flex items-center">
                        <Loader>Retrieving analysis data...</Loader>
                    </div>
                </div>
            );
        }

        if (!uploadAnalysis) return null;

        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <AnalysisView
                    analysis={uploadAnalysis}
                    onUploadNew={() => this.props.router.push('/upload')}
                />
            </div>
        );
    }
}

export default withRouter(UploadAnalysisPage);
