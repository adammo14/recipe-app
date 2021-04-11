const express = require("express");
const cors = require("cors");
require('dotenv').config({
    path: __dirname + '/.env'
});

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const db = require("./src/backend/models/index");
const Role = db.role;

// Connect to database
db.mongoose.connect(`${process.env.DB_STRING}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then((con) => {
    console.log('DB connection successful!');
    initial();
});

app.use(express.static('./dist/recipe-app'));
// home route
app.get("/", (req, res) =>
    res.sendFile('index.html', {
        root: 'dist/angular-heroku/'
    }),
);

// routes
require('./src/backend/routes/auth.routes')(app);
require('./src/backend/routes/user.model')(app);

// set port, listen for requests
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}
