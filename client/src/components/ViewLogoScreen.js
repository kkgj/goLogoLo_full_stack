import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { Rnd } from 'react-rnd';
import { exportComponentAsPNG } from "react-component-export-image";

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

class ViewLogoScreen extends Component {

    constructor(props) {
        super(props);
        this.componentRef = React.createRef();
    }

    render() {
        return (
            <Query fetchPolicy='network-only' pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div className="container">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4><Link to="/" className={"btn btn-secondary btn-block"}>Home</Link></h4>
                                    <h3 className="panel-title">
                                        View Logo
                                    </h3>
                                </div>
                                <div className="panel-body row">
                                    <div className="col-6">
                                        <dl>
                                            <dt>Text:</dt>
                                            <dd>{data.logo.textArray.map((element) => element.text + " ")}</dd>
                                            <dt>Color:</dt>
                                            <dd>{data.logo.textArray.map((element) => element.color + " ")}</dd>
                                            <dt>BackgroundColor:</dt>
                                            <dd>{data.logo.backgroundColor}</dd>
                                            <dt>BorderColor:</dt>
                                            <dd>{data.logo.borderColor}</dd>
                                            <dt>Font Size:</dt>
                                            <dd>{data.logo.textArray.map((element) => element.fontSize + " ")}</dd>
                                            <dt>Border Width:</dt>
                                            <dd>{data.logo.borderWidth}</dd>
                                            <dt>Border Radius:</dt>
                                            <dd>{data.logo.borderRadius}</dd>
                                            <dt>Padding:</dt>
                                            <dd>{data.logo.padding}</dd>
                                            <dt>Margin:</dt>
                                            <dd>{data.logo.margin}</dd>
                                            <dt>Height:</dt>
                                            <dd>{data.logo.height}</dd>
                                            <dt>Width:</dt>
                                            <dd>{data.logo.width}</dd>
                                            <dt>Image:</dt>
                                            <dd>{data.logo.imageArray.map((element) => element.image + " ")}</dd>
                                            <dt>Last Updated:</dt>
                                            <dd>{data.logo.lastUpdate}</dd>
                                        </dl>
                                        <div className="row">
                                            <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                                {(removeLogo, { loading, error }) => (
                                                    <div>
                                                        <form
                                                            onSubmit={e => {
                                                                e.preventDefault();
                                                                removeLogo({ variables: { id: data.logo._id } });
                                                            }}>
                                                            <Link to={`/edit/${data.logo._id}`} className="btn btn-success">Edit</Link>&nbsp;
                                                        <button type="submit" className="btn btn-danger">Delete</button>&nbsp;
                                                    </form>
                                                        {loading && <p>Loading...</p>}
                                                        {error && <p>Error :( Please try again</p>}
                                                    </div>
                                                )}
                                            </Mutation>
                                            <React.Fragment>
                                                <button className="btn btn-primary" onClick={() => exportComponentAsPNG(this.componentRef)}>
                                                    Export
                                                </button>
                                            </React.Fragment>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <span
                                            ref={this.componentRef}
                                            style={{
                                                display: "inline-block",
                                                backgroundColor: data.logo.backgroundColor,
                                                borderColor: data.logo.borderColor,
                                                borderStyle: "solid",
                                                borderWidth: data.logo.borderWidth + "px",
                                                borderRadius: data.logo.borderRadius + "px",
                                                padding: data.logo.padding + "px",
                                                margin: data.logo.margin + "px",
                                                whiteSpace: "pre",
                                                height: data.logo.height + "px",
                                                width: data.logo.width + "px",
                                            }}>
                                            <div style={{ position: "absolute" }}>
                                                {data.logo.imageArray.map((element, index) =>
                                                    <Rnd
                                                        disableDragging="true"
                                                        enableResizing="false"
                                                        key={index}
                                                        size={{ width: element.imageWidth, height: element.imageHeight }}
                                                        position={{ x: element.imageX, y: element.imageY }}
                                                    >
                                                        <img
                                                            src={element.image}
                                                            alt=""
                                                            style={{ height: "100%", width: "100%" }}
                                                            draggable="false"
                                                        />
                                                    </Rnd>
                                                )}
                                            </div>
                                            <div style={{ position: "absolute" }}>
                                                {data.logo.textArray.map((t, index) =>
                                                    <Rnd
                                                        disableDragging="true"
                                                        enableResizing="false"
                                                        style={{ zIndex: t.text.zIndex }}
                                                        key={index}
                                                        position={{ x: t.x, y: t.y }}
                                                    >
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