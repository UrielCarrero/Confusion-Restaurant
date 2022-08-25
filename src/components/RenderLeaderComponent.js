import React from 'react';
import {Media} from 'reactstrap';



const RenderLeader = (props) =>
{
    return (
        <Media className="row">

            <Media object className="ml-1 mr-5" width="8.5%" src={props.leader.image} alt={props.leader.name}></Media>
            <Media body >
                <Media className="text-left" heading>{props.leader.name}</Media>
                <p className="text-left">{props.leader.designation}</p>
                <p className="text-left">{props.leader.description}</p>
                
            </Media>
        </Media>
    )           
}



export default RenderLeader;