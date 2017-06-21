import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signin extends Component {

    handleFormSubmit({username, password}) {
        console.log('USERNAME:', username);
        console.log('PASSWORD:', password);

        // Need to do something to log user in

        this.props.signinUser({ username, password });
    }

    renderInput(field) {
        if (!field.className) { field.className = "form-control" }
        if (!field.type) { field.type = "text" }

        return (
            <Field name={field.name} id={field.name} type={field.type} className={field.className} component="input" />
        )
    }

    renderError() {
        if (this.props.errorMessage) {
            return (
                <div className='alert alert-danger'>
                    <strong>{this.props.errorMessage}</strong>
                </div>
            );
        }
    }

    render() {
        const { handleSubmit, fields: { username, password }} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className='form-group'>
                    <label>username:</label>
                    {this.renderInput({ name: 'username', type: 'text' })}
                </fieldset>
                <fieldset className='form-group'>
                    <label>password:</label>
                    {this.renderInput({ name: 'password', type: 'password' })}
                </fieldset>
                {this.renderError()}
                <button action="submit" className='btn btn-primary'>Sign in</button>
            </form>
        );
    }
}

const signinForm = reduxForm({
    form: 'signin',
    fields: ['username', 'password']
})(Signin);

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(signinForm);


// export default reduxForm({
//     form: 'signin',
//     fields: ['username', 'password']
// }, null, actions)(Signin);