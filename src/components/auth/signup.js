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

class Signup extends Component {

    handleFormSubmit(formProps) {
        // Call action creator to sign up the user!
        this.props.signupUser(formProps);
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
        const { handleSubmit, fields: { username, password, passwordConfirm }} = this.props;

        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className='form-group'>
                    <Field component={renderField}
                        className='form-control'
                        name='username'
                        type='text'
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
                <fieldset className='form-group'>
                    <Field component={renderField}
                        className='form-control'
                        name='passwordConfirm'
                        type='password'
                        label='Confirm Password:'
                        />
                </fieldset>
                {this.renderError()}
                <button action="submit" className='btn btn-primary'>Sign up!</button>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.username) {
        errors.username = 'Required'
    }

    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password !== values.passwordConfirm) {
        errors.password = 'Passwords must match';
    }

    if (!values.passwordConfirm) {
        errors.passwordConfirm = 'Required'
    }

    return errors;
}

const signupForm = reduxForm({
    form: 'signup',
    validate,
    fields: ['username', 'password', 'passwordConfirm']
})(Signup);

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(signupForm);
