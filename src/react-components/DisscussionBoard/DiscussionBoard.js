import React from 'react';
import Comment from "../CommentContainer/Comment"
class DiscussionBoard extends React.Component {

    render() {
        const { comments } = this.props;
        return (
            <div>

                <Comment comments={comments}></Comment>

            </div>
        )
    }

}
export default DiscussionBoard