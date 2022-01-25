import React from 'react';
import Link from 'next/link';
import Button from './Button';

const TEXT_FIELD_NAMES = [
    'cst',
    'turbidity',
    'ts_dew',
    'cod',
    'nh4',
    'ts',
    'vs',
    'toc',
    'tkn',
    'density',
];

// potentially move this to consts file
// TODO: Add units for invalid fields
const TEXT_FIELD_UNITS = {
    COD: 'g/L',
    'NH4-N': 'g/L',
    TS: '% dry solids',
    VS: '% of total solids',
};

const TEXT_FIELD_PROPER_NAMES = {
    cod: 'COD',
    nh4: 'NH4-N',
    ts: 'TS',
    vs: 'VS',
    toc: 'TOC',
    tkn: 'TKN',
};

const IMAGE_FIELD_NAME = 'image';

export default class AnalysisView extends React.Component {
    render() {
        return (
            <div className="max-w-md w-full bg-white p-4 ">
                {this._renderHeader()}
                {this._renderSeparator()}
                {this._renderSubheader('Uploaded Image')}
                {this._renderImage()}
                {this._renderSeparator()}
                {this._renderSubheader('Predicted Characteristics')}
                {this._renderAnalysis()}
                {this._renderSeparator()}
                {this._renderUploadNewButton()}
            </div>
        );
    }

    _renderHeader() {
        return (
            <div className="flex justify-center mb-2">
                <h1 className="text-xl font-semibold">Analysis</h1>
            </div>
        );
    }

    _renderSeparator() {
        return <div className="my-6 border border-gray-200" />;
    }

    _renderSubheader(text) {
        return (
            <div className="px-4 my-2">
                <h2 className="text-md font-semibold text-gray-500">{text}</h2>
            </div>
        );
    }

    _renderImage() {
        if (!this.props.analysis.upload) return;
        const image = this.props.analysis.upload[IMAGE_FIELD_NAME];
        if (!image) return;
        // console.log(image);

        return (
            <div className="shadow-lg ring-1 ring-black ring-opacity-5 rounded mx-4">
                <img className="w-full" objectFit="contain" src={image} />
            </div>
        );
    }

    _renderAnalysis() {
        return (
            <div className="">
                <dl>{TEXT_FIELD_NAMES.map(this._renderTextField)}</dl>
            </div>
        );
    }

    _renderTextField = (name, i) => {
        const bgColor = (i + 1) % 2 == 0 ? 'bg-gray-50' : 'bg-white'; // Zebra stripes
        const label = this._formatLabel(name);

        // strip invalid values
        if (this.props.analysis[name] == -1) return;

        return (
            <div className={`${bgColor} px-4 py-2 grid grid-cols-3 gap-4`}>
                <dt className="text-sm font-medium text-gray-600">{label}</dt>
                <dd className="text-sm mt-1 col-span-2">
                    {Math.round(this.props.analysis[name] * 100) / 100}{' '}
                    {TEXT_FIELD_UNITS[label]}
                </dd>
            </div>
        );
    };

    _renderUploadNewButton() {
        return (
            <div className="flex justify-center">
                <Button onClick={this.props.onUploadNew}>Upload New</Button>
            </div>
        );
    }

    // helpers

    _formatLabel(name) {
        if (TEXT_FIELD_PROPER_NAMES[name] != null)
            return TEXT_FIELD_PROPER_NAMES[name];
        return name.replace('_', ' ');
        // .replace(
        //     /\b\w+/g,
        //     (txt) =>
        //         txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        // );
    }
}
