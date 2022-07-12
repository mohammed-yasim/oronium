const express = require('express')
const app = express()
const cors = require('cors');
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});
class User extends Model { }

User.init({
    // Model attributes are defined here
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING
    }, user_type: {
        type: DataTypes.STRING
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User' // We need to choose the model name
});

const port = 3001
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    sequelize.sync();
    res.send("Hello world Sync")
})
app.post('/login', (req, res) => {

    let username = req.body.email;
    let password = req.body.password;
    User.findOne({ where: { username: username, password: password } }).then((data) => {
        if (data) {
            let token = new Buffer(data.username).toString('base64')
            let user_type = data.user_type;
            res.json({
                token: token,
                user: user_type
            })
        }else{
            res.status(404).send("Nouser")
        }
    }).catch(err => {
        res.status(404).send(err)
    })

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})