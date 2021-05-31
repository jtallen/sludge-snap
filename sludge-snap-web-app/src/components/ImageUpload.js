import React from 'react';

export default class ImageUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uploading: false,
            imageInfo: null,
        };
    }

    render() {
        return (
            <div class="flex items-center justify-center bg-grey-lighter mt-4 mb-8 ">
                <label className="w-full mx-10 flex flex-col items-center px-4 py-6 bg-white text-cyan-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-cyan-400 hover:text-white">
                    <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="my-4 text-base text-center leading-normal">
                        {!this.state.imageInfo
                            ? 'Upload an image'
                            : 'Upload a different image'}
                    </span>
                    <input
                        multiple={false}
                        type="file"
                        className="hidden"
                        onChange={(e) => this._upload(e.target.files)}
                    />
                    {this.state.uploading && 'Uploading...'}
                    {!!this.state.imageInfo && (
                        <img src={this.state.imageInfo.base64} />
                    )}
                </label>
            </div>
            // <div className={this.props.className}>
            //

            // </div>
        );
    }

    _upload(files) {
        this.setState({ uploading: true });
        const file = files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let imageInfo = {
                name: file.name,
                type: file.type,
                size: Math.round(file.size / 1000) + ' kB',
                base64: reader.result,
                file: file,
            };
            this.setState({
                uploading: false,
                imageInfo: imageInfo,
            });
            this.props.onUpload(imageInfo);
        };
    }
}
