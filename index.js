const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3977;
const { API_VERSION, IP_SERVER, PORT_DB } = require("./config");
//In case we use two servers, one for frontend and one for backend.
//const IP_SERVER = "localhost";
//mongoose.connect(`mongodb://localhost`);

//Prevent warning: `findOneAndUpdate()` and `findOneAndDelete`
//without the `useFindAndModify` option set to false because
//they're deprecated.
mongoose.set("useFindAndModify", false);

//Connection to the database
mongoose.connect(
  `mongodb://${IP_SERVER}:${PORT_DB}/RapidCycleDB`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("Conectada a la base de datos.");
      app.listen(port, () => {
        console.log("@@@@@@@ API REST @@@@@@@");
        console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}`);
      });
    }
  }
);
