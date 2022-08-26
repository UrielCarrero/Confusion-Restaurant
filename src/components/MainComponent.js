
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
import { addComment, fetchDishes } from '../redux/ActionCreator';
import {actions} from 'react-redux-form';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = (dispatch) => {

  return({
    addComment: (dishId, rating, author, comment) => {
      dispatch(addComment(dishId, rating, author, comment))
    }, 
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedback: () => {dispatch(actions.reset('feedback'))}
  })
}

class Main extends Component{
    constructor(props) {
      super(props);
    }

    componentDidMount()
    {
      console.log("mounted");
      this.props.fetchDishes();
    }

    render() {
      const HomePage = (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesErrMess = {this.props.dishes.errMess}
        dishesLoading = {this.props.dishes.isLoading}
        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
        leader={this.props.leaders.filter((leader) => leader.featured)[0]}/>
      ) 
  
      const DishWithId = () => {
        const { dishId } = useParams();
        return(
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(dishId,10))[0]} 
              comments={this.props.comments.filter((comment) => comment.dishId === parseInt(dishId,10))} />
        );
      };

      const DishDetail = () => { 
        const { dishId } = useParams();
        return( <RenderDishDetails dish={this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(dishId,10))[0]} 
              errMess = {this.props.dishes.errMess}
              isLoading = {this.props.dishes.isLoading}
              comments={this.props.comments.filter((comment)=> comment.dishId === parseInt(dishId,10))}
              addComment={this.props.addComment}/>)}

  
      return (
        <div>
          <Header />
          <div>
            <Routes>
              <Route path='/home' element={HomePage} />
              <Route path='/aboutus' element={<About leaders={this.props.leaders} />} />
              <Route path='/menu' element={<Menu dishes={this.props.dishes.dishes} errMess = {this.props.dishes.errMess}
              isLoading = {this.props.dishes.isLoading}/>} />
              <Route path='/menu/:dishId' element={<DishWithId />} />
              <Route path='/contactus' element={<Contact resetFeedback={this.props.resetFeedback}/>} />
              <Route path="/*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
