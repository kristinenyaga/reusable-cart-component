import React from 'react'
import './styles.module.css'

const ReusableCartComponent = ({ items }) => {
  const [cartItems, setCartItems] = React.useState(items)
  const updateQuantity = (index, quantity) => {
    // Create a copy of the cartItems array and update the quantity of the specified item
    const updatedCart = [...cartItems]
    // Ensure the quantity doesn't go below zero
    updatedCart[index].quantity = Math.max(quantity, 1)
    setCartItems(updatedCart)
  }

  // Calculate the total price of all items in the cart
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }
  const removeItem = (id) => {
    // Create a copy of the cartItems array and remove the specified item
    const updatedCart = cartItems.filter((item) => item.id !== id)

    setCartItems(updatedCart)
  }

  return (
    <div className='container'>
      <p className='text-center fs-3'>Here are the items on your cart</p>
      <div className='total-price d-flex justify-content-between align-items-center'>
        <button className='btn btn-md btn-success'>Place Order</button>
        <p className='fs-3'>Total Price: ksh {calculateTotalPrice()}</p>
        <button className='btn btn-md btn-danger'>Clear Cart</button>
      </div>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
        {cartItems.map((item, index) => (
          <div className='col' key={index}>
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
                <p className='card-text text-center'>{item.name}</p>
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
                        onClick={() => updateQuantity(index, item.quantity + 1)}
                        className='btn btn-md btn-outline-primary'
                      >
                        +
                      </button>
                      <p className='fs-1 p-2 mt-3'>{item.quantity}</p>
                      <button
                        onClick={() => updateQuantity(index, item.quantity - 1)}
                        className='btn btn-md btn-outline-danger'
                      >
                        -
                      </button>
                    </div>
                    <p className='fs-4'>ksh {item.price * item.quantity}</p>
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
