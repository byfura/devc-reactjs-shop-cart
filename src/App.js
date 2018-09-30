import React, { Component } from 'react';
import Navbar from './Navbar';
import Product from './Product';
import ShoppingCart from './ShoppingCart';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    isLoading : false,
    products : [],
    cartItems: []
  };

  handleAddItemToCart = product => {
    let cartItems = this.state.cartItems;
    const alreadyExists = cartItems.some(cartItem => cartItem.product.id === product.id);
    if (alreadyExists) {
      const cartItem = cartItems.find(cartItem => cartItem.product.id === product.id);
      cartItem.quantity = cartItem.quantity + 1;
    } else {
      cartItems.push({
          product: product,
          quantity: 1
      })
    }
    // console.log(cartItems);
    this.setState({cartItems: cartItems});
  }

  handleRemoveItemFromCart = product => {
    let cartItems = this.state.cartItems;
    const cartItemIndex = cartItems.findIndex(cartItem => cartItem.product.id === product.id);
    if (cartItems[cartItemIndex].quantity > 1) {
      cartItems[cartItemIndex].quantity = cartItems[cartItemIndex].quantity - 1;
    } else {
      cartItems.splice(cartItemIndex,1);
    }
    // console.log(cartItems);
    this.setState({cartItems: cartItems}); 
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch('https://product-list.glitch.me/')
      .then(res => res.json())
      // .then(data => console.log(data));
      .then(products => {
        this.setState({ products: products });
      });
  }

  render() {
    // const { isLoading, products } = this.state;
    return (
      <div className="container">
        <Navbar/>
          <div className="columns">
            <div className="column is-two-thirds">
              <div>
                <h3 className="title">Our Products</h3>
                <div className="columns">
                  {this.state.products.map(product => (
                    <Product 
                      key={product.id}
                      product={product}
                      onAddItemToCart={this.handleAddItemToCart}
                    />
                  ))}
                  
                </div>
              </div>
            </div>
            <ShoppingCart 
              cartItems={this.state.cartItems}
              onRemoveItemFromCart={this.handleRemoveItemFromCart}
              totalPurchase={this.handleTotalPurchase}
            />
          </div>
        </div>


    );
  }
}

export default App;
