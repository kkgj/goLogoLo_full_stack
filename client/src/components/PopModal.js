import { Button, Modal, ButtonGroup } from 'react-bootstrap';
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
        this.props.handleDelete();
        if (this.props.flag) {
            if (this.props.message) {
                this.setState({ show: !this.state.show, message: "You need to keep at least one text!"});
            } else {
                this.setState({ show: !this.state.show, message: "No more image to delete!"});
            }
        }
    }
    render() {
        return (
            <div>
                <ButtonGroup aria-label="Basic example">
                <Button variant="secondary" onClick={this.props.handleAdd}>+</Button>
                <Button variant="secondary" onClick={this.handleModal}>-</Button>
                </ButtonGroup>
                <Modal show={this.state.show} onHide={this.handleModal}>
                    <Modal.Header closeButton><h5>Delete Warning</h5></Modal.Header>
                    <Modal.Body>{this.state.message}</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}