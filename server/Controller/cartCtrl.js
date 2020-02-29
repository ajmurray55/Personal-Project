module.exports = {
  addToCart: async (req, res, next) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const {user_id} = req.session.user
    console.log("user",req.session)
    const {screen, battery} = req.body;
    const total = await db.sum_total(id);
    console.log('total', total, total[0].sum)
    const addCart = await db.add_To_Cart([user_id, id, screen, battery, total[0].sum]);
    return res.status(200).send(addCart);
  },

}
