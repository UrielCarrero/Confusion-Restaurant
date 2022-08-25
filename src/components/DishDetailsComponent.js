import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Media, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';

const RenderDish = ({dish}) => {
    if (dish != null){
        
        return(

            <Card className="card">
            <CardImg className="card-top-image" top src={dish.image} alt={dish.name} />
            <CardBody className="card body">
                <CardTitle className="card-title font-weight-bold">{dish.name}</CardTitle>
                <CardText className="text-start">{dish.description}</CardText>
            </CardBody>
            </Card>  
        );
    }           
    else
        return(
            <div></div>
        );
}

function RenderComments({comments})
{
    return( comments.map((comment) => {
        return (

            <React.Fragment>
                <Media className="text-left mt-3">{comment.comment}</Media>
                <Media className="text-left mt-3">-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </Media>
            </React.Fragment>
            );
        }
        )
    );  
}


const RenderDishDetails = (props) => 
{
    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/menu">Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                    {props.dish.name}
                    </BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12 text-left">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div  className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div  className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div> 
            </div>
        </div>
        
    );     
}

export default RenderDishDetails;