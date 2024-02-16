import {Component} from 'react'
import EachMenu from '../EachMenu'
import './index.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      status: 'loading',
      errorMsg: '',
      activeTabs: '11',
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
      console.log(responseData)
      console.log('siva')

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
          status: 'success',
        })
      } else {
        this.setState({
          status: 'failure',
          errorMsg: responseData.errorMsg,
        })
      }
    } catch (error) {
      console.error('Error fetching data:', error.message)
      this.setState({
        status: 'failure',
        errorMsg: 'Failed to fetch data',
      })
    }
  }

  renderMenuItem = () => {
    const {data, activeTabs} = this.state
    const {formattedData} = data
    const filteredData = formattedData.filter(
      eachItem => eachItem.menuCategoryId === activeTabs,
    )
    const dishesList = filteredData.length ? filteredData[0].categoryDishes : []

    return (
      <div className="menu-item-container">
        <ul className="menu-item-card-container">
          {dishesList.map(eachItem => (
            <EachMenu key={eachItem.dishId} eachItemDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {data, status, errorMsg, activeTabs} = this.state
    const {formattedData} = data

    if (status === 'loading') {
      return <p>Loading...</p>
    }

    if (status === 'failure') {
      return <p>Error: {errorMsg}</p>
    }

    return (
      <div>
        <ul className="menu-tabs">
          {formattedData.map(eachItem => (
            <li
              className={
                eachItem.menuCategoryId === activeTabs ? 'tabs active' : 'tabs'
              }
              key={eachItem.menuCategoryId}
            >
              <button
                type="button"
                key={eachItem.menuCategoryId}
                onClick={() =>
                  this.setState({activeTabs: eachItem.menuCategoryId})
                }
                className={
                  eachItem.menuCategoryId === activeTabs
                    ? 'tab-btn active'
                    : 'tab-btn'
                }
              >
                {eachItem.menuCategory}
              </button>
            </li>
          ))}
        </ul>
        <hr />
        <div className="menu-item-container">{this.renderMenuItem()}</div>
      </div>
    )
  }
}

export default Home

/* import {Component} from 'react'
import Loader from 'react-loader-spinner'
import EachMenu from '../EachMenu'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    data: {},
    activeTabs: '11',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.foodItemsData()
  }

  foodItemsData = async () => {
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
          apiStatus: apiStatusConstants.success,
        })
        console.log(updatedData)
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
        })
      }
    } catch (error) {
      console.error('Error fetching data:', error.message)
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="error view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">Product Not Found</h1>
      <button type="button" className="button">
        Continue Shopping
      </button>
    </div>
  )

  renderMenuItem = () => {
    const {data, activeTabs} = this.state
    const {formattedData} = data
    const filteredData = formattedData.filter(
      eachItem => eachItem.menuCategoryId === activeTabs,
    )
    const dishesList = filteredData.length ? filteredData[0].categoryDishes : []

    return (
      <div className="menu-item-container">
        <ul className="menu-item-card-container">
          {dishesList.map(eachItem => (
            <EachMenu key={eachItem.dishId} eachItemDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderProductDetailsView = () => {
    const {data, activeTabs} = this.state
    const {formattedData} = data

    return (
      <div>
        <ul className="menu-tabs">
          {formattedData.map(eachItem => (
            <li
              className={
                eachItem.menuCategoryId === activeTabs ? 'tabs active' : 'tabs'
              }
              key={eachItem.menuCategoryId}
            >
              <button
                type="button"
                key={eachItem.menuCategoryId}
                onClick={() =>
                  this.setState({activeTabs: eachItem.menuCategoryId})
                }
                className={
                  eachItem.menuCategoryId === activeTabs
                    ? 'tab-btn active'
                    : 'tab-btn'
                }
              >
                {eachItem.menuCategory}
              </button>
            </li>
          ))}
        </ul>
        <div className="menu-item-container">{this.renderMenuItem()}</div>
      </div>
    )
  }

  renderProductDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="product-item-details-container">
          {this.renderProductDetails()}
        </div>
      </>
    )
  }
}
export default Home
*/
