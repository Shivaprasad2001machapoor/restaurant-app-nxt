import {Component} from 'react'
import './App.css'
import Header from './component/Header'
import Home from './component/Home'
import CartContext from './context/CartContext'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
        }}
      >
        <Header />
        <Home />
      </CartContext.Provider>
    )
  }
}

export default App
