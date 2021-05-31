import React from 'react';
import Button from './Button';
import Link from 'next/link';
import ImageUpload from './ImageUpload';

const CONTAINMENT_TYPE_OPTIONS = ['', 'Septic tank', 'Pit latrine'];
const TOILET_TYPE_OPTIONS = ['', 'Wet', 'Dry'];
const SOURCE_OPTIONS = ['', 'Household', 'Non-household'];

// Odor must be capitalized, color must be lower case
const ODOR_OPTIONS = ['', 'Fresh', 'Middle', 'Stabilized'];
const COLOR_OPTIONS = ['', 'Fresh', 'Middle', 'Stabilized'];

export default class UploadForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '', // required
            pH: '', // required
            EC: '', // required
            notes: '',
            image: '', // required
            foamHeight: '', // required
            containmentType: '', // dropdown
            toiletType: '', // dropdown
            waterConnection: false, // checkbox
            source: '', // dropdown
            odor: '',
            color: '',
        };
    }

    render() {
        return (
            <div className="max-w-md w-full bg-white p-4">
                {this._renderHeader()}
                {this._renderAnonymousWarning()}
                {this._renderImageInput()}
                {this._renderTitleInput()}
                {this._renderPHInput()}
                {this._renderECInput()}
                {this._renderFoamHeightInput()}
                {this._renderContainmentTypeInput()}
                {this._renderToiletTypeInput()}
                {this._renderWaterConnectionInput()}
                {this._renderSourceInput()}
                {this._renderOdorInput()}
                {this._renderColorInput()}
                {this._renderNotesInput()}
                {this._renderSubmit()}
            </div>
        );
    }

    _renderHeader() {
        return (
            <div className="flex justify-center">
                <h1 className="text-2xl font-semibold mb-4">Upload</h1>
            </div>
        );
    }

    _renderAnonymousWarning() {
        if (!this.props.isAnonymous) return;

        return (
            <div
                className="bg-blue-100 border rounded border-blue-500 text-blue-700 px-4 py-3 mb-8 relative"
                role="alert"
            >
                <p className="font-bold">You are not logged in.</p>
                <p class="text-sm">
                    If you wish to save your data, please&nbsp;
                    <Link href="/api/auth/login">
                        <a className=" underline">log in.</a>
                    </Link>
                </p>
                {/* <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg
                        className="fill-current h-6 w-6 text-red-500"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <title>Close</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                </span> */}
            </div>
        );
    }

    _renderTitleInput() {
        if (this.props.isAnonymous) return;

        return (
            <label className="block mb-4">
                <span className="text-gray-700">Sample Name</span>
                <input
                    type="text"
                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    value={this.state.title}
                    onChange={(e) => this.setState({ title: e.target.value })}
                />
            </label>
        );
    }

    _renderPHInput() {
        return (
            <label className="block mb-4">
                <span className="text-gray-700">pH</span>
                <input
                    type="number"
                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    value={this.state.pH}
                    onChange={(e) => this.setState({ pH: e.target.value })}
                />
            </label>
        );
    }

    _renderECInput() {
        return (
            <label className="block mb-4">
                <span className="text-gray-700">Electrical Conductivity</span>
                <input
                    type="number"
                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    value={this.state.EC}
                    onChange={(e) => this.setState({ EC: e.target.value })}
                />
            </label>
        );
    }

    _renderFoamHeightInput() {
        return (
            <label className="block mb-4">
                <span className="text-gray-700">Foam Height</span>
                <input
                    type="number"
                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    value={this.state.foamHeight}
                    onChange={(e) =>
                        this.setState({ foamHeight: e.target.value })
                    }
                />
            </label>
        );
    }

    // _renderTypeInput() {
    //     return (
    //         <label className="block mb-4">
    //             <span className="text-gray-700">Type</span>
    //             <select
    //                 className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
    //                 value={this.state.type}
    //                 onChange={(e) => this.setState({ type: e.target.value })}
    //             >
    //                 {TYPE_OPTIONS.map((value, i) => (
    //                     <option key={i} value={value}>
    //                         {toTitleCase(value)}
    //                     </option>
    //                 ))}
    //             </select>
    //         </label>
    //     );
    // }

    _renderContainmentTypeInput() {
        return (
            <label className="block mb-4">
                <span className="text-gray-700">Containment Type</span>
                <select
                    class="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-0"
                    value={this.state.containmentType}
                    onChange={(e) =>
                        this.setState({ containmentType: e.target.value })
                    }
                >
                    {CONTAINMENT_TYPE_OPTIONS.map((type, i) => (
                        <option key={i} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </label>
        );
    }

    _renderToiletTypeInput() {
        return (
            <label className="block mb-4">
                <span className="text-gray-700">Toilet Type</span>
                <select
                    class="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-0"
                    value={this.state.toiletType}
                    onChange={(e) =>
                        this.setState({ toiletType: e.target.value })
                    }
                >
                    {TOILET_TYPE_OPTIONS.map((type, i) => (
                        <option key={i} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </label>
        );
    }

    _renderWaterConnectionInput() {
        return (
            // <label className="flex items-center">
            //     <input type="checkbox" className="form-checkbox" />
            //     <span className="ml-2">
            //         I agree to the{' '}
            //         <span className="underline">privacy policy</span>
            //     </span>
            // </label>
            <label className="flex items-center my-8">
                <input
                    type="checkbox"
                    className="form-checkbox focus:ring-0"
                    value={this.state.waterConnection}
                    onChange={(e) =>
                        this.setState({ waterConnection: e.target.checked })
                    }
                />
                <span className="ml-2 text-gray-700">Water Connection?</span>
            </label>
        );
    }

    _renderSourceInput() {
        return (
            <label className="block mb-4">
                <span className="text-gray-700">Source</span>
                <select
                    class="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-0"
                    value={this.state.source}
                    onChange={(e) => this.setState({ source: e.target.value })}
                >
                    {SOURCE_OPTIONS.map((type, i) => (
                        <option key={i} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </label>
        );
    }

    _renderOdorInput() {
        return (
            <label className="block mb-4">
                <span className="text-gray-700">Odor</span>
                <select
                    class="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-0"
                    value={this.state.odor}
                    onChange={(e) => this.setState({ odor: e.target.value })}
                >
                    {ODOR_OPTIONS.map((type, i) => (
                        <option key={i} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </label>
        );
    }

    _renderColorInput() {
        return (
            <label className="block mb-4">
                <span className="text-gray-700">Color</span>
                <select
                    class="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-0"
                    value={this.state.color}
                    onChange={(e) => this.setState({ color: e.target.value })}
                >
                    {COLOR_OPTIONS.map((type, i) => (
                        <option key={i} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </label>
        );
    }

    _renderNotesInput() {
        if (this.props.isAnonymous) return;

        return (
            <label className="block mb-8">
                <span className="text-gray-700">Field Notes</span>
                <textarea
                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    rows="3"
                    value={this.state.notes}
                    onChange={(e) => this.setState({ notes: e.target.value })}
                />
            </label>
        );
    }

    _renderImageInput() {
        return (
            <ImageUpload
                onUpload={(imageInfo) =>
                    this.setState({ image: imageInfo.base64 })
                }
            />
            // <label className="block mb-4">
            //     <span className="text-gray-700">Image Placeholder</span>
            //     <input
            //         type="file"
            //         className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            //         value={this.state.image}
            //         onChange={(e) => this.setState({ image: e.target.value })}
            //     />
            // </label>
        );
    }

    _renderSubmit() {
        return (
            <div className="pt-6 px-4">
                <Button
                    disabled={this._isDisabled()}
                    className="w-full"
                    onClick={this._submit}
                >
                    Upload
                </Button>
            </div>
        );
    }

    // actions

    _submit = () => {
        if (this._isDisabled()) {
            return;
        }

        this.props.onSubmit(this._getFormData());
    };

    // helpers

    _isDisabled() {
        if (this.props.isAnonymous) {
            return !this.state.pH || !this.state.image;
        }

        return !this.state.title || !this.state.pH || !this.state.image;
    }

    // convert front-end/display keys and values to back-end keys and values
    _getFormData() {
        console.log('_getFormData(): ' + this.state);
        return {
            title: this.state.title,
            notes: this.state.notes,
            ec: Number(this.state.EC),
            ph: Number(this.state.pH),
            foam_height: Number(this.state.foamHeight),
            oss_type_simplified: this.state.containmentType,
            toilet_type_simplified: this.state.toiletType.toLowerCase(),
            water_connection: this.state.waterConnection == true ? 'Yes' : 'No',
            origin_simplified: this.state.source,
            oder_before: this.state.odor,
            bulk_color: this.state.color.toLowerCase(),
            image: this.state.image,
        };
    }
}
