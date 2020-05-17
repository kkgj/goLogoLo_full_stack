import React, { Component } from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import EditSubScreen from './EditSubScreen'

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

class EditLogoScreen extends Component {

    render() {
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    return(
                    <EditSubScreen logo={data.logo}/>);
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;