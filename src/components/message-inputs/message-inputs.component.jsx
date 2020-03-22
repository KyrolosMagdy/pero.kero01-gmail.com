import React from 'react';
import './message-input.styles.css';

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

    handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`name: ${name},
        value: ${value}
    `)
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