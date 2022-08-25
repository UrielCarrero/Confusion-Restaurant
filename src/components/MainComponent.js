
import Header from './HeaderComponent';
import Menu from './MenuComponent'
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactUsComponent';
import About from './AboutUsComponent';

import RenderDishDetails from "./DishDetailsComponent";
import { Component } from 'react';
import { Routes, Route, Navigate, useParams} from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

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
  
      const DishWithId = () => {
        const { dishId } = useParams();
        console.log( dishId);
        return(
            <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(dishId,10))[0]} 
              comments={this.props.comments.filter((comment) => comment.dishId === parseInt(dishId,10))} />
        );
      };

      const DishDetail = () => { 
        const { dishId } = useParams();
        return( <RenderDishDetails dish={this.props.dishes.filter((dish)=> dish.id === parseInt(dishId,10))[0]} 
              comments={this.props.comments.filter((comment)=> comment.dishId === parseInt(dishId,10))}/>)}

  
      return (
        <div>
          <Header />
          <div>
            <Routes>
              <Route path='/home' element={HomePage} />
              <Route path='/aboutus' element={<About leaders={this.props.leaders} />} />
              <Route path='/menu' element={<Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' element={<DishWithId />} />
              <Route path='/contactus' element={<Contact />} />
              <Route path="/*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      );
    }
}
export default connect(mapStateToProps)(Main);
