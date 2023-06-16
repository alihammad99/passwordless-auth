# OTP Authentication Library
This mini library allows you to send otp sms messages to any phone number.
It build on top of express.js framework and D7networks SMS API with JWT.

### You need D7networks api secret token, and JWT secret key in .env file:
D7NETWORKS_BEARER_TOKEN="Your_D7etworks_Secret_Token"
JWTSECRET="Any_Secret_Text"

## Api end points
### /send-otp: sends sms to a specific phone number.
{"phoneNumber":"+9641234567890"}

### /verify-otp
Verifying the otp code and sending an access-token as response.
{"phoneNumber":"+9641234567890", "otp":"1234"}

### /protected
You need an access-token to get a protected content
