module.exports = {
    getAllPhones: async ( req, res, next ) => {
        const db = req.app.get("db");
        const {manufacturer} = req.query
        const allPhones = await db.get_All_Phones(manufacturer).catch(err => console.log(err))
        res.status(200).send(allPhones)
    }
}