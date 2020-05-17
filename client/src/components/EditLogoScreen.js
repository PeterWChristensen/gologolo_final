import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            height
            width
            text { text }
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $height: Int!,
        $width: Int!,
        $text: [textInput]!,
        $color: String!,
        $fontSize: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $borderRadius: Int!,
        $borderWidth: Int!,
        $padding: Int!,
        $margin: Int!) {
            updateLogo(
                id: $id,
                height: $height,
                width: $width,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                borderRadius: $borderRadius,
                borderWidth: $borderWidth,
                padding: $padding,
                margin: $margin) {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {
    constructor() {
       super();
        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE
        this.state = {
            height : null,
            width : null,
            text : null,
            color : null,
            fontSize : null,
            backgroundColor : null,
            borderColor : null,
            borderRadius : null,
            borderWidth : null,
            borderStyle : "solid",
            padding : null,
            margin : null,
            editedFlag : false
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

    handleTextChange = (event) => {
        console.log("handleTextChange to " + event.target.value);
        this.setState({ text: event.target.value });
    }

    handleTextColorChange = (event) => {
        console.log("handleTextColorChange to " + event.target.value);
        this.setState({ color: event.target.value });
    }

    handleFontSizeChange = (event) => {
        console.log("handleFontSizeChangeComplete to " + event.target.value);
        this.setState({ fontSize: event.target.value });
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

    render() {
        let height, width, text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if (!this.state.editedFlag)  {
                        this.setState({ height: data.logo.height, width: data.logo.width, text: data.logo.text, color: data.logo.color, fontSize: data.logo.fontSize,
                        backgroundColor: data.logo.backgroundColor, borderColor: data.logo.borderColor, 
                        borderRadius: data.logo.borderRadius, borderWidth: data.logo.borderWidth,
                        padding: data.logo.padding, margin: data.logo.margin, editedFlag : true}) }

                    return (
                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="row align-items-center">
                                    <div className="col">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h4><Link to="/">Home</Link></h4>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="panel-body">                                            
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, height: parseInt(height.value), width: parseInt(width.value), text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
                                                                          backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value),
                                                                          borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value) } });
                                                height.value = "";
                                                width.value = "";
                                                text.value = "";
                                                color.value = "";
                                                fontSize.value = "";
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
                                                <div className="form-group">
                                                    <label htmlFor="text">Text:</label>
                                                    <input type="text" className="form-control" name="text" ref={node => {
                                                        text = node;
                                                    }} placeholder="Text" defaultValue={data.logo.text} onChange={this.handleTextChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="color">Color:</label>
                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                        color = node;
                                                    }} placeholder="Color" defaultValue={data.logo.color} onChange={this.handleTextColorChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="number" min="5" max="100" className="form-control" name="fontSize" ref={node => {
                                                        fontSize = node;
                                                    }} placeholder="Font Size" defaultValue={data.logo.fontSize} onChange={this.handleFontSizeChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} placeholder="Background Color" defaultValue={data.logo.backgroundColor} onChange={this.handleBackgroundColorChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="backgroundColor">Border Color:</label>
                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} placeholder="Border Color" defaultValue={data.logo.borderColor} onChange={this.handleBorderColorChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="number" min="0" max="100" className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }} placeholder="Border Radius" defaultValue={data.logo.borderRadius} onChange={this.handleBorderRadiusChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderWidth">Border Width:</label>
                                                    <input type="number" min="0" max="100" className="form-control" name="borderWidth" ref={node => {
                                                        borderWidth = node;
                                                    }} placeholder="Border Width" defaultValue={data.logo.borderWidth} onChange={this.handleBorderWidthChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="number" min="0" max="100" className="form-control" name="padding" ref={node => {
                                                        padding = node;
                                                    }} placeholder="Padding" defaultValue={data.logo.padding} onChange={this.handlePaddingChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="margin">Margin:</label>
                                                    <input type="number" min="0" max="100" className="form-control" name="margin" ref={node => {
                                                        margin = node;
                                                    }} placeholder="Margin" defaultValue={data.logo.margin} onChange={this.handleMarginChange}/>
                                                </div>
                                                <button type="submit" className="btn btn-success">Submit</button>
                                            </form>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                    </div>
                                    </div>
                                    <div className= "col" style={{overflow: "auto"}}>
                                        <div style={{ height: this.state.height + "px", width: this.state.width + "px", color: this.state.color, fontSize: this.state.fontSize + "pt",
                                                        backgroundColor: this.state.backgroundColor, borderColor: this.state.borderColor, 
                                                        borderRadius: this.state.borderRadius + "px", borderWidth: this.state.borderWidth + "px",
                                                        padding: this.state.padding + "px", margin: this.state.margin + "px", overflow: "auto",
                                                        alignContent: "center", borderStyle: "solid"}}>
                                                        {this.state.text}
                                        </div>
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