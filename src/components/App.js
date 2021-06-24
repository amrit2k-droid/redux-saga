import React, { Component } from "react";
import {connect} from 'react-redux';
import {getUsersRequest, createUserRequest, deleteUserRequest, usersError} from '../actions/users';
import {ListGroup, ListGroupItem, Button, Alert} from 'reactstrap';
import NewUserForm from './NewUserForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
    this.props.getUsersRequest();
  }

  handleSubmit = ({firstName, lastName}) => {
    console.log(firstName);
    this.props.createUserRequest({firstName, lastName})
  }

  deleteUserHandler = id => {
    this.props.deleteUserRequest(id)
  }

  dismissAlertHandler = () => {
    this.props.userError(' ')
  }

  render() {
    const users = this.props.users;
    return(
      <div style={{margin: '0 auto', padding: '20px', maxWidth: '600px'}}>
        <Alert color="info" isOpen={!!this.props.error} toggle={() => this.dismissAlertHandler()}>
           {this.props.error}
        </Alert>
        <NewUserForm onSubmit={this.handleSubmit} />
        <ListGroup>
            {users.map(user => {
                return <ListGroupItem key={user.id}>
                          <section style={{display: 'flex'}}>
                            <div style={{flexGrow: 1, margin: 'auto 0'}}>
                              {user.firstName} {user.lastName}
                            </div>
                            <div>
                              <Button outline color="danger" onClick={() => this.deleteUserHandler(user.id)}>
                                Delete
                              </Button>
                            </div>
                          </section>
                        </ListGroupItem>
            })}
        </ListGroup>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUsersRequest: () => dispatch(getUsersRequest()),
    createUserRequest: ({firstName, lastName}) => dispatch(createUserRequest({firstName, lastName})),
    deleteUserRequest: (id) => dispatch(deleteUserRequest(id)),
    userError: (error) => dispatch(usersError(error))
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.items,
    error: state.users.error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
