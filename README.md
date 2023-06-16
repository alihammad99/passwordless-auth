# SMS OTP Authentication Library
This mini library allows you to send OTP SMS messages to any phone number.
It builds on top of Express.js framework and D7networks SMS API with JWT.

### Update .env file with your D7networks API secret token, and JWT secret key:
  D7NETWORKS_BEARER_TOKEN="Your_D7etworks_Secret_Token"
  JWTSECRET="Any_Secret_Text"

## API endpoints
#### '/send-otp'
sends sms to a specific phone number.
{"phoneNumber":"+9641234567890"}

#### '/verify-otp'
Verifying the OTP code and sending an access token as a response.
{"phoneNumber":"+9641234567890", "otp":"1234"}

#### '/protected'
You need an access token to get a protected content
