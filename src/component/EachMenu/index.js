import React from 'react'
import {FaShoppingCart} from 'react-icons/fa'
import CartContext from '../../context/CartContext' // Replace with the correct path
import './index.css'

class EachMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0,
    }
  }

  handleDecrement = () => {
    const {quantity} = this.state
    const {addCartItem} = this.context

    if (quantity > 0) {
      this.setState(
        prevState => ({
          quantity: prevState.quantity - 1,
        }),
        () => {
          const {eachItemDetails} = this.props
          const {quantity: updatedQuantity} = this.state
          addCartItem({
            ...eachItemDetails,
            quantity: updatedQuantity,
          })
        },
      )
    }
  }

  handleIncrement = () => {
    const {addCartItem} = this.context
    this.setState(
      prevState => ({
        quantity: prevState.quantity + 1,
      }),
      () => {
        const {eachItemDetails} = this.props
        const {quantity: updatedQuantity} = this.state
        addCartItem({
          ...eachItemDetails,
          quantity: updatedQuantity,
        })
      },
    )
  }

  render() {
    const {eachItemDetails} = this.props
    const {
      dishName,
      dishPrice,
      dishImage,
      dishDescription,
      dishCurrency,
      dishCalories,
      dishAvailability,
      addOnCat,
    } = eachItemDetails

    const {quantity} = this.state

    return (
      <li className="menu-item-card">
        <div className="menu-item-box">
          <div className="text-details">
            <h1>{dishName}</h1>
            <p>
              {dishCurrency} {dishPrice}
            </p>
            <p>{dishDescription}</p>
            {dishAvailability ? (
              <>
                <p>{quantity}</p>
                <button type="button" onClick={this.handleDecrement}>
                  -
                </button>
                <button type="button" onClick={this.handleIncrement}>
                  +
                </button>
              </>
            ) : (
              <p>Not available</p>
            )}
            {addOnCat.length > 0 && <p>Customizations available</p>}
            <button
              type="button"
              className="add-to-cart-button"
              onClick={this.handleIncrement}
            >
              <FaShoppingCart />
            </button>
          </div>
          <div>
            <p>{dishCalories} calories</p>
          </div>
          <div className="menu-item-details">
            <img className="pic" src={dishImage} alt={dishName} />
          </div>
        </div>
      </li>
    )
  }
}

EachMenu.contextType = CartContext

export default EachMenu

/* import React from 'react'
import {FaShoppingCart} from 'react-icons/fa'
import CartContext from '../../context/CartContext' // Replace with the correct path
import './index.css'

class EachMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0,
    }
  }

  handleDecrement = () => {
    const {quantity} = this.state
    const {addCartItem} = this.context

    if (quantity > 0) {
      this.setState(
        prevState => ({
          quantity: prevState.quantity - 1,
        }),
        () => {
          const {eachItemDetails} = this.props
          const {quantity: updatedQuantity} = this.state
          addCartItem({
            ...eachItemDetails,
            quantity: updatedQuantity,
          })
        },
      )
    }
  }

  handleIncrement = () => {
    const {addCartItem} = this.context
    this.setState(
      prevState => ({
        quantity: prevState.quantity + 1,
      }),
      () => {
        const {eachItemDetails} = this.props
        const {quantity: updatedQuantity} = this.state
        addCartItem({
          ...eachItemDetails,
          quantity: updatedQuantity,
        })
      },
    )
  }

  render() {
    const {eachItemDetails} = this.props
    const {
      dishName,
      dishPrice,
      dishImage,
      dishDescription,
      dishCurrency,
      dishCalories,
      dishAvailability,
      addOnCat,
    } = eachItemDetails

    const {quantity} = this.state 

    return (
      <li className="menu-item-card">
        <div className="menu-item-box">
          <div className="text-details">
            <h1>{dishName}</h1>
            <p>
              {dishCurrency} {dishPrice}
            </p>
            <p>{dishDescription}</p>
            {dishAvailability ? (
              <>
                <p>{quantity}</p>
                <button type="button" onClick={this.handleDecrement}>
                  -
                </button>
                <button type="button" onClick={this.handleIncrement}>
                  +
                </button>
              </>
            ) : (
              <p>Not available</p>
            )}
            <button
              type="button"
              className="add-to-cart-button"
              onClick={this.handleIncrement}
            >
              <FaShoppingCart />
            </button>
          </div>
          <div>
            <p>{dishCalories} calories</p>
          </div>
          <div className="menu-item-details">
            <img className="pic" src={dishImage} alt={dishName} />
          </div>
        </div>
      </li>
    )
  }
}

EachMenu.contextType = CartContext

export default EachMenu

/* import {useState, useEffect} from 'react'
import './index.css'

const EachMenu = ({eachItemDetails}) => {
  const {
    dishName,
    dishPrice,
    dishImage,
    dishDescription,
    dishCurrency,
    dishCalories,
    dishAvailability,
  } = eachItemDetails

  const [quantity, setQuantity] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <li className="menu-item-card">
      <div className="menu-item-box">
        <div className="text-details">
          <h1>{dishName}</h1>
          <p>
            {dishCurrency} {dishPrice}
          </p>
          <p>{dishDescription}</p>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {dishAvailability ? (
                <>
                  <p>{quantity}</p>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(0, quantity - 1))}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </>
              ) : (
                <p>Not available</p>
              )}
            </>
          )}
        </div>
        <div>
          <p>{dishCalories} calories</p>
        </div>
        <div className="menu-item-details">
          <img className="pic" src={dishImage} alt={dishName} />
        </div>
      </div>
    </li>
  )
}

export default EachMenu
*/
