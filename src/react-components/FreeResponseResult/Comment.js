import React from 'react';
import './style.css'
class FreeResponseResult extends React.Component{

    render(){
        
        return (
            <div>
                <div className='survey_question'>
                    Do you have anything else to tell us? 
                </div>
                <div className="ReseponseContainer">
                    <div className='Reseponse'>
                        <p id="userId">IMNF</p>
                        <p id="content">I hope that there will be more interaction between singer and viewers</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default FreeResponseResult