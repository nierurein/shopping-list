import React from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {v4 as uuidv4} from 'uuid';
import {connect} from 'react-redux';
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends React.Component {

  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const {items} = this.props.itemReducer;
    return(
      <Container>
        <Button
          color='dark'
          style={{marginBottom: '2rem'}}
          onClick={() => {
            const name = prompt('Enter item');
            if(name) {
              this.setState(state => ({
                items: [...state.items, {id: uuidv4(), name}]
              }));
            }
          }}
        >Add item</Button>

        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({id, name}) => (
              <CSSTransition key={id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    onClick={() => {
                      this.setState((state) => ({
                        items: state.items.filter((item) => item.id !== id)
                      }));
                    }}
                  >&times;</Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>

      </Container>
    );
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  itemReducer: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  itemReducer: state.itemReducer
});

export default connect(mapStateToProps, {getItems})(ShoppingList);