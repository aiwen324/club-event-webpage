import React from 'react';
import './style.css'
class Comment extends React.Component{


    constructor(props) {
        super(props);
    }

    render(){
        const {comments} = this.props;
        return (
            <div class="commentContainer">
                <div class="commentIconContainer">
                    <img class='commentIcon' src={require("./icon1.jpg")}/>
                </div>
                <div class='comment'>
                    <p id="userId">{comments.poster}</p>
                    <p id="content">{comments.content}</p>
                </div>
                <div class='timeContainer'>
                    <p class='time'>{comments.date}</p>
                </div>
            </div>
        )
    }
}

export default Comment