import React from 'react';
import TableWrapper from '../../components/table-wrapper/table-wrapper.component';
import InputsForm from '../../components/message-inputs/message-inputs.component';
import './home-page.styles.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sendMessageTriggered: false
        }
    }

    handleClick = () => {
        const previousState = this.state.sendMessageTriggered;
        this.setState({
            sendMessageTriggered: !previousState
        })
    }
    render() {
        return (
            <div>
                <TableWrapper />
                {
                    this.state.sendMessageTriggered ? <InputsForm onclick={this.state.handleClick}/> : 
                        <div className='buttonWrapper'>
                            <div className="sendMessage" >
                                <button type="submit" onClick={this.handleClick}> Send Message </button>
                            </div>
                        </div>

                }


            </div>
        )
    }

};

export default HomePage;