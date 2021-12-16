function reducer(state, action) {

  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
  }
  if (action.type === 'REMOVE') {
    return {
      ...state,
      cart: state.cart.filter(cartItem => action.payload !== cartItem.id),
    };
  }
  if (action.type === 'INCREASE') {
    let tempCart = state.cart.map(cartItem => {
      if (cartItem.id === action.payload) {
        return { ...cartItem, amount: cartItem.amount + 1 };
      }
      return cartItem;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === 'DECREASE') {
    let tempCart = state.cart
      .map(cartItem => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount - 1 };
        }
        return cartItem;
      })
      .filter(cartItem => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
    // return {...state, cart: state.cart.map((cartItem) => action.payload === cartItem.id ? {...cartItem,amount:cartItem.amount - 1}: cartItem)}
  }
  if (action.type === 'GET_TOTAL') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;

        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
    // return {...state,total: state.cart.map((cart) => cart.price * cart.amount).reduce((price,total) => price + total),
    //   amount: state.cart.map((cart) => cart.amount).reduce((prev,acc) => prev + acc),}
  }
  if (action.type === 'LOADING') {
    return { ...state, loading: true };
  }
  if (action.type === 'DISPLAY_ITEMS') {
    return { ...state, cart: action.payload, loading: false };
  }
  if(action.type === 'TOGGLE_AMOUNT') {
    let tempCart = state.cart.map((cartItem) => {
      if(cartItem.id === action.payload.id) {
        if(action.payload.type === 'inc') {
          return {...cartItem, amount:cartItem.amount - 1}
        }
        if(action.payload.type === 'dec') {
          return {...cartItem, amount:cartItem.amount + 1}
        }
      }
      return cartItem
    })
    .filter((cartItem) => cartItem.amount !== 0)
    return {...state, cart: tempCart}
  }
  // console.log(state);
  throw new Error('no matching type')
  // return state;
}
export default reducer;
