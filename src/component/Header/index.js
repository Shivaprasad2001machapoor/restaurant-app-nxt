import {Link, useHistory} from 'react-router-dom'
import {FaShoppingCart} from 'react-icons/fa'

import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = ({restaurantName}) => {
  const history = useHistory()

  const handleCartClick = () => {
    history.push('/cart')
  }

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        return (
          <div>
            <div className="header-component">
              <Link to="/" className="web-my-orders">
                <h1>{restaurantName}</h1>
              </Link>
              <div className="mobile-icon">
                <Link to="/cart" className="web-my-orders">
                  <button type="button">My Orders</button>
                </Link>
                <button
                  type="button"
                  className="icons"
                  onClick={handleCartClick}
                >
                  <FaShoppingCart size={24} color="#00000" />
                  <p>{cartList.length}</p>
                </button>
                <button type="button" onClick={onClickLogout}>
                  Logout
                </button>
              </div>
            </div>
            <hr />
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Header
