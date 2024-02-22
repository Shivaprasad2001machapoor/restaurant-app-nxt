import {Component} from 'react'

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import './App.css'
import Home from './component/Home'
import Cart from './component/Cart'
import CartContext from './context/CartContext'
import LoginForm from './component/LoginForm'
import ProtectedRoute from './component/ProtectedRoute'
import NotFound from './component/NotFound'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
  }

  removeCartItem = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.dishId !== dishId),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item => {
        if (item.id === dishId) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      }),
    }))
  }

  decrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item => {
        if (item.id === dishId && item.quantity > 0) {
          return {...item, quantity: item.quantity - 1}
        }
        return item
      }),
    }))
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeAllCartItems: this.removeAllCartItems,
            removeCartItem: this.removeCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App

/* addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.id !== productId),
    }))
  }

  incrementCartItemQuantity = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === productId ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  decrementCartItemQuantity = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === productId && item.quantity > 0
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    }))
  }
*/
