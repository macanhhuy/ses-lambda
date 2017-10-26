require('dotenv').load();

var AWS = require('aws-sdk');
var ses = new AWS.SES({ apiVersion: '2010-12-01' });
var toAddress = 'stream.space <macanhhuydn@gmail.com>';
var source = 'Stream Space <info@stream.space>';
var charset = 'UTF-8';

exports.handler = function (event, context) {
  var emailAddress = event.email;
  var name = event.name || '';
  var subject = 'Submitted Form';
  var replyTo = name + " <" + emailAddress + ">";
  var emailData = [];
  emailData.push("Name: " + name);
  emailData.push("Email: " + emailAddress);

  function sendEmail() {
    ses.sendEmail({
      Destination: { ToAddresses: [toAddress] },
      Message: {
        Body: { Text: { Data: emailData.join('\r\n'), Charset: charset } },
        Subject: { Data: subject, Charset: charset }
      },
      Source: source,
      ReplyToAddresses: [replyTo]
    }, function (err, data) {
      if (err) {
        console.log(err, err.stack);
        context.fal(err);
        return;
      }
      context.succeed({ msg: 'success' });
    });
  }
  sendEmail();
};
