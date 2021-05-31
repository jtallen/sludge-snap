import React from 'react';
import { withRouter } from 'next/router';
import moment from 'moment';
import Link from 'next/link';
import requests from '../util/requests';
import { ExternalLink } from './icons/outline';
import Loader from './Loader';

const HEADER_NAMES = ['Title', 'Created'];

class UploadAnalysesIndexPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            uploadAnalyses: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });
        requests
            .get(`/api/upload-analyses?email=${this.props.user.email}`) // Super insecure - fix after demo
            .then((res) => res.json())
            .then(({ uploadAnalyses }) => {
                console.log({ uploadAnalyses });
                this.setState({ uploadAnalyses, loading: false });
            });
    }

    render() {
        return (
            <div className="flex flex-col items-center min-h-screen">
                <div className="max-w-md w-full bg-white pt-4 flex flex-col items-center min-h-screen">
                    {this._renderHeader()}
                    {this.state.loading
                        ? this._renderLoading()
                        : this._renderList()}
                </div>
            </div>
        );
    }

    _renderHeader() {
        return <h1 className="text-xl font-semibold mb-4">Upload Analyses</h1>;
    }

    _renderLoading() {
        return (
            <div className="p-4">
                <Loader />
            </div>
        );
    }

    _renderList() {
        return (
            <table className="min-w-full min-h divide-y divide-gray-200 border-b border-gray-200">
                {this._renderListHeader()}
                <tbody className="bg-white divide-y divide-gray-200">
                    {this.state.uploadAnalyses.map(
                        this._renderUploadAnalysisRow
                    )}
                </tbody>
            </table>
        );
    }

    _renderListHeader() {
        return (
            <thead className="bg-gray-50">
                <tr>
                    {HEADER_NAMES.map((name) => (
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            {name}
                        </th>
                    ))}
                    <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">View</span>
                    </th>
                </tr>
            </thead>
        );
    }

    _renderUploadAnalysisRow = (uploadAnalysis, i) => {
        return (
            <Link href={`/upload-analyses/${uploadAnalysis.id}`}>
                <tr className="group cursor-pointer transition bg-white hover:bg-cyan-50">
                    <td className="px-6 py-4">
                        <div className="text-sm font-medium transition text-gray-900">
                            {uploadAnalysis.upload.title}
                        </div>
                    </td>
                    <td className="px-6 py-4 text-sm transition text-gray-500">
                        {moment(uploadAnalysis.upload.createdAt).format('LL')}
                    </td>
                    <td className="px-6 py-4 ">
                        <ExternalLink className="w-4 h-4 transition text-indigo-400 group-hover:text-indigo-600" />
                    </td>
                </tr>
            </Link>
        );
    };
}

export default withRouter(UploadAnalysesIndexPage);
