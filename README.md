# assignment2-2

Programmazione Concorrente e Distribuita - Assignment 2-2

## Create-react-app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

It sets up your development environment so that you can use the latest JavaScript features, provides a nice developer experience, and optimizes your app for production. You’ll need to have Node >= 10.16 and npm >= 5.6 on your machine.

Create React App doesn’t handle backend logic or databases; it just creates a frontend build pipeline, so you can use it with any backend you want. Under the hood, it uses Babel and webpack, but you don’t need to know anything about them.

```sh
npm install -g create-react-app  # global install of CRA
npm init react-app . --legacy-peer-deps # create CRA
	# add flag --legacy-peer-deps with npm version > 7.0
```

### Commands

```sh
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

```sh
npm test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```sh
npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Packages

- (DEV) eslint eslint-config-airbnb eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
- (DEV) prettier eslint-config-prettier eslint-plugin-prettier
- moment [react-moment](https://www.npmjs.com/package/react-moment)
- [antd](https://ant.design/docs/react/introduce)
- [@ant-design/icons](https://ant.design/components/icon/)
- [router](https://reactrouter.com/web/guides/quick-start)
- [props-type](https://it.reactjs.org/docs/typechecking-with-proptypes.html)
