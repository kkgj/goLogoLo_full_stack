import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { clamp } from '../utils/utlity';
import { Rnd } from 'react-rnd';
import PopModal from './PopModal'

const ADD_LOGO = gql`
    mutation AddLogo(
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
        addLogo(
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
            _id
        }
    }
`;

class CreateLogoScreen extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            renderText: [{text: "Default Logo", color: "#1f3eff", fontSize: 40, x: 0, y: 0}],
            renderBackgroundColor: "#6BFF33",
            renderBorderColor: "#AB33FF",
            renderBorderWidth: "10",
            renderBorderRadius: "0",
            renderPadding: "10",
            renderMargin: "10",
            renderHeight: "630",
            renderWidth: "530",
            renderImage: [{image: "https://i.picsum.photos/id/871/200/300.jpg", imageHeight: 300, imageWidth: 200, imageX: 10, imageY: 10}],
            buttonDisabled: false,
            errorMessage: "",
            fontSizeMessage: "",
            borderRadiusMessage: "",
            borderWidthMessage: "",
            paddingMessage: "",
            marginMessage: "",
            heightMessage: "",
            widthMessage: "",
            textIndex: 0,
            imageIndex: 0,
        }
    }

    handleText = (input) => {
        let tempText = this.state.renderText;
        if (input.target.value.trim().length < 1) {
            tempText[this.state.textIndex].text = "";
            this.setState({renderText: tempText, buttonDisabled: true, errorMessage: "Text cannot be empty!"});
        } else {
            tempText[this.state.textIndex].text = input.target.value;
            this.setState({renderText: tempText, buttonDisabled: false, errorMessage: ""});
        }
    }

    handleColor = (input) => {
        let tempText = this.state.renderText;
        tempText[this.state.textIndex].color = input.target.value;
        this.setState({renderText: tempText});
    }

    handleFontSize = (input) => {
        let tempText = this.state.renderText;
        if (input.target.value.trim().length < 1) {
            tempText[this.state.textIndex].fontSize = "";
            this.setState({renderText: tempText, buttonDisabled: true, fontSizeMessage: "Font Size cannot be empty!"});
        } else {
            tempText[this.state.textIndex].fontSize = input.target.value;
            this.setState({renderText: tempText, buttonDisabled: false, fontSizeMessage: ""});
        }
    }

    handleImage = (input) => {
        let tempImage = this.state.renderImage;
        tempImage[this.state.imageIndex].image = input.target.value;
        this.setState({renderImage: tempImage});
    }

    handleAdd = () => {
        let tempText = this.state.renderText;
        tempText.unshift({ text: "Default Logo", color: "#1f3eff", fontSize: 40, x: 5, y: 5 });
        this.setState({ renderText: tempText, textIndex: 0, buttonDisabled: false, errorMessage: "", fontSizeMessage: "" });
    } 

    handleDelete = () => {
        if (this.state.renderText.length > 1) {
            let tempText = this.state.renderText;
            tempText.splice(this.state.textIndex, 1);
            this.setState({textIndex: 0, renderText: tempText, buttonDisabled: false, errorMessage: ""});
        }
    }

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderWidth, borderRadius, padding, margin, height, width, image;
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body row">
                                <form className="col-6" onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { textArray: this.state.renderText, backgroundColor: backgroundColor.value, 
                                        borderColor: borderColor.value, borderWidth: parseInt(borderWidth.value), borderRadius: 
                                        parseInt(borderRadius.value), padding: parseInt(padding.value), margin: parseInt(margin.value),
                                        height: parseInt(height.value), width: parseInt(width.value), imageArray: this.state.renderImage }});
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
                                    image.value = "";
                                }}>
                                    <div className="form-group col-8">
                                        <label htmlFor="text">Text:</label>
                                            <input type="text" className="form-control" name="text" ref={node => {
                                                text = node;
                                            }} onChange={this.handleText} placeholder="Text" value={this.state.renderText[this.state.textIndex].text}/>
                                            <PopModal 
                                                handleDelete={this.handleDelete}
                                                handleAdd={this.handleAdd}
                                                message={true}
                                                flag={this.state.renderText.length===1}/>
                                        <p style={{ color: 'red' }}>
                                            {this.state.errorMessage}
                                        </p>
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" ref={node => {
                                            color = node;
                                        }}onChange={this.handleColor} placeholder="Color" value={this.state.renderText[this.state.textIndex].color}/>
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} onChange={() => this.setState({renderBackgroundColor: backgroundColor.value})} placeholder="Background Color" defaultValue={this.state.renderBackgroundColor}/> 
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="borderColor">Border Color:</label>
                                        <input type="color" className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} onChange={() => this.setState({renderBorderColor: borderColor.value})} placeholder="Border Color" defaultValue={this.state.renderBorderColor}/>
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="fontSize">Font Size:</label>
                                        <input type="text" onInput={()=>{fontSize.value = clamp(fontSize.value, 0, 144);}} className="form-control" name="fontSize" ref={node => {
                                            fontSize = node;
                                        }} onChange={this.handleFontSize} placeholder="Font Size" value={this.state.renderText[this.state.textIndex].fontSize}/>
                                        <p style={{ color: 'red' }}>
                                            {this.state.fontSizeMessage}
                                        </p>
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" onInput={()=>{borderWidth.value = clamp(borderWidth.value, 0, 100);}} className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} onChange={() => borderWidth.value.trim().length < 1 ? this.setState({ renderBorderWidth: borderWidth.value, buttonDisabled: true, borderWidthMessage: "Border Width cannot be empty" }) 
                                        : this.setState({renderBorderWidth: borderWidth.value, buttonDisabled: false, borderWidthMessage: ""})} placeholder="Border Width" defaultValue={this.state.renderBorderWidth}/>
                                        <p style={{ color: 'red' }}>
                                            {this.state.borderWidthMessage}
                                        </p>
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" onInput={()=>{borderRadius.value = clamp(borderRadius.value, 0, 100);}} className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} onChange={() => borderRadius.value.trim().length < 1 ? this.setState({ renderBorderRadius: borderRadius.value, buttonDisabled: true, borderRadiusMessage: "Border Radius cannot be empty" }) 
                                        : this.setState({renderBorderRadius: borderRadius.value, buttonDisabled: false, borderRadiusMessage: ""})} placeholder="Border Radius" defaultValue={this.state.renderBorderRadius}/>
                                        <p style={{ color: 'red' }}>
                                            {this.state.borderRadiusMessage}
                                        </p>
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" onInput={()=>{padding.value = clamp(padding.value, 0, 100);}} className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} onChange={() => padding.value.trim().length < 1 ? this.setState({ renderPadding: padding.value, buttonDisabled: true, paddingMessage: "Padding cannot be empty" }) 
                                        : this.setState({renderPadding: padding.value, buttonDisabled: false, paddingMessage: ""})} placeholder="Padding" defaultValue={this.state.renderPadding}/>
                                        <p style={{ color: 'red' }}>
                                            {this.state.paddingMessage}
                                        </p>
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="margin">Margin:</label>
                                        <input type="number" onInput={()=>{margin.value = clamp(margin.value, 0, 100);}} className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} onChange={() => margin.value.trim().length < 1 ? this.setState({ renderMargin: margin.value, buttonDisabled: true, marginMessage: "Margin cannot be empty" }) 
                                        : this.setState({renderMargin: margin.value, buttonDisabled: false, marginMessage: ""})} placeholder="Margin" defaultValue={this.state.renderMargin}/>
                                        <p style={{ color: 'red' }}>
                                            {this.state.marginMessage}
                                        </p>
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="height">Height:</label>
                                        <input type="number" onInput={()=>{height.value = clamp(height.value, 0, 800);}} className="form-control" name="height" ref={node => {
                                            height = node;
                                        }} onChange={() => height.value.trim().length < 1 ? this.setState({ renderHeight: height.value, buttonDisabled: true, heightMessage: "Height cannot be empty" }) 
                                        : this.setState({renderHeight: height.value, buttonDisabled: false, heightMessage: ""})} placeholder="Height" defaultValue={this.state.renderHeight}/>
                                        <p style={{ color: 'red' }}>
                                            {this.state.heightMessage}
                                        </p>
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="width">Width:</label>
                                        <input type="number" onInput={()=>{width.value = clamp(width.value, 0, 1000);}} className="form-control" name="height" ref={node => {
                                            width = node;
                                        }} onChange={() => width.value.trim().length < 1 ? this.setState({ renderWidth: width.value, buttonDisabled: true, widthMessage: "Width cannot be empty" }) 
                                        : this.setState({renderWidth: width.value, buttonDisabled: false, widthMessage: ""})} placeholder="Width" defaultValue={this.state.renderWidth}/>
                                        <p style={{ color: 'red' }}>
                                            {this.state.widthMessage}
                                        </p>
                                    </div>
                                    <div className="form-group col-8">
                                        <label htmlFor="image">Image:</label>
                                        <input type="text" className="form-control" name="image" ref={node => {
                                            image = node;
                                        }} onChange={this.handleImage} placeholder="Image" value={this.state.renderImage[this.state.imageIndex].image}/>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-secondary">+</button>
                                            <button type="button" className="btn btn-secondary">-</button>
                                        </div> 
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
                                        <div style={{position: "absolute"}}>
                                            {this.state.renderImage.map((element, index) => 
                                                <Rnd
                                                    bounds=".hello"
                                                    key={index}
                                                    style={this.state.imageIndex === index ? {zIndex:"1"} : {zIndex:"0"}}
                                                    size={{ width: element.imageWidth,  height: element.imageHeight }}
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
                                                        tempImage[index].imageX = d.x;
                                                        tempImage[index].imageY = d.y;
                                                        this.setState({ renderImage: tempImage }) 
                                                    }}
                                                    onResizeStop={(e, direction, ref, delta, position) => {
                                                        let tempImage = this.state.renderImage;
                                                        tempImage[index].imageX = position.x;
                                                        tempImage[index].imageY = position.y;
                                                        tempImage[index].imageHeight =  ref.style.height;
                                                        tempImage[index].imageWidth = ref.style.width;
                                                        this.setState({  
                                                            renderImage: tempImage,
                                                            imageIndex: index
                                                        });
                                                    }}
                                                    >
                                                    <img 
                                                        src={element.image}
                                                        alt=""
                                                        style={{height: "100%", width: "100%"}}
                                                        draggable="false"
                                                        />
                                                </Rnd>
                                            )}
                                        </div>
                                        <div style={{position: "absolute"}}>
                                            {this.state.renderText.map((t, index) => 
                                                <Rnd
                                                    bounds=".hello"
                                                    style={this.state.textIndex === index ? {zIndex:"2"} : {zIndex:"1"}}
                                                    key={index}
                                                    position={{ x: t.x, y: t.y }}
                                                    onDragStart={(e, d) => {
                                                        if (t.text === "") {
                                                            let tempText = this.state.renderText;
                                                            t.text = "Default Logo";
                                                            tempText[index] = t;
                                                            this.setState({ renderText: tempText });
                                                        }
                                                        if (t.fontSize === "") {
                                                            let tempText = this.state.renderText;
                                                            t.fontSize = 40;
                                                            tempText[index] = t;
                                                            this.setState({ renderText: tempText });
                                                        }
                                                        this.setState({
                                                            textIndex: index,
                                                            buttonDisabled: false, 
                                                            errorMessage: "",
                                                            fontSizeMessage: ""
                                                        })
                                                    }}
                                                    onDragStop={(e, d) => { 
                                                        let tempText = this.state.renderText;
                                                        tempText[index].x = d.x;
                                                        tempText[index].y = d.y;
                                                        this.setState({  
                                                            renderText: tempText,
                                                            textIndex: index
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

export default CreateLogoScreen;