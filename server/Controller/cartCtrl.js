module.exports = {
  addToCart: async (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const {user_id} = req.session.user
    console.log("user",req.session)
    const {screen, battery} = req.body;
    const price = await db.sum_total(id);
    let total = 0;
    if(screen) {
        total += +price[0].screen_price
        console.log("screen_price", price[0].screen_price)
    }
    if (battery) {
        total += +price[0].battery_price
        console.log("battery_price", price[0].battery_price)
    }

    console.log('total', price, total)
    const addCart = await db.add_To_Cart([user_id, id, screen, battery, total]);
    console.log('addCArt', addCart[0])
    res.status(200).send(addCart[0]);
  },

  



}
