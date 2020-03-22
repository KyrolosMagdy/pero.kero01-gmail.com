import React from 'react';
import './message-input.styles.css';

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


class InputsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageTitle: '',
            messageContent: '',
            to: '',
            formErrors: {
                messageTo: '',
                messageTitle: '',
                messageContent: ''
            }
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const {onRouteChange} = this.props;

        if (formValid(this.state)) {
            console.log(`
        Submitting
        messageTitle: ${this.state.messageTitle}
        messageContent: ${this.state.messageContent},
        email: ${this.state.messageTo}
      `);
            onRouteChange('home');
        } else {
            console.error('error')
        }
    };

    handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let formErrors = this.state.formErrors;

        switch (name) {
            case 'messageTitle':
                formErrors.messageTitle = value.length < 3 ? 'Minimum 3 characaters required' : '';
                break;

            case 'messageContent':
                formErrors.messageContent = value.length < 20 ? 'Minimum 20 characaters required' : '';
                break;
            case 'messageTo':
                formErrors.messageTo = emailRegex.test(value) ? '' : 'invalid email address';
                break;

            default:
                break;
        }
        this.setState({
            formErrors, [name]: value
        }, () => console.log(this.state))
    
    }

    handleClick = (e) => {
        e.preventDefault();
        const {handleClick} = this.props;
        handleClick();
    }

    render() {
        return (
            <div className="wrapper-2" >
                <div className="form-wrapper">
                <div className='remove-button' onClick={this.handleClick}>
                    &#10005;
                </div>


                    <h1> Send a New Message </h1>
                    <form onSubmit={this.handleInputChange} noValidate>
                        <div className="messageTo" >
                            <label htmlFor="messageTo" > To: </label>
                            <input
                                type="email"
                                className={this.state.formErrors.messageTo.length > 0 ? "error" : null}
                                placeholder="Email like asfdfgd12@jhffd.com"
                                name="messageTo"
                                noValidate
                                onChange={this.handleInputChange}
                            />
                            {this.state.formErrors.messageTo.length > 0 &&
                                <span className="errorMessage"> {this.state.formErrors.messageTo} </span>
                            }
                        </div>
                        <div className="messageTitle" >
                            <label htmlFor="messageTitle" > Title: </label>
                            <input
                                type="text"
                                className={this.state.formErrors.messageTitle.length > 0 ? "error" : null}
                                placeholder="Add Message title"
                                name="messageTitle"
                                noValidate
                                onChange={this.handleInputChange}
                            />
                            {this.state.formErrors.messageTitle.length > 0 &&
                                <span className="errorMessage"> {this.state.formErrors.messageTitle} </span>
                            }
                        </div>
                        <div className="messageContent" >
                            <label htmlFor="messageContent" > Message: </label>
                            <textarea
                                type="messageContent"
                                className={this.state.formErrors.messageContent.length > 0 ? "error" : 'textarea'}
                                placeholder="Enter Your Message"
                                name="messageContent"
                                noValidate
                                onChange={this.handleInputChange}
                            />
                            {this.state.formErrors.messageContent.length > 0 &&
                                <span className="errorMessage"> {this.state.formErrors.messageContent} </span>
                            }
                        </div>
                        <div className="messageButton" >
                            <button type="submit"> Send Message </button>
                        </div>
                    </form>
                </div>
            </div>
            // <div className='container' >
            //     <div className='form-wrapper'>
            //         <form>
            //             <label>To: </label>
            //             <input
            //                 type='email'
            //                 name='messageTo'
            //                 onChange={this.handleInputChange}
            //             />
            //             <label> Title </label>
            //             <input
            //                 type='text'
            //                 name='messageTitle'
            //                 onChange={this.handleInputChange}
            //             />

            //             <textarea name='messageContent' onChange={this.handleInputChange} />
            //         </form>
            //     </div>
            // </div>
        );


    }
}

export default InputsForm;