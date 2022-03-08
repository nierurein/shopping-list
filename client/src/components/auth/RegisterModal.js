import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class RegisterModal extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    errorReducer: PropTypes.object.isRequired
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

    // close modal
    this.toggle();
  }

  render() {
    return(
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Register
        </NavLink>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                  type="text"
                  name='name'
                  id='name'
                  placeholder="Add name"
                  onChange={this.onChange}
                  className='mb-3'
                />

                <Label for='email'>Email</Label>
                <Input
                  type="email"
                  name='email'
                  id='email'
                  placeholder="Add email"
                  onChange={this.onChange}
                  className='mb-3'
                />

                <Label for='password'>Password</Label>
                <Input
                  type="password"
                  name='password'
                  id='password'
                  placeholder="Add password"
                  onChange={this.onChange}
                  className='mb-3'
                />
                <Button
                  color='dark'
                  style={{marginTop:'2rem'}}
                  block
                  onSubmit={this.onSubmit}
                >Register</Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  errorReducer: state.errorReducer
});

export default connect(mapStateToProps, {})(RegisterModal);