
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
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreator';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
 

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
    postComment: (dishId, rating, author, comment) => {
      dispatch(postComment(dishId, rating, author, comment))
    }, 
    postFeedback: (feedback) => {dispatch(postFeedback(feedback))},
    fetchDishes: () => {dispatch(fetchDishes())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchComments: () => {dispatch(fetchComments())},
    fetchLeaders: () => {dispatch(fetchLeaders())},
    resetFeedback: () => {dispatch(actions.reset('feedback'))}
  })
}

class Main extends Component{
    constructor(props) {
      super(props);
    }

    componentDidMount()
    {
      this.props.fetchDishes();
      this.props.fetchComments();
      this.props.fetchPromos();
      this.props.fetchLeaders();
    }

    render() {
      const HomePage = (
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesErrMess = {this.props.dishes.errmess}
        dishesLoading = {this.props.dishes.isLoading}
        promotion={this.props.promotions.promos.filter((promo) => promo.featured)[0]}
        promosErrMess = {this.props.promotions.errmess}
        promosisLoading={this.props.promotions.isLoading}
        leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
        leadersErrMess = {this.props.leaders.errmess}
        leadersisLoading={this.props.leaders.isLoading}/>
      ) 

      const DishDetail = () => { 
        const { dishId } = useParams();
        return( <RenderDishDetails dish={this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(dishId,10))[0]} 
              errMess = {this.props.dishes.errmess}
              isLoading = {this.props.dishes.isLoading}
              comments={this.props.comments.comments.filter((comment)=> comment.dishId === parseInt(dishId,10))}
              commentsErrMess = {this.props.comments.errmess}
              postComment={this.props.postComment}/>)}

      const AboutUs = () =>{
        return(<About leaders={this.props.leaders.leaders} 
                      errMess={this.props.leaders.errmess}
                      isLoading={this.props.leaders.isLoading}/>)
      }

      return (
        <div>
          <Header />
          <div>  
          <Routes>
            <Route path='/home' element={HomePage} />
            <Route path='/aboutus' element={<AboutUs  />} />
            <Route path='/menu' element={<Menu dishes={this.props.dishes.dishes} errMess = {this.props.dishes.errmess}
            isLoading = {this.props.dishes.isLoading}/>} />
            <Route path='/menu/:dishId' element={<DishDetail />} />
            <Route path='/contactus' element={<Contact resetFeedback={this.props.resetFeedback} postFeedback={this.props.postFeedback}/>} />
            <Route path="/*" element={<Navigate to="/home" />} />
          </Routes>

          </div>
          <Footer />
        </div>
      );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
