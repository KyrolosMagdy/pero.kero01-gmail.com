import React, { Component } from 'react';
import './form.styles.css';


const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    Object.values(formErrors).forEach(val => {
        val.length > 0 ? valid = false : valid = true
    })

    Object.values(rest).forEach(val => {
        !val.length && (valid = false)
    })
    return valid;
}

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            formErrors: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {onRouteChange} = this.props;

        if (formValid(this.state)) {
            console.log(`
        Submitting
        First Name: ${this.state.firstName}
        lastName: ${this.state.lastName},
        email: ${this.state.email},
        password: ${this.state.password},
      `);
            onRouteChange('home');
        } else {
            console.error('error')
        }
    };

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'firstName':
                formErrors.firstName = value.length < 3 ? 'Minimum 3 characaters required' : '';
                break;

            case 'lastName':
                formErrors.lastName = value.length < 3 ? 'Minimum 3 characaters required' : '';
                break;
            case 'email':
                formErrors.email = emailRegex.test(value) ? '' : 'invalid email address';
                break;
            case 'password':
                formErrors.password = value.length < 6 ? 'Minimum 6 characaters required' : '';
                break;

            default:
                break;
        }
        this.setState({
            formErrors, [name]: value
        }, () => console.log(this.state))
    }

    render() {
        const { formErrors } = this.state;
        const { onRouteChange } = this.props;
        return (
            <div className="wrapper" >
                <div className="form-wrapper">
                    <h1> Create account </h1>
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="firstName" >
                            <label htmlFor="firstName" > First Name: </label>
                            <input
                                type="text"
                                className={formErrors.firstName.length > 0 ? "error" : null}
                                placeholder="First Name"
                                name="firstName"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.firstName.length > 0 &&
                                <span className="errorMessage"> {formErrors.firstName} </span>
                            }
                        </div>
                        <div className="lastName" >
                            <label htmlFor="lastName" > Last Name: </label>
                            <input
                                type="text"
                                className={formErrors.lastName.length > 0 ? "error" : null}
                                placeholder="Last Name"
                                name="lastName"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.lastName.length > 0 &&
                                <span className="errorMessage"> {formErrors.lastName} </span>
                            }
                        </div>
                        <div className="email" >
                            <label htmlFor="email" > E-Mail: </label>
                            <input
                                type="email"
                                className={formErrors.email.length > 0 ? "error" : null}
                                placeholder="E-Mail"
                                name="email"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.email.length > 0 &&
                                <span className="errorMessage"> {formErrors.email} </span>
                            }
                        </div>
                        <div className="password" >
                            <label htmlFor="password" > Password: </label>
                            <input
                                type="password"
                                className={formErrors.password.length > 0 ? "error" : null}
                                placeholder="Password"
                                name="password"
                                noValidate
                                onChange={this.handleChange}
                            />
                            {formErrors.password.length > 0 &&
                                <span className="errorMessage"> {formErrors.password} </span>
                            }
                        </div>
                        <div className="createAccount" >
                            <button type="submit"> Create Account</button>
                            <small className='smallButton' onClick={() => onRouteChange('signin')}> Already have an account</small>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Form;