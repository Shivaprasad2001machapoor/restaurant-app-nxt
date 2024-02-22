import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        decrementCartItemQuantity,
        incrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {
        dishId,
        dishName,
        dishPrice,
        dishImage,
        dishCurrency,
        quantity,
      } = cartItemDetails
      console.log(cartItemDetails)
      const onRemoveCartItem = () => {
        removeCartItem(dishId)
      }

      const onClickMinus = () => {
        decrementCartItemQuantity(dishId)
      }

      const onClickPlus = () => {
        incrementCartItemQuantity(dishId)
      }

      return (
        <li className="cart-item">
          <div className="cart-item-details">
            <img className="cart-item-image" src={dishImage} alt={dishName} />
            <div className="cart-item-text">
              <h1>{dishName}</h1>
              <p>{`${dishCurrency} ${dishPrice}`}</p>
              <div className="quantity-controls">
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={onClickMinus}
                >
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  type="button"
                  className="quantity-btn"
                  onClick={onClickPlus}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="remove-item-btn"
                onClick={onRemoveCartItem}
              >
                Remove
              </button>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
