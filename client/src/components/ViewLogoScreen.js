import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            height
            width
            text { text color fontSize x y}
            images {url}
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
            lastUpdate
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class TextDivs extends React.Component {
    render() {
        return (
            <div> 
                {
                    this.props.text.map(function(textType) {
                        return <div style = {{position : "relative", left : textType["x"] + "px", top : textType["y"] + "px", color : textType["color"], fontSize : textType["fontSize"] + "pt"}}> {textType["text"]}</div>
                    })
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
                    this.props.images.map(function(image) {
                       return <img style = {{position : "relative", left : image["x"] + "px", top : image["y"] + "px", }} src={image["url"]} alt="https://media.geeksforgeeks.org/wp-content/uploads/20190506164011/logo3.png" width={image["width"]} height={image["height"]} />
                    })
                }
            </div>
        );
    }
}

class ViewLogoScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    let allText = "";
                    for(let i = 0; i < data.logo.text.length; i++) {
                        allText += data.logo.text[i]["text"] + "\n";
                    }
                    let allURLS = "";
                    for(let i = 0; i < data.logo.images.length; i++) {
                        allURLS += data.logo.images[i]["url"] + "\n";
                    }
                    return (
                        <div className="container">
                            <div className="row ">
                            <div className= "col">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4><Link to="/">Home</Link></h4>
                                    <h3 className="panel-title">
                                        View Logo
                                    </h3>
                                </div>
                                <div className="panel-body">
                                    <dl>
                                        <dt>Height:</dt>
                                        <dd>{data.logo.height}</dd>
                                        <dt>Width:</dt>
                                        <dd>{data.logo.width}</dd>
                                        <dt>Text:</dt>
                                        <dd>{allText}</dd>
                                        <dt>Images:</dt>
                                        <dd>{allURLS}</dd>
                                        <dt>Background Color:</dt>
                                        <dd>{data.logo.backgroundColor}</dd>
                                        <dt>Border Color:</dt>
                                        <dd>{data.logo.borderColor}</dd>
                                        <dt>Border Radius:</dt>
                                        <dd>{data.logo.borderRadius}</dd>
                                        <dt>Border Width:</dt>
                                        <dd>{data.logo.borderWidth}</dd>
                                        <dt>Padding:</dt>
                                        <dd>{data.logo.padding}</dd>
                                        <dt>Margin:</dt>
                                        <dd>{data.logo.margin}</dd>
                                        <dt>Last Updated:</dt>
                                        <dd>{data.logo.lastUpdate}</dd>
                                    </dl>
                                    <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeLogo, { loading, error }) => (
                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo._id } });
                                                    }}>
                                                    <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                </div>
                            </div>
                            </div>
                            <div className= "col" style={{top: "6em", overflow: "auto"}}>
                                <div style={{ height: data.logo.height + "px", width: data.logo.width + "px",
                                          backgroundColor: data.logo.backgroundColor, borderColor: data.logo.borderColor, 
                                          borderRadius: data.logo.borderRadius + "px", borderWidth: data.logo.borderWidth + "px",
                                          padding: data.logo.padding + "px", margin: data.logo.margin + "px", overflow: "auto",
                                          borderStyle: "solid"}}>
                                          <TextDivs textNum = {data.logo.text.length} text = {data.logo.text}/>
                                          <ImageDivs images = {data.logo.images}/>
                                </div>
                            </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;