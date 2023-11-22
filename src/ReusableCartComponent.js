import React from 'react'
import './styles.module.css'
import axios from 'axios'
const ReusableCartComponent = ({ items, cartId }) => {
  const [cartItems, setCartItems] = React.useState([])
  React.useEffect(() => {
    if (cartItems.length === 0) {
      setCartItems(items)
    } else {
      setCartItems(cartItems)
    }
  }, [cartItems, items])

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.unit_price * item.quantity,
      0
    )
  }
  const updateQuantity = async (productId, newQuantity) => {
    // Ensure the new quantity is at least 1
    const validatedQuantity = Math.max(newQuantity, 1)

    const updatedItems = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: validatedQuantity }
      }
      return item
    })
    axios
      .patch(
        `https://shoplify-prod-231a968d6096.herokuapp.com/shop/carts/${cartId}/items/${productId}/`,
        {
          quantity: validatedQuantity
        }
      )
      .then((response) => {
        setCartItems(updatedItems)
        window.alert('item updated successfully')
      })
      .catch((error) => {
        // Handle error
        console.error('Error removing item:', error)
      })
  }

  const removeItem = (productId) => {
    const updatedItems = cartItems.filter((item) => item.id !== productId)
    setCartItems(updatedItems)

    // Make a DELETE request to remove the specific item from the cart
    axios
      .delete(
        `https://shoplify-prod-231a968d6096.herokuapp.com/shop/carts/${cartId}/items/${productId}/`
      )
      .then((response) => {
        setCartItems(updatedItems)
        window.alert('item deleted successfully')
      })
      .catch((error) => {
        // Handle error
        console.error('Error removing item:', error)
      })
  }
  const clearCart = () => {
    axios
      .delete(
        `https://shoplify-prod-231a968d6096.herokuapp.com/shop/carts/${cartId}/`
      )
      .then((response) => {
        window.alert('cart cleared successfully')
        setCartItems([])
        window.localStorage.removeItem('cartId')
      })
      .catch((error) => {
        // Handle error
        console.error('Error clearing cart:', error)
      })
  }
  return (
    <div className='container'>
      <p className='text-center fs-3'>Here are the items on your cart</p>
      <div className='total-price d-flex justify-content-between align-items-center'>
        <p className='fs-3'>Total Price: ksh {calculateTotalPrice()}</p>
        <button className='btn btn-md btn-danger' onClick={clearCart}>
          Clear Cart
        </button>
      </div>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
        {cartItems.map((item, index) => (
          <div className='col' key={item.id}>
            <div className='card shadow-sm image-container'>
              <img
                className='bd-placeholder-img card-img-top'
                src={item.imageUrl}
                alt={item.name}
                width='100%'
                height='200'
              />
              <div className='overlay' />

              <div className='card-body'>
                <p className='card-text text-center'>{item.product.title}</p>
                <p className='card-text text-center'>
                  {item.product.description}
                </p>
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='btn-group'>
                    <button
                      type='button'
                      className='btn btn-md btn-outline-danger'
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div>
                    <div className='d-flex justify-content-between align-items-center'>
                      <button
                        type='button'
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className='btn btn-md btn-outline-primary'
                      >
                        +
                      </button>
                      <p className='fs-1 p-2 mt-3'>{item.quantity}</p>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className='btn btn-md btn-outline-danger'
                      >
                        -
                      </button>
                    </div>
                    <p className='fs-4'>
                      ksh {item.product.unit_price * item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReusableCartComponent
