import React from 'react';
import './style.css'
class Comment extends React.Component{

    render(){
        
        return (
            <div class="commentContainer">
                <div class="commentIconContainer">
                    <img class='commentIcon' src={require("./icon1.jpg")}/>
                </div>
                <div class='comment'>
                    <p id="userId">IMNF</p>
                    <p id="content">I love this activity!</p>
                </div>
                <div class='timeContainer'>
                    <p class='time'>2 hours ago</p>
                </div>
            </div>
        )
    }
}

export default Comment