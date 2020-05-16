import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { clamp } from "../utils/utlity";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            textArray {
                text
                color 
                fontSize
                x
                y
            }
            backgroundColor
            borderColor
            borderWidth
            borderRadius
            padding
            margin
            height
            width
            imageArray {
                image
                imageHeight
                imageWidth
                imageX
                imageY
            }
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $textArray: [textArrayInput]!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderWidth: Int!,
        $borderRadius: Int!,
        $padding: Int!,
        $margin: Int!,
        $height: Int!,
        $width: Int!,
        $imageArray: [imageArrayInput]!) {
            updateLogo(
                id: $id,
                textArray: $textArray,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderWidth: $borderWidth,
                borderRadius: $borderRadius,
                padding: $padding,
                margin: $margin,
                height: $height,
                width: $width,
                imageArray: $imageArray) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            renderText: "",
            renderColor: "",
            renderBackgroundColor: "",
            renderBorderColor: "",
            renderBorderWidth: "",
            renderBorderRadius: "",
            renderFontSize: "",
            renderPadding: "",
            renderMargin: "",
            renderHeight: "",
            renderWidth: "",
            buttonDisabled: false,
            errorMessage: "",
            fontSizeMessage: "",
            borderRadiusMessage: "",
            borderWidthMessage: "",
            paddingMessage: "",
            marginMessage: "",
            heightMessage: "",
            widthMessage: ""
        }
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderWidth, borderRadius, padding, margin, height, width;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="panel-body row">
                                            <form className="col-6" onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({
                                                    variables: {
                                                        id: data.logo._id, text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
                                                        backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderWidth:
                                                            parseInt(borderWidth.value), borderRadius: parseInt(borderRadius.value), padding: parseInt(padding.value),
                                                        margin: parseInt(margin.value), height: parseInt(height.value), width: parseInt(width.value)
                                                    }
                                                });
                                                text.value = "";
                                                color.value = "";
                                                fontSize.value = "";
                                                backgroundColor.value = "";
                                                borderColor.value = "";
                                                borderWidth.value = "";
                                                borderRadius.value = "";
                                                padding.value = "";
                                                margin.value = "";
                                                height.value = "";
                                                width.value = "";
                                            }}>
                                                <div className="form-group col-8">
                                                    <label htmlFor="text">Text:</label>
                                                    <input type="text" className="form-control" name="text" ref={node => {
                                                        text = node;
                                                    }} onChange={() => text.value.trim().length < 1 ? this.setState({ buttonDisabled: true, errorMessage: "Text cannot be empty", renderText: text.value })
                                                        : this.setState({ renderText: text.value, buttonDisabled: false, errorMessage: "" })} placeholder="Text" defaultValue={data.logo.text} />
                                                    <p style={{ color: 'red' }}>
                                                        {this.state.errorMessage}
                                                    </p>
                                                </div>
                                                <div className="form-group col-4">
                                                    <label htmlFor="color">Color:</label>
                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                        color = node;
                                                    }} onChange={() => this.setState({ renderColor: color.value })} placeholder="Color" defaultValue={data.logo.color} />
                                                </div>
                                                <div className="form-group col-4">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} onChange={() => this.setState({ renderBackgroundColor: backgroundColor.value })} placeholder="Background Color" defaultValue={data.logo.backgroundColor} />
                                                </div>
                                                <div className="form-group col-4">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} onChange={() => this.setState({ renderBorderColor: borderColor.value })} placeholder="Color" defaultValue={data.logo.borderColor} />
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="text" onInput={() => { fontSize.value = clamp(fontSize.value, 0, 144); }} className="form-control" name="fontSize" ref={node => {
                                                        fontSize = node;
                                                    }} onChange={() => fontSize.value.trim().length < 1 ? this.setState({ renderFontSize: parseInt(fontSize.value), buttonDisabled: true, fontSizeMessage: "Font Size cannot be empty" })
                                                        : this.setState({ renderFontSize: parseInt(fontSize.value), buttonDisabled: false, fontSizeMessage: "" })} placeholder="Font Size" defaultValue={data.logo.fontSize} />
                                                    <p style={{ color: 'red' }}>
                                                        {this.state.fontSizeMessage}
                                                    </p>
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                    <input type="number" onInput={() => { borderWidth.value = clamp(borderWidth.value, 0, 100); }} className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} onChange={() => borderWidth.value.trim().length < 1 ? this.setState({ renderBorderWidth: parseInt(borderWidth.value), buttonDisabled: true, borderWidthMessage: "Border Width cannot be empty" })
                                                        : this.setState({ renderBorderWidth: parseInt(borderWidth.value), buttonDisabled: false, borderWidthMessage: "" })} placeholder="Border Width" defaultValue={data.logo.borderWidth} />
                                                    <p style={{ color: 'red' }}>
                                                        {this.state.borderWidthMessage}
                                                    </p>
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="number" onInput={() => { borderRadius.value = clamp(borderRadius.value, 0, 100); }} className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} onChange={() => borderRadius.value.trim().length < 1 ? this.setState({ renderBorderRadius: parseInt(borderRadius.value), buttonDisabled: true, borderRadiusMessage: "Border Radius cannot be empty" })
                                                        : this.setState({ renderBorderRadius: parseInt(borderRadius.value), buttonDisabled: false, borderRadiusMessage: "" })} placeholder="Border Radius" defaultValue={data.logo.borderRadius} />
                                                    <p style={{ color: 'red' }}>
                                                        {this.state.borderRadiusMessage}
                                                    </p>
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="number" onInput={() => { padding.value = clamp(padding.value, 0, 100); }} className="form-control" name="padding" ref={node => {
                                                        padding = node;
                                                    }} onChange={() => padding.value.trim().length < 1 ? this.setState({ renderPadding: parseInt(padding.value), buttonDisabled: true, paddingMessage: "Padding cannot be empty" })
                                                        : this.setState({ renderPadding: parseInt(padding.value), buttonDisabled: false, paddingMessage: "" })} placeholder="Padding" defaultValue={data.logo.padding} />
                                                    <p style={{ color: 'red' }}>
                                                        {this.state.paddingMessage}
                                                    </p>
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="margin">Margin:</label>
                                                    <input type="number" onInput={() => { margin.value = clamp(margin.value, 0, 100); }} className="form-control" name="margin" ref={node => {
                                                        margin = node;
                                                    }} onChange={() => margin.value.trim().length < 1 ? this.setState({ renderMargin: parseInt(margin.value), buttonDisabled: true, marginMessage: "Margin cannot be empty" })
                                                        : this.setState({ renderMargin: parseInt(margin.value), buttonDisabled: false, marginMessage: "" })} placeholder="Margin" defaultValue={data.logo.margin} />
                                                    <p style={{ color: 'red' }}>
                                                        {this.state.marginMessage}
                                                    </p>
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="height">Height:</label>
                                                    <input type="number" onInput={() => { height.value = clamp(height.value, 0, 800); }} className="form-control" name="height" ref={node => {
                                                        height = node;
                                                    }} onChange={() => height.value.trim().length < 1 ? this.setState({ renderHeight: parseInt(height.value), buttonDisabled: true, heightMessage: "Height cannot be empty" })
                                                        : this.setState({ renderHeight: parseInt(height.value), buttonDisabled: false, heightMessage: "" })} placeholder="Height" defaultValue={data.logo.height} />
                                                    <p style={{ color: 'red' }}>
                                                        {this.state.heightMessage}
                                                    </p>
                                                </div>
                                                <div className="form-group col-8">
                                                    <label htmlFor="width">Width:</label>
                                                    <input type="number" onInput={() => { width.value = clamp(width.value, 0, 1000); }} className="form-control" name="width" ref={node => {
                                                        width = node;
                                                    }} onChange={() => width.value.trim().length < 1 ? this.setState({ renderWidth: parseInt(width.value), buttonDisabled: true, widthMessage: "Width cannot be empty" })
                                                        : this.setState({ renderWidth: parseInt(width.value), buttonDisabled: false, widthMessage: "" })} placeholder="Width" defaultValue={data.logo.width} />
                                                    <p style={{ color: 'red' }}>
                                                        {this.state.widthMessage}
                                                    </p>
                                                </div>
                                                <button disabled={this.state.buttonDisabled} type="submit" className="btn btn-success">Submit</button>
                                            </form>
                                            <div className="col-6">
                                                <span style={{
                                                    display: "inline-block",
                                                    color: this.state.renderColor ? this.state.renderColor : data.logo.color,
                                                    backgroundColor: this.state.renderBackgroundColor ? this.state.renderBackgroundColor : data.logo.backgroundColor,
                                                    borderColor: this.state.renderBorderColor ? this.state.renderBorderColor : data.logo.borderColor,
                                                    borderStyle: "solid",
                                                    fontSize: (this.state.renderFontSize ? this.state.renderFontSize : data.logo.fontSize) + "pt",
                                                    borderWidth: (this.state.renderBorderWidth ? this.state.renderBorderWidth : data.logo.borderWidth) + "px",
                                                    borderRadius: (this.state.renderBorderRadius ? this.state.renderBorderRadius : data.logo.borderRadius) + "px",
                                                    padding: (this.state.renderPadding ? this.state.renderPadding : data.logo.padding) + "px",
                                                    margin: (this.state.renderMargin ? this.state.renderMargin : data.logo.margin) + "px",
                                                    width: (this.state.renderWidth ? this.state.renderWidth : data.logo.width) + "px",
                                                    height: (this.state.renderHeight ? this.state.renderHeight : data.logo.height) + "px",
                                                    whiteSpace: "pre"
                                                }}>{this.state.renderText ? this.state.renderText : data.logo.text}</span>
                                            </div>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Mutation>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;