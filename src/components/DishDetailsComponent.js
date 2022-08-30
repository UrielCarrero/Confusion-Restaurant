import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Media, Breadcrumb, BreadcrumbItem,
    Modal, ModalHeader, ModalBody, Row, Col, Label, Input, Button } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import Loading from './LoadingComponent';
import { baseURL } from '../shared/baseURL';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

const RenderDish = ({dish}) => {
    if (dish != null){
        
        return(

            <Card className="card">
            <CardImg className="card-top-image" top src={baseURL + dish.image} alt={dish.name} />
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

function RenderComments({comments}, {toggleModal})
{
    return( 
        comments.map((comment) => {
        return (

            <React.Fragment>
                <Media className="text-start mt-3">{comment.comment}</Media>
                <Media className="text-start mt-3">-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </Media>
            </React.Fragment>
            );
        }
        )
        
    );  
}


class RenderDishDetails extends Component  
{
    constructor(props)
    {
        super(props);
        this.state={
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });  
    }

    handleSubmit(values)
    {
        alert(JSON.stringify(values));
        this.props.postComment(this.props.dish.id, values.rating, values.name, values.comment);
        this.toggleModal();
    }

    render(){
        if(this.props.isLoading)
        {
           return(
            <div className="container">
                <div className='row'>
                    < Loading />
                </div>
            </div>
           ) 
        }
        else if(this.props.errMess)
        {
            return(
                <div className="container">
                    <div className='row'>
                        <h4 className="text-danger">{this.props.errMess}</h4>
                    </div>
                </div>
               ) 
        }
        else if(this.props.dish!=null)
        {
            return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                        {this.props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12 text-left">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <RenderDish dish={this.props.dish} />
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                        <RenderComments comments={this.props.comments} />
                        <Button onClick={this.toggleModal} className="submit mt-4">Submit Comment</Button>
                    </div> 
                </div>
                <div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Label htmlFor="rating">Rating</Label>
                                        <Control.select model=".rating" id="rating" name="rating" 
                                        className="form-control m-2" defaultValue="5">
                                            <option value="5">5</option>
                                            <option value="4">4</option>
                                            <option value="3">3</option>
                                            <option value="2">2</option>
                                            <option value="1">1</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Label htmlFor="name">Your Name</Label>
                                        <Control.text model=".name" name="name" id="name" 
                                        className="form-control m-2"
                                        validators={{
                                            required, minLength: minLength(2), maxLength: maxLength(25)
                                        }}/>                            
                                    </Col>
                                    <Errors className='text-danger' model=".name" show="touched"
                                    messages={{
                                        required:"This field is mandatory ",
                                        minLength:"This field has to contain 2 characters at least ",
                                        maxLength:"This field has to contain less than 25 characters "
                                    }}></Errors>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Label htmlFor="comment">Comment</Label>
                                        <Control.textarea model=".comment" name="comment" 
                                        id="comment" rows="12" className="form-control m-2"
                                        validators={{required}}/>                            
                                    </Col>
                                    <Errors className='text-danger' model=".name" show="touched"
                                    messages={{
                                        required:"This field is mandatory "
                                    }}></Errors>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}> 
                                        <Button className="submit" type="submit">Submit</Button>
                                    </Col>
                                </Row>  
                            </LocalForm>
                        </ModalBody>
                    </Modal>
                </div>
            </div> 
        );
        }
        
        
    } 
}

export default RenderDishDetails;