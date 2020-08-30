const whitelist = [
  "http://localhost:3001/",
  "http://localhost:3000/",
  "http://localhost:3000",
  "http://localhost:5000/",
  "http://localhost:4000",
  "http://localhost:4000/",
  "https://causality-app.herokuapp.com",
  "http://ec2-3-129-43-146.us-east-2.compute.amazonaws.com:4000",
  "http://ec2-3-129-43-146.us-east-2.compute.amazonaws.com:3000",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`Origin: ${origin} Not allowed by CORS`));
    }
  },
};

module.exports = corsOptions;
