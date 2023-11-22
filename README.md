# Reusable-Cart-Component

> This is a reusable cart component you can install to an e-commerce react application to display cart items. it includes all functionalities of a cart component: 
1. Viewing items added to cart
2. Adding or reducing the quantity of an item
3. Removing an item from the cart
4. Clearing the cart.
5. Displaying the total amount of all items in Ksh
6. Displaying the amount per item based on the quantity

[![NPM](https://img.shields.io/npm/v/reusable-cart-component.svg)](https://www.npmjs.com/package/reusable-cart-component) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## How to Install

```bash
npm install --save reusable-cart-component
```

## Usage
- In the jsx component you want to display the cart items you need to:
1. Install the components in your main folder
2. Ensure the component is visible in your `package.json file`
3. Import the component as shown below
4. Instantiate the component
5. Provide the cart items (the items selected by a user from the main products page)
6. The component will do the rest 🎊

```jsx
import MyComponent from 'reusable-cart-component'
import 'reusable-cart-component/dist/index.css'


const Cart = () => {
  return (
    <div>
      <ReusableCartComponent items={items} cartId={cartId}  />  
    </div>
  )
}

export default Cart
```
## Requirements
```
Node version >=10
```

## License

MIT © 
## Github
[kristinenyaga](https://github.com/kristinenyaga)

## Reach out
- For any queries,suggestions reach out to:
nyagakristine@gmail.com
angieschacha@gmail.com
emutheu1998@gmail.com
