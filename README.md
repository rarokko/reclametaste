# ReclameTaste

ReclameTaste is a project that you can search through many marvel characters and beers around the world and choose your favorites so you can keep all in one place.

<https://reclametaste.firebaseapp.com/>

## Run project locally

To initiate and run the project locally on your machine, run the command below to install all dependencies.

```bash
npm install
```

After this, you can initate the project locally

```bash
npm start
```

## Tests

There are some API and component tests to check the integrity of the application. You can run them by typing the command below.  
(Note: none of the API tests are mocked, so the tests will probably take some time)

```
npm test
```

## Build

This project is made with Create React App and there was no need to eject for now. All you have to do to prepare your production build is the command below. The final build will be in the /build folder.

```
npm run build
```

## Deploy

This project is alredy prepared for deploying to Firebase. To do so, you need to take some steps that are alredy documented on the Firebase documentation.

Install Firebase globally

```
npm install -g firebase-tools
```

Now you need to authenticate yourself

```
firebase login
```

Set ReclameTaste as the default project

```
firebase use default
```

Ready to deploy

```
firebase deploy
```