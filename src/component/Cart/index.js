import {Component} from 'react'
import Header from '../Header'

import CartContext from '../../context/CartContext'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
    }
  }

  componentDidMount() {
    this.getApiResponse()
  }

  getApiResponse = async () => {
    try {
      const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
      const options = {
        method: 'GET',
      }

      const response = await fetch(url, options)
      const responseData = await response.json()

      if (response.ok) {
        const updatedData = {
          restaurantName: responseData[0].restaurant_name,
          formattedData: responseData[0].table_menu_list.map(eachItem => ({
            menuCategory: eachItem.menu_category,
            menuCategoryId: eachItem.menu_category_id,
            categoryDishes: eachItem.category_dishes.map(eachDish => ({
              dishId: eachDish.dish_id,
              dishName: eachDish.dish_name,
              dishPrice: eachDish.dish_price,
              dishImage: eachDish.dish_image,
              dishCurrency: eachDish.dish_currency,
              dishCalories: eachDish.dish_calories,
              dishDescription: eachDish.dish_description,
              dishAvailability: eachDish.dish_Availability,
              dishType: eachDish.dish_Type,
              addOnCat: eachDish.addonCat,
            })),
          })),
        }

        this.setState({
          data: updatedData,
        })
      }
    } catch (error) {
      console.error('Error fetching data:', error.message)
    }
  }

  render() {
    const {data} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {
            cartList,
            removeAllCartItems,
            removeCartItem,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
          } = value

          const {restaurantName} = data

          return (
            <div className="cart-component">
              <Header restaurantName={restaurantName} />
              <div className="cart-container">
                {cartList.length === 0 ? (
                  <div className="empty-cart-message">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                      alt="Empty Cart"
                    />
                    <h1>Your cart is empty</h1>
                  </div>
                ) : (
                  <div>
                    <button
                      type="button"
                      className="remove-all-btn"
                      onClick={removeAllCartItems}
                    >
                      Remove All
                    </button>
                    <ul className="cart-items-list">
                      {cartList.map(item => (
                        <li key={item.id} className="cart-item">
                          <div className="cart-item-details">
                            <img
                              className="cart-item-image"
                              src={item.dishImage}
                              alt={item.dishName}
                            />
                            <div className="cart-item-text">
                              <h3>{item.dishName}</h3>
                              <p>{`${item.dishCurrency} ${item.dishPrice}`}</p>
                              <div className="quantity-controls">
                                <button
                                  type="button"
                                  className="quantity-btn"
                                  onClick={() =>
                                    decrementCartItemQuantity(item.id)
                                  }
                                >
                                  -
                                </button>
                                <span className="quantity">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  className="quantity-btn"
                                  onClick={() =>
                                    incrementCartItemQuantity(item.id)
                                  }
                                >
                                  +
                                </button>
                              </div>
                              <button
                                type="button"
                                className="remove-item-btn"
                                onClick={() => removeCartItem(item.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default Cart
