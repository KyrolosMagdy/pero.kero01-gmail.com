import React from 'react';
import './signin-form.styles.css';

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


class SignIn extends React.Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            formErrors: {
                email: '',
                password: ''
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {onRouteChange} = this.props;

        if (formValid(this.state)) {
            console.log(`
        Submitting
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
        return (
            <div className="wrapper" >
                <div className="form-wrapper">
                    <h1> SignIn </h1>
                    <form onSubmit={this.handleSubmit} noValidate>
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
                            <button type="submit"> Sign In</button>
                            <small className='smallButton' onClick = {() => this.props.onRouteChange('register')}> Create Account </small>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }

}

export default SignIn;