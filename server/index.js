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

  // for(var i=0; i<100; i++){
  //   var ref = new Referral();
  //
  //   var rand = randomstring.generate({
  //     length: 6,
  //     charset: 'alphanumeric'
  //   });
  //
  //   ref.ref_code = rand;
  //   ref.save(function(err) {
  //     if (err)
  //       res.send(err);
  //   });
  //   console.log(ref)
  //
  // }

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
