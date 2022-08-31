import React from 'react';
import {Media} from 'reactstrap';
import { baseURL } from '../shared/baseURL';
import Loading from './LoadingComponent';

const RenderLeader = (props) =>
{
    console.log(props.isLoading)
    if (props.isLoading){
        return(
        <div className="container">
            <div className='row'>
                <Loading />
            </div>
        </div>
        )
    }
    else if(props.errMess != null){
        return(
            <div className="container">
                <div classNmae="row">
                    <h1 className="text-danger">{props.errMess}</h1>
                </div>
            </div>
        )
    }
    else
    { 
        const leaders = props.leaders.map((leader) => {
            return (         
                <Media className="row">
                    <Media className="col-md-2 col-12">
                        <Media object className="pull-left" width="75%" src={baseURL + leader.image} alt={leader.name}></Media>
                    </Media>
                    <Media body className="col-md-10 col-12">
                        <Media className="text-start" heading>{leader.name}</Media>
                        <p className="text-start">{leader.designation}</p>
                        <p className="text-start">{leader.description}</p>
                        
                    </Media>
                </Media>
            );
            });
        return(
        <Media list>
            {leaders}
        </Media>);
    }
}



export default RenderLeader;