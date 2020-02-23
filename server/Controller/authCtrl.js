const bcrypt = require('bcrypt')

module.exports = {
    login: async (req, res, next) => {
        const db = req.app.get("db");
        let { password, email } = req.body
        const foundUser = await db.select_user(email).catch(err => console.log(err))
        if(!foundUser.length){
            res.status(401).send("That user doesn't exist")
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
                res.status(401).send('')
                
            }
        }
    },


    register: async (req, res, next) => {
        const db = req.app.get('db');
        const { username, password, email } = req.body;
        const foundUser = await db.select_user(email);
        console.log('founduser')
        if (foundUser.lenth){
            res.status(401).send('That user already exists! Please use an alternate email')
        } else {
            const saltRounds = 12;
            bcrypt.genSalt(saltRounds).then(salt => {
               bcrypt.hash(password, salt).then(hashedPassword => {
                   db.create_user([username, email, hashedPassword])
                   .then(([user]) => {
                       req.session.user = user;
                       res.status(200).send(req.session.user)
                   }).catch(res.status(401).send(''))
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