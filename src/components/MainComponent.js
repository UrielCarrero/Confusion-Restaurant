
import Header from './HeaderComponent';
import Menu from './MenuComponent'
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactUsComponent';
import About from './AboutUsComponent';

import RenderDishDetails from "./DishDetailsComponent";
import { Component } from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
/*import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}
*/
const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

/*const state = useSelector((state) => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }});*/

class Main extends Component{
    constructor(props) {
      super(props);
    }



    render() {
      const HomePage = (
        <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
        leader={this.props.leaders.filter((leader) => leader.featured)[0]}/>
      ) 
  
      const DishWithId = ({match}) => {
        return(
            <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
              comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
        );
      };

      const DishDetail = ({match}) => { 
        return( <RenderDishDetails dish={this.props.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]} 
              comments={this.props.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId,10))}/>)}

  
      return (
        <div>
          <Header />
          <div>
            <Routes>
              <Route path='/home' element={HomePage} />
              <Route path='/aboutus' element={<About leaders={this.props.leaders} />} />
              <Route path='/menu' element={<Menu dishes={this.props.dishes} />} />
              {/*<Route path='/menu/:dishId' element={DishWithId} />*/}
              <Route path='/contactus' element={<Contact />} />
              <Route path="/*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      );
    }
       /* const HomePage = () =>{ return ( <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                                                promotion={this.props.promotions.filter((promotion) => promotion.featured)[0]}
                                                leader = {this.props.leaders.filter((leader) => leader.featured)[0]}/> )}

        const DishDetail = ({match}) => { 
          return( <RenderDishDetails dish={this.props.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]} 
                                                comments={this.props.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId,10))}/>)}


        return (
            <div>
              
                <Header />
                <Switch>
                <Route path="/home" component={HomePage} />
                <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} /> } />
                <Route path="/menu/:dishId" component = {DishDetail}/>  
                <Route path="/contactus" component={() => < Contact />} />
                <Route path="/aboutus" component={() => < About leaders={this.props.leaders}/>} />
                <Redirect to="/home" />      
                </Switch>   
                <Footer />

                <Routes>
                  <Route path='/home' element={HomePage} />
                  <Route exact path='/aboutus' element={() => <About leaders={this.props.leaders} />} />} />
                  <Route exact path='/menu' element={() => <Menu dishes={this.props.dishes} />} />
                  <Route path='/menu/:dishId' element={DishWithId} />
                  <Route exact path='/contactus' element={Contact} />
                  <Route path="/" element={<Navigate replace to="/home" />} />
                </Routes>


              
                
             </div>
            )*/  
}
export default connect(mapStateToProps)(Main);
