import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation, graphql } from "react-apollo";
import { Link } from 'react-router-dom';

const ADD_LOGO = gql`
    mutation AddLogo(
        $height: Int!,
        $width: Int!,
        $text: [textInput]!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!) {
        addLogo(
            height: $height,
            width: $width,
            text: $text,
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            borderRadius: $borderRadius,
            borderWidth: $borderWidth,
            padding: $padding,
            margin: $margin) {
            _id
        }
    }
`;

class TextOptions extends React.Component{
    render() {
    
        return (
            <div>
            { 
                this.props.text.map((text, index) => {
                    return (
            <div className="container" style ={{margin : "1em"}}>
                <div className="form-group">
                    <label htmlFor="text">Text:</label>
                    <input key={index} type="text" className="form-control" name="text" 
                    placeholder="Text" defaultValue={this.props.text[index]["text"]}  onChange={(e)=>this.props.handleTextChange(e, index)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="color">Color:</label>
                    <input key={index} type="color" className="form-control" name="color" 
                    placeholder="Color" defaultValue={this.props.text[index]["color"]}  onChange={(e)=>this.props.handleTextColorChange(e, index)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="fontSize">Font Size:</label>
                    <input key ={index} type="number" min="5" max="100" className="form-control" name="fontSize" 
                    placeholder="Font Size" defaultValue={this.props.text[index]["fontSize"]}  onChange={(e)=>this.props.handleFontSizeChange(e, index)}/>
                </div>
                <button className="btn btn-primary" onClick={(e)=>this.props.handleDeleteTextOptions(index)}>Delete Text</button>
            </div>
            )} )
            }   
            </div>
                
        );
    }
}

class ImageDivs extends React.Component {
    render() {
        return (
            <div>
                {
                    this.props.images.map(function(url) {
                       return <img src={url} alt="https://media.geeksforgeeks.org/wp-content/uploads/20190506164011/logo3.png"/>
                    })
                }
            </div>
        );
    }
}

class TextDivs extends React.Component {
    render() {
        return (
            <div> 
                {
                    this.props.text.map(function(textType) {
                        return <div style = {{color : textType["color"], fontSize : textType["fontSize"] + "pt"}}> {textType["text"]}</div>
                    })
                }
            </div>
        );           
    }
}

class CreateLogoScreen extends Component {
    constructor() {
        super();
         // WE'LL MANAGE THE UI CONTROL
         // VALUES HERE
         this.state = {
             height: 200,
             width: 500,
             textNum: 0,
             text : [], 
             images : [],
             backgroundColor : "#ffffff",
             borderColor : "#000000",
             borderRadius : 50,
             borderWidth : 15,
             borderStyle : "solid",
             padding : 15,
             margin : 10,
         }
 
     }

     handleHeightChange = (event) => {
        console.log("handleHeightChange to " + event.target.value);
        this.setState({ height: event.target.value });
     }
     handleWidthChange = (event) => {
        console.log("handleWidthChange to " + event.target.value);
        this.setState({ width: event.target.value });
     }
 
     handleTextChange = (event, index) => {
         console.log("handleTextChange to " + event.target.value + " at index " + index);
         let oldText = this.state.text[index];
         oldText["text"] = event.target.value;
         //console.log(oldText);
         //console.log(this.state.text);
         //console.log(this.state.text.splice(index, 1, oldText ));
         this.setState({ text : this.state.text});
     }
 
     handleTextColorChange = (event, index) => {
         console.log("handleTextColorChange to " + event.target.value);
         let oldText = this.state.text[index];
         oldText["color"] = event.target.value;
         this.setState({ text : this.state.text });
     }
 
     handleFontSizeChange = (event, index) => {
         console.log("handleFontSizeChangeComplete to " + event.target.value);
         let oldText = this.state.text[index];
         oldText["fontSize"] = event.target.value;
         this.setState({ text : this.state.text});
     }
 
     handleBackgroundColorChange = (event) => {
         console.log("handleBackgroundColorChange to " + event.target.value);
         this.setState({ backgroundColor: event.target.value });
     }
 
     handleBorderColorChange = (event) => {
         console.log("handleBorderColorChangeComplete to " + event.target.value);
         this.setState({ borderColor: event.target.value });
     }
 
     handleBorderRadiusChange = (event) => {
         console.log("handleBorderRadiusChangeComplete to " + event.target.value);
         this.setState({ borderRadius: event.target.value });
     }
 
     handleBorderWidthChange = (event) => {
         console.log("handleBorderWidthChangeComplete to " + event.target.value);
         this.setState({ borderWidth: event.target.value });
     }
 
     handlePaddingChange = (event) => {
         console.log("handlePaddingChangeComplete to " + event.target.value);
         this.setState({ padding: event.target.value });
     }
 
     handleMarginChange = (event) => {
         console.log("handleMarginChangeComplete to " + event.target.value);
         this.setState({ margin: event.target.value });
     }

     addText = () => {
            let x = this.state.textNum + 1;
            this.setState( {textNum : x});
            let list = this.state.text.concat([{ text : "GoLogoLo", color : "#000000", fontSize : 30, x : 500, y : 500}]);
            this.setState({ text: list});
            //this.setState({ ["text" + this.state.textNum] : "GoLogoLo", ["color" + this.state.textNum] : "#000000", ["fontSize" + this.state.textNum] : 30})
     }

     addImage = (url) => {
        let urls = this.state.images.concat(url);
        this.setState({ images: urls});
     }
 
     handleDeleteTextOptions = (index) => {
         delete this.state.text[index];
         this.setState({ text : this.state.text});
     }

    render() {
        let height, width, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        class AddText extends React.Component {
            render() {
                return (
                        <div>
                            <button className="btn btn-primary" onClick={this.props.addText}> Add Text</button>
                        </div>
                );
            }
        }
        class AddImage extends React.Component {
            render() {
                let url = "";
                return (
                        <div>
                            <input type="text" placeholder="Image URL" onChange={(event) => {url = event.target.value}}/>
                            <button className="btn btn-primary" onClick={(e)=>this.props.addImage(url)}> Add Image</button>
                        </div>
                );
            }
        }
        
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error, data }) => (
                    <div className="container">
                        <div className="row">
                        <div className="col">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4><Link to="/">Home</Link></h4>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({ variables: { height: parseInt(height.value), width: parseInt(width.value), text: this.state.text,
                                                           backgroundColor: backgroundColor.value, borderColor: borderColor.value, 
                                                           borderRadius: parseInt(borderRadius.value), borderWidth: parseInt(borderWidth.value),
                                                           padding: parseInt(padding.value), margin: parseInt(margin.value) } });
                                    height.value = "";
                                    width.value = "";
                                    backgroundColor.value = "";
                                    borderColor.value = "";
                                    borderRadius.value = "";
                                    borderWidth.value = "";
                                    padding.value = "";
                                    margin.value = "";
                                   
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="height">Height:</label>
                                        <input type="number" className="form-control" name="height" ref={node => {
                                            height= node;
                                        }} placeholder="Height" defaultValue={200}  onChange={this.handleHeightChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="width">Width:</label>
                                        <input type="number" className="form-control" name="width" ref={node => {
                                            width = node;
                                        }} placeholder="Width" defaultValue={500}  onChange={this.handleWidthChange}/>
                                    </div>
                                    <TextOptions textNum = {this.state.textNum} text = {this.state.text} handleDeleteTextOptions = {this.handleDeleteTextOptions} handleTextChange = {this.handleTextChange} handleTextColorChange = {this.handleTextColorChange} handleFontSizeChange = {this.handleFontSizeChange} />
                                    <AddText addText = {this.addText}/>
                                    <AddImage addImage = {this.addImage}/>
                                    <div className="form-group">
                                        <label htmlFor="backgroundColor">Background Color:</label>
                                        <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                            backgroundColor = node;
                                        }} placeholder="Background Color" defaultValue={"#ffffff"}  onChange={this.handleBackgroundColorChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="backgroundColor">Border Color:</label>
                                        <input type="color" className="form-control" name="borderColor" ref={node => {
                                            borderColor = node;
                                        }} placeholder="Border Color" defaultValue={"#000000"}  onChange={this.handleBorderColorChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderRadius">Border Radius:</label>
                                        <input type="number" min="0" max="100" className="form-control" name="borderRadius" ref={node => {
                                            borderRadius = node;
                                        }} placeholder="Border Radius" defaultValue={50}  onChange={this.handleBorderRadius}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="borderWidth">Border Width:</label>
                                        <input type="number" min="0" max="100" className="form-control" name="borderWidth" ref={node => {
                                            borderWidth = node;
                                        }} placeholder="Border Width" defaultValue={15}  onChange={this.handleBorderWidthChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="padding">Padding:</label>
                                        <input type="number" min="0" max="100" className="form-control" name="padding" ref={node => {
                                            padding = node;
                                        }} placeholder="Padding" defaultValue={15}  onChange={this.handlePaddingChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="margin">Margin:</label>
                                        <input type="number" min="0" max="100" className="form-control" name="margin" ref={node => {
                                            margin = node;
                                        }} placeholder="Margin" defaultValue={10}  onChange={this.handleMarginChange}/>
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                            </div>
                        </div>
                        <div className= "col" style={{top: "6em", overflow: "auto"}}>
                            <div style={{ height: this.state.height + "px", width: this.state.width + "px", 
                                        backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, 
                                        borderRadius: this.state.borderRadius + "px", borderWidth: this.state.borderWidth + "px",
                                        padding: this.state.padding + "px", margin: this.state.margin + "px", overflow: "auto", position: "sticky",
                                        borderStyle: "solid"}}>
                                        <TextDivs textNum = {this.state.textNum} text = {this.state.text}/>
                                        <ImageDivs images = {this.state.images}/>
                            </div>
                        </div>
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;