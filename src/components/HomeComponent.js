import {React} from 'react';
import {Card, CardImg, CardTitle, CardBody, CardText, CardSubtitle} from'reactstrap';
import Loading from './LoadingComponent';
import { baseURL } from '../shared/baseURL';

function RenderCard({item,isLoading,errMess})
{
    if(isLoading)
    {
       return(
        <div className="container">
            <div className='row'>
                < Loading />
            </div>
        </div>
       );
    }
    else if(errMess)
    {
        return(
            <div className="container">
                <div className='row'>
                    <h4 className="text-danger">{errMess}</h4>
                </div>
            </div>
           );
    }
    else {
        return(
            <Card className='card__home'>
                <CardImg src={item.image} alt={item.name}/>
                <CardBody>
                    <CardTitle><strong>{item.name}</strong></CardTitle>
                    {item.designation ? <CardSubtitle>{item.desgignation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>            
            </Card>
        );}
}

function HomePage(props)
{
    console.log(props);

    return(
        <div className="container">
            <div className="row align-items-start" >
                <div className="cardshome__container col-12 col-md m-1">
                    <RenderCard item={props.dish} errMess = {props.dishesErrMess} isLoading={props.dishesLoading} />
                </div>
                <div className="cardshome__container col-12 col-md m-1">
                    <RenderCard item={props.promotion} errMess ={props.promosErrMess} isLoading={props.promosisLoading} />
                </div>
                <div className="cardshome__container col-12 col-md m-1">
                    <RenderCard item={props.leader} errMess ={props.leadersErrMess} isLoading={props.leadersisLoading} />
                </div>
            </div>
        </div>
    );
} 

export default HomePage;