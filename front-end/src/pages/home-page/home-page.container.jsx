import React from 'react';
import TableWrapper from '../../components/table-wrapper/table-wrapper.component';
import InputsForm from '../../components/message-inputs/message-inputs.component';
import './home-page.styles.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sendMessageTriggered: false,
            posts: []
        }
    }

    finishEditHandler = postData => {
        // Set up data 
        let url = 'http://localhost:3001/feed/post';
        let method = 'POST';
         

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: postData.title,
                content: postData.content
            })
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Creating or editing a post failed!');
                }
                return res.json();
            })
            .then(resData => {
                const post = {
                    _id: resData.post._id,
                    title: resData.post.title,
                    content: resData.post.content,
                    creator: resData.post.creator,
                    createdAt: resData.post.createdAt
                };
                this.setState(prevState => {
                    let updatedPosts = [...prevState.posts];
                    if (prevState.editPost) {
                        const postIndex = prevState.posts.findIndex(
                            p => p._id === prevState.editPost._id
                        );
                        updatedPosts[postIndex] = post;
                    } else if (prevState.posts.length < 2) {
                        updatedPosts = prevState.posts.concat(post);
                    }
                    return {
                        posts: updatedPosts,
                        isEditing: false,
                        editPost: null,
                        editLoading: false
                    };
                });
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isEditing: false,
                    editPost: null,
                    editLoading: false,
                    error: err
                });
            });
    };

    handleClick = () => {
        const previousState = this.state.sendMessageTriggered;
        this.setState({
            sendMessageTriggered: !previousState
        })
    }


    render() {
        return (
            <div>
                
                {
                    this.state.sendMessageTriggered ? <InputsForm handleClick={this.handleClick}/> : 
                        <div className='buttonWrapper'>
                            <div className="sendMessage" >
                                <button type="submit" onClick={this.handleClick}> Send Message </button>
                            </div>
                        </div>

                }
                <TableWrapper />


            </div>
        )
    }

};

export default HomePage;