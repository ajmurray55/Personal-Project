module.exports = {
  addToCart: async (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const { user_id } = req.session.user;
    console.log("user", req.session);
    const { screen, battery } = req.body;
    const price = await db.sum_total(id);
    let total = 0;
    if (screen) {
      total += +price[0].screen_price;
      console.log("screen_price", price[0].screen_price);
    }
    if (battery) {
      total += +price[0].battery_price;
      console.log("battery_price", price[0].battery_price);
    }

    console.log("total", price, total);
    const addCart = await db.add_To_Cart([user_id, id, screen, battery, total]);
    console.log("addCArt", addCart[0]);
    res.status(200).send(addCart[0])
  },

  getTotal: async (req, res, next) => {
    const db = req.app.get("db");
    const { id }  = req.params
    const {screen, battery} = req.body
    const price = await db.sum_total(id);
    console.log('screen, battery', screen, battery)
    let total = 0;
    if (screen) {
      total += +price[0].screen_price;
      console.log("screen_price", price[0].screen_price);
    }
    if (battery) {
      total += +price[0].battery_price;
      console.log("battery_price", price[0].battery_price);
    }
    console.log('better be total' , total)
    res.status(200).json(total)
  }, 

  getCartTotal: async (req, res, next) => {
    const db = req.app.get("db");
    const { id } =  req.params
    const cartTotal = await db.cart_total(id)
    res.status(200).send(cartTotal)
  },

  remove: async (req, res) => {
    const db = req.app.get("db")
    const {cart_id} = req.params;
    const {user_id} = req.body
    const remove_cart = await db.delete_cart(cart_id, user_id)
    res.status(200).send(remove_cart)
  }, 

  getAllCart: async (req, res) => {
    const db = req.app.get("db")
    const {user_id} = req.params;
    const GetCart = await db.get_All_Cart(user_id)
    res.status(200).send(GetCart)
  },

  deleteAllCart: async (req, res, next) => {
    const db = req.app.get("db");
    const {user_id} = req.params
    const DeleteAll =  await db.delete_All_Cart(user_id)
    res.status(200).send(DeleteAll)
  }

}