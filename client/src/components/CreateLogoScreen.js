import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import { clamp } from '../utils/utlity';
import { Rnd } from 'react-rnd';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderWidth: Int!,
        $borderRadius: Int!,
        $padding: Int!,
        $margin: Int!,
        $height: Int!,
        $width: Int!,
        $image: String!) {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderWidth: $borderWidth,
            borderRadius: $borderRadius,
            padding: $padding,
            margin: $margin,
            height: $height,
            width: $width,
            image: $image) {
            _id
        }
    }
`;

class CreateLogoScreen extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            renderText: "Default Logo",
            renderColor: "#1f3eff",
            renderBackgroundColor: "#6BFF33",
            renderBorderColor: "#AB33FF",
            renderBorderWidth: "10",
            renderBorderRadius: "0",
            renderFontSize: "40",
            renderPadding: "10",
            renderMargin: "10",
            renderHeight: "130",
            renderWidth: "330",
            renderImage: "https://i.picsum.photos/id/871/200/300.jpg",
            buttonDisabled: false,
            errorMessage: "",
            fontSizeMessage: "",
            borderRadiusMessage: "",
            borderWidthMessage: "",
            paddingMessage: "",
            marginMessage: "",
            heightMessage: "",
            widthMessage: "",
            imageMessage: "",
            x: 0,
            y: 0,
            imageX: 10,
            imageY: 10
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
                                    addLogo({ variables: { text: text.value, color: color.value, fontSize: parseInt(fontSize.value), backgroundColor: backgroundColor.value, 
                                        borderColor: borderColor.value, borderWidth: parseInt(borderWidth.value), borderRadius: parseInt(borderRadius.value), padding: 
                                        parseInt(padding.value), margin: parseInt(margin.value), height: parseInt(height.value), width: parseInt(width.value), image: image.value }});
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
                                        }} onChange={() => text.value.trim().length < 1 ? this.setState({ renderText: text.value, buttonDisabled: true, errorMessage: "Text cannot be empty" }) 
                                        : this.setState({renderText: text.value, buttonDisabled: false, errorMessage: ""})} placeholder="Text" defaultValue={this.state.renderText}/>
                                        <p style={{ color: 'red' }}>
                                            {this.state.errorMessage}
                                        </p>
                                    </div>
                                    <div className="form-group col-4">
                                        <label htmlFor="color">Color:</label>
                                        <input type="color" className="form-control" name="color" ref={node => {
                                            color = node;
                                        }}onChange={() => this.setState({renderColor: color.value})} placeholder="Color" defaultValue={this.state.renderColor}/>
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
                                        }} onChange={() => fontSize.value.trim().length < 1 ? this.setState({ renderFontSize: fontSize.value,buttonDisabled: true, fontSizeMessage: "Font Size cannot be empty" }) 
                                        : this.setState({renderFontSize: fontSize.value, buttonDisabled: false, fontSizeMessage: ""})} placeholder="Font Size" defaultValue={this.state.renderFontSize}/>
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
                                        }} onChange={() => this.setState({ renderImage: image.value })} placeholder="Image" defaultValue={this.state.renderImage}/>
                                    </div>
                                    <button disabled={this.state.buttonDisabled} type="submit" className="btn btn-success">Submit</button>
                                </form>
                                <div className="col-6">
                                    <span style={{
                                        display: "inline-block",
                                        color: this.state.renderColor ? this.state.renderColor : "#1f3eff",
                                        backgroundColor: this.state.renderBackgroundColor ? this.state.renderBackgroundColor : "#6BFF33",
                                        borderColor: this.state.renderBorderColor ? this.state.renderBorderColor : "#AB33FF",
                                        borderStyle: "solid",
                                        fontSize: (this.state.renderFontSize ? this.state.renderFontSize : 40) + "pt",
                                        borderWidth: (this.state.renderBorderWidth ? this.state.renderBorderWidth : 10) + "px",
                                        borderRadius: (this.state.renderBorderRadius ? this.state.renderBorderRadius : 0) + "px",
                                        padding: (this.state.renderPadding ? this.state.renderPadding : 10) + "px",
                                        margin: (this.state.renderMargin ? this.state.renderMargin : 10) + "px",
                                        height: (this.state.renderHeight ? this.state.renderHeight : 130) + "px",
                                        width: (this.state.renderWidth ? this.state.renderWidth : 330) + "px",
                                        whiteSpace: "pre"
                                    }}>
                                        <div>
                                            <Rnd
                                                //size={{ width: 100,  height: 400 }}
                                                position={{ x: this.state.imageX, y: this.state.imageY }}
                                                onDragStop={(e, d) => { this.setState({ imageX: d.x, imageY: d.y }) }}
                                                onResizeStop={(e, direction, ref, delta, position) => {
                                                    this.setState({
                                                    width: ref.style.width,
                                                    height: ref.style.height,
                                                    ...position,
                                                    });
                                                }}
                                                >
                                                <img 
                                                    src={this.state.renderImage}
                                                    draggable="false"
                                                    //alt="new"
                                                    />
                                            </Rnd>
                                        </div>
                                        <div>
                                            <Rnd
                                            //size={{ width: 100,  height: 400 }}
                                            position={{ x: this.state.x, y: this.state.y }}
                                            onDragStop={(e, d) => { this.setState({ x: d.x, y: d.y }) }}
                                            onResizeStop={(e, direction, ref, delta, position) => {
                                                this.setState({
                                                width: ref.style.width,
                                                height: ref.style.height,
                                                ...position,
                                                });
                                            }}
                                            >
                                                <div>
                                                    {this.state.renderText ? this.state.renderText : "Default Logo"}
                                                </div>
                                            </Rnd>
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