import {FaShoppingCart} from 'react-icons/fa'
import CartContext from '../../context/CartContext'

import './index.css'

const Header = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      return (
        <div>
          <div className="header-component">
            <h1 className="restname">UNI Resto Cafe</h1>
            <div className="mobile-icon">
              <p className="web-my-orders">My Orders</p>
              <div className="icons">
                <FaShoppingCart size={24} color="#00000" />
                <p>{cartList.length}</p>
              </div>
            </div>
          </div>
          <hr />
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Header
