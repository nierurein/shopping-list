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
  NavLink,
  Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  state = {
    modal: false,
    email: '',
    password: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    errorReducer: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {email, password} = this.state;

    const user = {email, password};

    // Attempt login
    this.props.login(user);
  }

  componentDidUpdate(prevProps) {
    const {errorReducer, isAuthenticated} = this.props;
    if(errorReducer !== prevProps.errorReducer) {
      // Check for login error
      if(errorReducer.id === 'LOGIN_FAIL') {
        this.setState({
          msg: errorReducer.msg.msg
        });
      } else {
        this.setState({msg: null});
      }
    }

    // If authenticated close modal
    if(this.state.modal) {
      if(isAuthenticated) {
        this.toggle();
      }
    }
  }

  render() {
    return(
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Login
        </NavLink>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert>: null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
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
                >Login</Button>
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

export default connect(mapStateToProps, {login, clearErrors})(LoginModal);