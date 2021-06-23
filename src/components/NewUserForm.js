import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

class NewUserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: ''
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.onSubmit({
            firstName: this.state.firstName,
            lastName: this.state.lastName
        })

        this.setState({
            firstName: '',
            lastName: ''
        })
    }

    firstNameChangeHandler = e => {
        this.setState({
            firstName: e.target.value
        })
    }

    lastNameChangeHandler = e => {
        this.setState({
            lastName: e.target.value
        })
    }

    render() {
  //      console.log(this.state.firstName, this.state.lastName);
        return (
            <Form onSubmit={(e) => this.handleSubmit(e)}> 
                <FormGroup>
                    <label>
                        First name
                    </label>
                    <Input required placeholder="First name"  value={this.state.firstName} onChange={e => this.firstNameChangeHandler(e)} />
                </FormGroup>
                <FormGroup>
                    <label>
                        Last name
                    </label>
                    <Input required placeholder="Last name"  value={this.state.lastName} onChange={e => this.lastNameChangeHandler(e)} />
                </FormGroup>
                <FormGroup>
                    <Button type="submit" color="primary" className="btn " style={{marginTop: '5px', marginBottom: '5px', width: '100%'}}>
                        Create
                    </Button>
                </FormGroup>
            </Form>
        )
        
    }
}

export default NewUserForm