/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the GO1 Accounts.
 *
 */

var request = require('request'); // "Request" library

var client_id = 'client_id'; // Your client id provided by your GO1 portal 
var client_secret = 'client_secret'; // Your secret provided by your GO1 portal

// your application requests authorization
var authOptions = {
  url: 'https://auth.go1.com/oauth/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the GO1 API
    var token = body.access_token;
    var options = {
      url: 'https://api.go1.com/v2/me',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    request.get(options, function(error, response, body) {
      console.log(body);
    });
  }
});
