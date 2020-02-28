module.exports = {
    addToCart: async (req, res, next) => {
        const db = req.app.get("db")
        const {id} = req.params
        const { user_id,  screen, battery, total } = req.body
        const addCart = await db.add_To_Cart([user_id, id, screen, battery, total])
        return res.status(200).send(addCart)
        }
        
    }

    
    
