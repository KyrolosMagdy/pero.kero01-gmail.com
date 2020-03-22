import React from 'react';
import './signin-form.styles.css';

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