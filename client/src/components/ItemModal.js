import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';

class ItemModal extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  state = {
    modal: false,
    item: ''
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      name: this.state.item
    }
    
    // call addItem action
    this.props.addItem(newItem);

    // close modal
    this.toggle();
  }

  render() {
    return(
      <div>
        <Button
          color='dark'
          style={{marginBottom:'2rem'}}
          onClick={this.toggle}
        >Add item</Button>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Add to shopping list</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='item'>Item</Label>
                <Input
                  type="text"
                  name='item'
                  id='item'
                  placeholder="Add shopping item"
                  onChange={this.onChange}
                />
                <Button
                  color='dark'
                  style={{marginTop:'2rem'}}
                  block
                  onSubmit={this.onSubmit}
                >Add item</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  itemReducer: state.itemReducer
});

export default connect(mapStateToProps, {addItem})(ItemModal);