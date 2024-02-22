import {Component} from 'react'
import Header from '../Header'

import CartListView from '../CartListView'

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
          const {cartList, removeAllCartItems} = value

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

                    <CartListView />
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
