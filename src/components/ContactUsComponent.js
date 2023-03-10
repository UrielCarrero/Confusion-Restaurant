import React, { Component } from 'react';
import {Breadcrumb, BreadcrumbItem, Button, Label, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component {

    constructor(props)
    {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        
        this.props.postFeedback(values);
        this.props.resetFeedback();
    }

    render(){
        
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Contact Us
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12 text-left">
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                        <img className='location__img' src='https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' />
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1 mb-2">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>Fist Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" name="firstname" 
                                    placeholder="First Name" className="form-control m-1"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                    />
                                </Col>
                                <Errors className="text-danger" 
                                    model=".firstname"
                                    show="touched"
                                    messages={{
                                        required: "This field is mandatory. ",
                                        minLength: "The name should contain at least 3 characters. ",
                                        maxLength: "The name should be shorter than 15 characters. "
                                    }}
                                ></Errors>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" id="lastname" name="lastname" 
                                    placeholder="Last Name" className="form-control m-1" validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                    />
                                </Col>
                                <Errors className="text-danger" 
                                    model=".lastname"
                                    show="touched"
                                    messages={{
                                        required: "This field is mandatory. ",
                                        minLength: "The last name should contain at least 3 characters. ",
                                        maxLength: "The last name should be shorter than 15 characters. "
                                    }}
                                ></Errors>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" id="telnum" name="telnum" 
                                    placeholder="Tel. Number" className="form-control m-1" 
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                    }}
                                    />
                                </Col>
                                <Errors className="text-danger" 
                                    model=".telnum"
                                    show="touched"
                                    messages={{
                                        required: "This field is mandatory. ",
                                        minLength: "The number should contain at least 3 characters. ",
                                        maxLength: "The number should be shorter than 15 characters. ",
                                        isNumber: "This field only accepts numbers. "
                                    }}
                                ></Errors>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email" 
                                    placeholder="Email" className="form-control m-1"
                                    validators={{
                                        required, validEmail
                                    }}
                                    />
                                </Col>
                                <Errors className="text-danger" 
                                    model=".email"
                                    show="touched"
                                    messages={{
                                        required: "This field is mandatory.",
                                        validEmail: "This address isn't valid."
                                    }}
                                ></Errors>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree"
                                                name="agree"
                                                className='form-check-input m-1'/> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Control.select model=".contactType" name="contactType"
                                    className='form-control m-1'>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select >
                                </Col>
                            </Row> 
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="12" className='form-control m-1'/>
                                </Col>
                            </Row>  
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" className='m-1' color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>                        
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default Contact;