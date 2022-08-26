import {React} from 'react';
import {Card, CardImg, CardTitle, CardBody, CardText, CardSubtitle} from'reactstrap';
import Loading from './LoadingComponent';

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
            <Card>
                <CardImg src={item.image} alt={item.name}/>
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.desgignation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>            
            </Card>
        );}
}

function HomePage(props)
{


    return(
        <div className="container">
            <div className="row align-items-start" >
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} errMess = {props.dishesErrMess} isLoading={props.dishesLoading} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} errMess ={null} isLoading={null} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} errMess ={null} isLoading={null} />
                </div>
            </div>
        </div>
    );
} 

export default HomePage;