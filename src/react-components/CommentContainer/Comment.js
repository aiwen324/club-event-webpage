import React from 'react';
import './style.css'
class Comment extends React.Component{


    constructor(props) {
        super(props);
    }

    render(){
        const {comments} = this.props;
        return (
            <div className="commentContainer">
                <div className="commentIconContainer">
                    <img className='commentIcon' src={require("./icon1.jpg")}/>
                </div>
                <div className='comment'>
                    <p id="userId">{comments.poster}</p>
                    <p id="content">{comments.content}</p>
                </div>
                <div className='timeContainer'>
                    <p className='time'>{comments.date}</p>
                </div>
            </div>
        )
    }
}

export default Comment