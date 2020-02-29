import React from 'react';
import Table from "@material-ui/core/Table";
import Comment from "../CommentContainer/Comment"
import TableBody from "@material-ui/core/TableBody";
class DiscussionBoard extends React.Component{

    render(){
        return (
            <Table className='DiscussionContainer'>
                 <Comment></Comment>
            </Table>
        )
    }

}
export default DiscussionBoard