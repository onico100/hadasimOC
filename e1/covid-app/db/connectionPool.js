const mongoose = require("mongoose");

const user = 'user1'
const pass = 'One123'

//

mongoose
    .connect(
        `mongodb+srv://${user}:${pass}@cluster0.bpv6d9b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => console.log("Database Connected 😃"))
    .catch((err) => console.log(` O No...Something went wrong 😭 - ${err}`));
