import React from 'react';
import Table from "@material-ui/core/Table";
import Comment from "../CommentContainer/Comment"
import TableBody from "@material-ui/core/TableBody";
class DiscussionBoard extends React.Component{

    constructor(props) {
        super(props)
    }

    render(){
        const { comments } = this.props;
        return (
            <Table className='DiscussionContainer'>
                 <Comment comments={comments}></Comment>
            </Table>
        )
    }

}
export default DiscussionBoard