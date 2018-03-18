/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');

const argv = require('./argv');
const port = require('./port');
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var request = require("request");



//now we should configure the APi to use bodyParser and look for JSON data in the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.solutiontoken.net');
  // res.setHeader('Access-Control-Allow-Origin', 'http://ec2-52-201-203-83.compute-1.amazonaws.com');
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', function(req, res) {

  let options = { method: 'POST',
    url: 'https://skill-maintainer.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: '{"client_id":"8vR3323RdsKiZPRVJ150z1KTY0Ied0Up","client_secret":"uParsneFgWvfr8tp3lyyF_8L6L-7HApdO128V9DauLQeA8u7ZWNYeZ77TRSRiVPt","audience":"https://skill-maintainer.auth0.com/api/v2/","grant_type":"client_credentials"}' };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    console.log(body);
  });

  res.json({ message: 'API Initialized!'});
});

router.route('/authenticate')
  .post(function (req, res) {
    console.log(req.body)
    var data = {
      grant_type: 'authorization_code',
      code: req.body.code,
      redirect_uri: 'http://localhost:3000',
      client_id: "860t6xr8dnzugs",
      client_secret: "rj8LTaY3hx3CywYj",
    }


console.log(data)


    res.json({ message: 'Authentication!'});

  })



app.use('/api', router);


// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});
