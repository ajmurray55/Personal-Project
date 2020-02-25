const bcrypt = require('bcrypt')

module.exports = {
    login: async (req, res, next) => {
        const db = req.app.get("db");
        let { password, username } = req.body
        const foundUser = await db.select_user(username).catch(err => console.log(err))
        if(!foundUser.length){
            res.status(401).send("Incorrect username and/or password")
        } else {
            const matchPasswords = await bcrypt.compare(password, foundUser[0].password)
            .catch(err => console.log(err))

            if(matchPasswords){
                req.session.user = {
                    username: foundUser[0].username,
                    user_id: foundUser[0].user_id
                };
                res.status(200).send(req.session.user);
            } else {
                res.status(401).send("Incorrect username and/or password")
                
            }
        }
    },


    register: async (req, res, next) => {
        const db = req.app.get('db');
        const { username, password, email } = req.body;
        const foundUser = await db.select_user(email);
        console.log('foundUser', foundUser)
        if (foundUser.length){
            res.status(409).send('That user already exists! Please use an alternate EMAIL')
        } else {
            const saltRounds = 12;
            bcrypt.genSalt(saltRounds).then(salt => {
               bcrypt.hash(password, salt).then(hashedPassword => {
                   db.create_user([username, email, hashedPassword])
                   .then(([user]) => {
                       req.session.user = user;
                       res.status(200).send(req.session.user)
                   })
               })
            })
        }
    },


    logout: async (req, res, next) => {
        req.session.destroy();
        res.sendStatus(200);
        res.redirect('http://localhost:3000')
    },


    userSession: async (req, res, next) => {
        console.log('requested!')
        res.status(200).send(req.session.user)
    }
}