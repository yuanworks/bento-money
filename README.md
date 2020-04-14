A React Native application for [Lunch Money](https://lunchmoney.app), with basic functionality.

## TO RUN

This project is bootstrapped using **expo**:
```
yarn start
// or npm start
```

On the expo browser tab (Metro Bundler), you can run on your Android/iOS device, or on your web browser for easier testing.

### How to get an acces token

You will need to set up your own Access Key by visiting getting an [access token](https://developers.lunchmoney.app/) and adding it as a secret, creating an `.env.development` file locally and then restarting the application:

```
> .env.development

LUNCH_MONEY_ACCESS_TOKEN=[token] # replace [token] with your token
```

Be aware that this token should be kept a secret to the outside world. Should you accidentally share it or commit it, immediately go to your Lunch Money dashboard to expire the token and get a new one.

If you change access tokens, changing the .env file may not refresh variables correctly, in such case you will need to first update the .env file (add an extra line break), then edit and save the `transactionsAPI.js` file while the application is running and retry, all while the environment is running.  [¯\\\_(ツ)_/¯](https://github.com/zetachang/react-native-dotenv/issues/20#issuecomment-415384662).

### Disclaimer

I am a React developer (and a Redux fan) who is just getting acquainted with mobiles (the last time I did something for anything mobile was in 2007 in C. So go figure.)

With this debut project I slowly discovering best practices for React Native. Much of the code will be revamped as I learn of a more *native* (pun intended) approach to mobile development. 

## LICENSE

TBD.

## TODO

- [x] Use asyncthunk from redux-toolkit
- [ ] Update optimistic entry
- [ ] array of currencies and their aliases
- [ ] Add sorting by dollar (or default currency) calculated value
- [ ] Remove placeholder React Native/Nav/Expo code
- [ ] Add new transaction
- [ ] Dark Mode
- [ ] Get available currencies from all transactions