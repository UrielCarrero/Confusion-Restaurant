import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import Loading from './LoadingComponent';
import { baseURL } from '../shared/baseURL';

const Menu = (props) => {

    if(props.isLoading)
    {
       return(
        <div className="container">
            <div className='row'>
                < Loading />
            </div>
        </div>
       );
    }
    else if(props.errMess)
    {
        return(
            <div className="container">
                <div className='row'>
                    <h4 className="text-danger">{props.errMess}</h4>
                </div>
            </div>
           );
    }
    else {
        const menu = props.dishes.map((dish) => {
            return (   
                <div  className="dishmain__container col-12 col-md-5 m-1">

                        <Card className="menu__card card">
                            <Link to={`/menu/${dish.id}`} >
                                <CardImg height="100%" width="100%" src={dish.image} alt={dish.name} />
                                <CardImgOverlay>
                                    <CardTitle className="text-end text-dark"><strong>{dish.name}</strong></CardTitle>
                                </CardImgOverlay>
                            </Link>
                        </Card>
                    
                </div>
                );
            });

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem >
                            <Link to="/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Menu
                        </BreadcrumbItem >
                    </Breadcrumb>
                    <div className="col-12 text-left">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
                    
                <div className="menu__container row">
                    {menu}        
                </div>
            </div>   
        );
    }
}

export default Menu;