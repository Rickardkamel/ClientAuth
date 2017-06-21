import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import * as actions from '../../actions';
import { connect } from 'react-redux';

const renderField = ({ className, input, label, type, placeholder, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input className={`${className ? className : ''}`} {...input} placeholder={placeholder} type={type} />
            {touched && error && <span className='error'>{error}</span>}
        </div>
    </div>
)

class Signin extends Component {

    handleFormSubmit({username, password}) {
        console.log('USERNAME:', username);
        console.log('PASSWORD:', password);

        // Need to do something to log user in

        this.props.signinUser({ username, password });
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
                    <Field component={renderField}
                        className='form-control'
                        name='username'
                        type='username'
                        label='Username:'
                        />
                </fieldset>
                <fieldset className='form-group'>
                    <Field component={renderField}
                        className='form-control'
                        name='password'
                        type='password'
                        label='Password:'
                        />
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