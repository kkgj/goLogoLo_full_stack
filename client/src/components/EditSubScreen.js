import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { clamp } from "../utils/utlity";
import { Rnd } from 'react-rnd';
import PopModal from './PopModal';

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

export default class EditSubScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            renderText: props.logo.textArray,
            renderColor: props.logo.color,
            renderBackgroundColor: props.logo.backgroundColor,
            renderBorderColor: props.logo.borderColor,
            renderBorderWidth: props.logo.borderWidth,
            renderBorderRadius: props.logo.borderRadius,
            renderFontSize: props.logo.fontSize,
            renderPadding: props.logo.padding,
            renderMargin: props.logo.margin,
            renderHeight: props.logo.height,
            renderWidth: props.logo.width,
            renderImage: props.logo.imageArray,
            buttonDisabled: false,
            errorMessage: "",
            fontSizeMessage: "",
            borderRadiusMessage: "",
            borderWidthMessage: "",
            paddingMessage: "",
            marginMessage: "",
            heightMessage: "",
            widthMessage: "",
            textIndex: props.logo.textArray.length - 1,
            imageIndex: props.logo.imageArray.length - 1,
        }
    }

    componentDidMount = () => {
        let tempText = this.state.renderText;
        tempText.map((e) => delete e.__typename);
        this.setState({ renderText: tempText });
        let tempImage = this.state.renderImage;
        tempImage.map((e) => delete e.__typename);
        this.setState({ renderImage: tempImage });
    }

    handleText = (input) => {
        let tempText = this.state.renderText;
        if (input.target.value.trim().length < 1) {
            tempText[this.state.textIndex].text = "";
            this.setState({ renderText: tempText, buttonDisabled: true, errorMessage: "Text cannot be empty!" });
        } else {
            tempText[this.state.textIndex].text = input.target.value;
            this.setState({ renderText: tempText, buttonDisabled: false, errorMessage: "" });
        }
    }

    handleColor = (input) => {
        let tempText = this.state.renderText;
        tempText[this.state.textIndex].color = input.target.value;
        this.setState({ renderText: tempText });
    }

    handleFontSize = (input) => {
        let tempText = this.state.renderText;
        if (input.target.value.trim().length < 1) {
            tempText[this.state.textIndex].fontSize = "";
            this.setState({ renderText: tempText, buttonDisabled: true, fontSizeMessage: "Font Size cannot be empty!" });
        } else {
            tempText[this.state.textIndex].fontSize = parseInt(clamp(input.target.value, 1, 144));
            this.setState({ renderText: tempText, buttonDisabled: false, fontSizeMessage: "" });
        }
    }

    handleImage = (input) => {
        let tempImage = this.state.renderImage;
        if (this.state.renderImage.length === 0) {
            tempImage.unshift({ image: input.target.value, imageHeight: 200, imageWidth: 180, imageX: 150, imageY: 20 });
            this.setState({ renderImage: tempImage, imageIndex: 0 });
        } else {
            tempImage[this.state.imageIndex].image = input.target.value;
            this.setState({ renderImage: tempImage });
        }
    }

    handleAdd = () => {
        let tempText = this.state.renderText;
        tempText.push({ text: "Default Logo", color: "#1f3eff", fontSize: 40, x: 5, y: 5 });
        let tempIndex = tempText.length - 1;
        this.setState({ renderText: tempText, textIndex: tempIndex, buttonDisabled: false, errorMessage: "", fontSizeMessage: "" });
    }

    handleDelete = () => {
        if (this.state.renderText.length > 1) {
            let tempText = this.state.renderText;
            //tempText.splice(this.state.textIndex, 1);
            tempText.pop();
            let tempIndex = tempText.length - 1
            this.setState({ textIndex: tempIndex, renderText: tempText, buttonDisabled: false, errorMessage: "" });
        }
    }

    handleAddImage = () => {
        let tempImage = this.state.renderImage;
        tempImage.push({ image: "https://i.picsum.photos/id/871/200/300.jpg", imageHeight: 200, imageWidth: 120, imageX: 160, imageY: 30 });
        this.setState({ renderImage: tempImage, imageIndex: tempImage.length - 1 });
    }

    handleDeleteImage = () => {
        if (this.state.renderImage.length > 0) {
            let tempImage = this.state.renderImage;
            //tempImage.splice(this.state.imageIndex, 1);
            tempImage.pop();
            this.setState({ imageIndex: tempImage.length - 1, renderImage: tempImage });
        }
    }

    handleBorderWidth = (event) => {
        if (event.target.value.trim().length < 1) {
            this.setState({ renderBorderWidth: event.target.value, buttonDisabled: true, borderWidthMessage: "Border Width cannot be empty!" });
        } else {
            this.setState({ renderBorderWidth: clamp(event.target.value, 0, 100), buttonDisabled: false, borderWidthMessage: "" });
        }
    }

    handleBorderRadius = (event) => {
        if (event.target.value.trim().length < 1) {
            this.setState({ renderBorderRadius: event.target.value, buttonDisabled: true, borderRadiusMessage: "Border Radius cannot be empty!" });
        } else {
            this.setState({ renderBorderRadius: clamp(event.target.value, 0, 100), buttonDisabled: false, borderRadiusMessage: "" });
        }
    }

    handlePadding = (event) => {
        if (event.target.value.trim().length < 1) {
            this.setState({ renderPadding: event.target.value, buttonDisabled: true, paddingMessage: "Padding cannot be empty!" });
        } else {
            this.setState({ renderPadding: clamp(event.target.value, 0, 100), buttonDisabled: false, paddingMessage: "" });
        }
    }

    handleMargin = (event) => {
        if (event.target.value.trim().length < 1) {
            this.setState({ renderMargin: event.target.value, buttonDisabled: true, marginMessage: "Margin cannot be empty!" });
        } else {
            this.setState({ renderMargin: clamp(event.target.value, 0, 100), buttonDisabled: false, marginMessage: "" });
        }
    }

    handleHeight = (event) => {
        if (event.target.value.trim().length < 1) {
            this.setState({ renderHeight: event.target.value, buttonDisabled: true, heightMessage: "Height cannot be empty!" });
        } else {
            this.setState({ renderHeight: clamp(event.target.value, 1, 800), buttonDisabled: false, heightMessage: "" });
        }
    }

    handleWidth = (event) => {
        if (event.target.value.trim().length < 1) {
            this.setState({ renderWidth: event.target.value, buttonDisabled: true, widthMessage: "Width cannot be empty!" });
        } else {
            this.setState({ renderWidth: clamp(event.target.value, 1, 1000), buttonDisabled: false, widthMessage: "" });
        }
    }


    render() {
        return (
            <Mutation mutation={UPDATE_LOGO} key={this.props.logo._id} onCompleted={() => this.props.history.push(`/`)}>
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
                                            id: this.props.logo._id, textArray: this.state.renderText, backgroundColor: this.state.renderBackgroundColor,
                                            borderColor: this.state.renderBorderColor, borderWidth: parseInt(this.state.renderBorderWidth), borderRadius:
                                                parseInt(this.state.renderBorderRadius), padding: parseInt(this.state.renderPadding), margin: parseInt(this.state.renderMargin),
                                            height: parseInt(this.state.renderHeight), width: parseInt(this.state.renderWidth), imageArray: this.state.renderImage
                                        }
                                    });
                                }}>
                                    <div className="form-group col-8">
                                        <label htmlFor="text">Text:</label>
                                        <input type="text" className="form-control" name="text" onChange={this.handleText}
                                            placeholder="Text" value={this.state.renderText[this.state.textIndex].text} />
                                        <PopModal
                                            handleDelete={this.handleDelete}
                                            handleAdd={this.handleAdd}
                                            message={true}
                                            flag={this.state.renderText.length === 1} />
                                        <p style={{ color: 'red' }}>
                                            {this.state.errorMessage}
                                        </p>
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" onChange={this.handleColor}
                                            placeholder="Color" value={this.state.renderText[this.state.textIndex].color} />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" name="backgroundColor"
                                            onChange={(input) => this.setState({ renderBackgroundColor: input.target.value })}
                                            placeholder="Background Color" value={this.state.renderBackgroundColor} />
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" name="borderColor" onChange={(input) => this.setState({ renderBorderColor: input.target.value })}
                                            placeholder="Border Color" value={this.state.renderBorderColor} />
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="text" className="form-control" name="fontSize" onChange={this.handleFontSize} placeholder="Font Size"
                                            value={this.state.renderText[this.state.textIndex].fontSize} />
                                        <p style={{ color: 'red' }}>
                                            {this.state.fontSizeMessage}
                                        </p>
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" className="form-control" name="borderWidth" onChange={this.handleBorderWidth}
                                            placeholder="Border Width" value={this.state.renderBorderWidth} />
                                        <p style={{ color: 'red' }}>
                                            {this.state.borderWidthMessage}
                                        </p>
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" className="form-control" name="borderRadius" onChange={this.handleBorderRadius}
                                            placeholder="Border Radius" value={this.state.renderBorderRadius} />
                                        <p style={{ color: 'red' }}>
                                            {this.state.borderRadiusMessage}
                                        </p>
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" className="form-control" name="padding" onChange={this.handlePadding}
                                            placeholder="Padding" value={this.state.renderPadding} />
                                        <p style={{ color: 'red' }}>
                                            {this.state.paddingMessage}
                                        </p>
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="margin">Margin:</label>
                                        <input type="number" className="form-control" name="margin" onChange={this.handleMargin}
                                            placeholder="Margin" value={this.state.renderMargin} />
                                        <p style={{ color: 'red' }}>
                                            {this.state.marginMessage}
                                        </p>
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="height">Height:</label>
                                        <input type="number" className="form-control" name="height" onChange={this.handleHeight}
                                            placeholder="Height" value={this.state.renderHeight} />
                                        <p style={{ color: 'red' }}>
                                            {this.state.heightMessage}
                                        </p>
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="width">Width:</label>
                                        <input type="number" className="form-control" name="height" onChange={this.handleWidth}
                                            placeholder="Width" value={this.state.renderWidth} />
                                        <p style={{ color: 'red' }}>
                                            {this.state.widthMessage}
                                        </p>
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="image">Image:</label>
                                        <input type="text" className="form-control" name="image" onChange={this.handleImage} placeholder="Image" value={this.state.renderImage.length === 0 ? "" : this.state.renderImage[this.state.imageIndex].image} />
                                        <PopModal
                                            handleDelete={this.handleDeleteImage}
                                            handleAdd={this.handleAddImage}
                                            message={false}
                                            flag={this.state.renderImage.length === 0} />
                                    </div>
                                    <button disabled={this.state.buttonDisabled} type="submit" className="btn btn-success">Submit</button>
                                </form>
                                <div className="col-6">
                                    <span className="hello"
                                        style={{
                                            display: "inline-block",
                                            backgroundColor: this.state.renderBackgroundColor ? this.state.renderBackgroundColor : "#6BFF33",
                                            borderColor: this.state.renderBorderColor ? this.state.renderBorderColor : "#AB33FF",
                                            borderStyle: "solid",
                                            borderWidth: (this.state.renderBorderWidth ? this.state.renderBorderWidth : 10) + "px",
                                            borderRadius: (this.state.renderBorderRadius ? this.state.renderBorderRadius : 0) + "px",
                                            padding: (this.state.renderPadding ? this.state.renderPadding : 10) + "px",
                                            margin: (this.state.renderMargin ? this.state.renderMargin : 10) + "px",
                                            height: (this.state.renderHeight ? this.state.renderHeight : 630) + "px",
                                            width: (this.state.renderWidth ? this.state.renderWidth : 530) + "px",
                                            whiteSpace: "pre"
                                        }}>
                                        <div style={{ position: "absolute" }}>
                                            {this.state.renderImage.map((element, index) =>
                                                <Rnd
                                                bounds=".hello"
                                                key={index}
                                                style={ index === this.state.imageIndex ? { zIndex: "1" } : { zIndex: "0" }}
                                                size={{ width: element.imageWidth, height: element.imageHeight }}
                                                position={{ x: element.imageX, y: element.imageY }}
                                                onDragStart={(e, d) => {
                                                    this.setState({
                                                        imageIndex: index
                                                    })
                                                }}
                                                onResizeStart={(e, direction, ref, delta, position) => {
                                                    this.setState({
                                                        imageIndex: index
                                                    })
                                                }}
                                                onDragStop={(e, d) => {
                                                    let tempImage = this.state.renderImage;
                                                    let tempIndex = tempImage.length - 1;
                                                    tempImage[index].imageX = parseInt(d.x);
                                                    tempImage[index].imageY = parseInt(d.y);
                                                    if (index !== tempIndex) {
                                                        let temp = tempImage[index];
                                                        tempImage.splice(index, 1);
                                                        tempImage.push(temp);
                                                    }
                                                    this.setState({ renderImage: tempImage, imageIndex: tempIndex })
                                                }}
                                                onResizeStop={(e, direction, ref, delta, position) => {
                                                    let tempImage = this.state.renderImage;
                                                    let tempIndex = tempImage.length - 1;
                                                    tempImage[index].imageX = parseInt(position.x);
                                                    tempImage[index].imageY = parseInt(position.y);
                                                    tempImage[index].imageHeight = parseInt(ref.style.height);
                                                    tempImage[index].imageWidth = parseInt(ref.style.width);
                                                    if (index !== tempIndex) {
                                                        let temp = tempImage[index];
                                                        tempImage.splice(index, 1);
                                                        tempImage.push(temp);
                                                    }
                                                    this.setState({
                                                        renderImage: tempImage,
                                                        imageIndex: tempIndex
                                                    });
                                                }}
                                            >
                                                <img
                                                    src={element.image}
                                                    alt="empty"
                                                    style={{ height: "100%", width: "100%" }}
                                                    draggable="false"
                                                />
                                            </Rnd>
                                            )}
                                        </div>
                                        <div style={{ position: "absolute" }}>
                                            {this.state.renderText.map((t, index) =>
                                                <Rnd
                                                enableResizing="false"
                                                bounds=".hello"
                                                style={ index === this.state.textIndex ? { zIndex: "3" } : { zIndex: "2" }}
                                                key={index}
                                                position={{ x: t.x, y: t.y }}
                                                onDragStart={(e, d) => {
                                                    let tempText = this.state.renderText;
                                                    if (t.text === "") {
                                                        t.text = "Default Logo";
                                                        tempText[index] = t;
                                                    }
                                                    if (t.fontSize === "") {
                                                        t.fontSize = 40;
                                                        tempText[index] = t;
                                                    }
                                                    this.setState({
                                                        renderText: tempText,
                                                        textIndex: index,
                                                        buttonDisabled: false,
                                                        errorMessage: "",
                                                        fontSizeMessage: ""
                                                    })
                                                }}
                                                onDragStop={(e, d) => {
                                                    let tempText = this.state.renderText;
                                                    let tempIndex = tempText.length - 1;
                                                    tempText[index].x = d.x;
                                                    tempText[index].y = d.y;
                                                    if (index !== tempIndex) {
                                                        let temp = tempText[index];
                                                        tempText.splice(index, 1);
                                                        tempText.push(temp);
                                                    }
                                                    this.setState({
                                                        renderText: tempText,
                                                        textIndex: tempIndex
                                                    });
                                                }}>
                                                <div
                                                    style={{
                                                        color: t.color,
                                                        fontSize: t.fontSize ? t.fontSize + "px" : "40px",
                                                    }}>
                                                    {t.text ? t.text : "Default Logo"}
                                                </div>
                                            </Rnd>
                                            )}
                                        </div>
                                    </span>
                                </div>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }

}