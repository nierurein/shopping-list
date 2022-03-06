import React from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends React.Component {

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  }

  render() {
    const {items} = this.props.itemReducer;
    return(
      <Container>
        <ListGroup>
          <TransitionGroup className='shopping-list'>
            {items.map(({id, name}) => (
              <CSSTransition key={id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  <Button
                    className='remove-btn'
                    color='danger'
                    size='sm'
                    onClick={this.onDeleteClick.bind(this, id)}
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

export default connect(mapStateToProps, {getItems, deleteItem})(ShoppingList);