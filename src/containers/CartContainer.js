import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Cart from "../components/Cart";
import * as Message from "../constants/Message";
import CartItem from "../components/CartItem.jsx";
import CartResult from "../components/CartResult";
import { actDeleteProduct, actChangeMessage, actUpdateProduct } from "../actions/index";

class CartContainer extends Component {
  render() {
    var { cart } = this.props;
    return (
        <Cart>
            {this.showCartItem(cart)}
            {this.showCartResult(cart)}
        </Cart>
    );
  }
  showCartItem = (cart) => {
    var {onDeleteProduct, onChangeMessage, onUpdateProduct} = this.props;
    var result = <tr><td>{Message.MSG_CART_EMPTY}</td></tr>;
    if(cart.length>0){
      result = cart.map((item, index) => {
        return (
          <CartItem 
            key={index} 
            item={item} 
            index={index}
            onDeleteProduct={onDeleteProduct}
            onChangeMessage={onChangeMessage}
            onUpdateProduct={onUpdateProduct}
          />
        )
      })
    }
    return result;
  }
  showCartResult = (cart) => {
    var result = null;
    if(cart.length>0){
      result = <CartResult cart={cart}/>
    }
    return result;
  }
}
CartContainer.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        descriptiton: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        inventory: PropTypes.number.isRequired,
        rating: PropTypes.number.isRequired
      }).isRequired,
      quantity: PropTypes.number.isRequired
    })
  ).isRequired,
  onDeleteProduct: PropTypes.func.isRequired,
  onChangeMessage: PropTypes.func.isRequired,
  onUpdateProduct: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onDeleteProduct: (product) => {
      dispatch(actDeleteProduct(product));
    },
    onChangeMessage: (message) => {
      dispatch(actChangeMessage(message));
    },
    onUpdateProduct: (product, quantity) => {
      dispatch(actUpdateProduct(product, quantity));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
