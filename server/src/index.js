const express = require("express");
const app = express();
const { PORT, CLIENT_URL } = require("./constants");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport");

// const path = require("path");

// const _dirname = path.dirname("");
// const buildPath = path.join(_dirname, "../client/build");
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());
// app.use(express.static(buildPath));

// app.use(
//   cors({
//     origin: "*",
//   })
// );

require("./middlewares/passport-middleware");

app.use(cookieParser());
app.use(passport.initialize());

const authRoutes = require("./routes/auth");

app.use("/api", authRoutes);

const appStart = () => {
  try {
    app.listen(PORT, () => {
      console.log(`The app is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

appStart();
