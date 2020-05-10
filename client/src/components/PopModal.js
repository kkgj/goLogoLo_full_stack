import { Button, Modal } from 'react-bootstrap';
import React, { Component } from 'react';

export default class PopModal extends Component {
    constructor(props) {
        super(props);
        this.state={
            show: false,
            message: ""
        }
    }
    handleModal = () => {
        if (this.props.flag) {
            if (this.props.message) {
                this.setState({ show: !this.state.show, message: "You need to have at least one text!"});
            } else {
                this.setState({ show: !this.state.show, message: "No more image to delete!"});
            }
        }
    }
    render() {
        return (
            <div>
                <Button className="btn btn-secondary" onClick={this.handleModal}>-</Button>
                <Modal show={this.state.show} onHide={this.handleModal}>
                    <Modal.Header closeButton>Warning</Modal.Header>
                    <Modal.Body>{this.state.message}</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}