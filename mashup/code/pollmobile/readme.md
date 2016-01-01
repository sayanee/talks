# poll mobile

> rotate your mobile to vote yes or no and see the collated results from the audience

# install

1. clone app

  ```sh
  git clone
  ```
- set the [production url](https://github.com/sayanee/pollmobile/blob/master/public/result.html#L48)
- install packages

  ```sh
  $ npm i && bower i
  ```
- start the app server

  ```sh
  $ npm start

  ...
  Open in mobile at {SERVER_IP_ADDRESS}
  ```
- user interaction:
  1. vote at `{SERVER_IP_ADDRESS}`
  - Set 3 new questions at `{SERVER_IP_ADDRESS}/admin`
  - See collated real-time votes `yes` or `no` at `{SERVER_IP_ADDRESS}/result`. Press `spacebar` to rotate the questions for the audience to vote.

# deploy

1. using [heroku](https://heroku.com)
