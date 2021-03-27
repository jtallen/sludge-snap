import React from 'react';
import Button from './Button';

export default class UploadForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            pH: '',
            notes: '',
            image: '',
        };
    }

    render() {
        return (
            <div className="max-w-md w-full bg-white p-4">
                {this._renderHeader()}
                {this._renderTitleInput()}
                {this._renderPHInput()}
                {this._renderNotesInput()}
                {this._renderImageInput()}
                {this._renderSubmit()}
            </div>
        );
    }

    _renderHeader() {
        return (
            <div className="flex justify-center">
                <h1 className="text-xl font-semibold mb-4">Upload</h1>
            </div>
        );
    }

    _renderTitleInput() {
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
                    type="text"
                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    value={this.state.pH}
                    onChange={(e) => this.setState({ pH: e.target.value })}
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

    _renderNotesInput() {
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
            <label className="block mb-4">
                <span className="text-gray-700">Image Placeholder</span>
                <input
                    type="text"
                    className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                    value={this.state.image}
                    onChange={(e) => this.setState({ image: e.target.value })}
                />
            </label>
        );
    }

    _renderSubmit() {
        return (
            <Button
                disabled={this._isDisabled()}
                className="w-full"
                onClick={this._submit}
            >
                Upload
            </Button>
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
        return !this.state.title || !this.state.pH || !this.state.image;
    }

    _getFormData() {
        return {
            ...this.state,
        };
    }
}
