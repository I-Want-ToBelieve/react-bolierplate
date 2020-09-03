This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Idea

Enhance people's life-long learning ability and promote the concept of sustainable development of life

## Requirements

- `node` version >= 12.14.1
- **windows os only:** [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) have been installed
- **mac os only:** Command Line Tools (CLT) for Xcode: xcode-select --install, [developer.apple.com/downloads](http://developer.apple.com/downloads) or [Xcode 3](https://apps.apple.com/us/app/xcode/id497799835)

## Getting started

Clone the repository
```
git clone
```

Switch to the repo folder
```
cd view_of_learning
```

Install dependencies
```
npm install yarn --global
yarn
```
**If you are blocked by GFW, use `yarn --ignore-optional` to skip installation of optional dependencies**

Runs the app in the development mode
```
yarn start
```

## Enhance your development experience

The [vscode](https://code.visualstudio.com/) editor extensions listed below can enhance your development experience, and other editors should have similar plugins.

- [css modules](https://marketplace.visualstudio.com/items?itemName=clinyong.vscode-css-modules)
- ~~[Node.js Modules Intellisense](https://marketplace.visualstudio.com/items?itemName=leizongmin.node-module-intellisense)~~
- [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [tailwindcss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components)
- [Headwind](https://marketplace.visualstudio.com/items?itemName=heybourn.headwind)
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
- [dotenv](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
- ~~[Document This](https://marketplace.visualstudio.com/items?itemName=joelday.docthis)~~
- [npm Dependency Links](https://marketplace.visualstudio.com/items?itemName=herrmannplatz.npm-dependency-links)
- [SVG Language Support](https://marketplace.visualstudio.com/items?itemName=jock.svg)
- ~~[Svg Preview](https://marketplace.visualstudio.com/items?itemName=SimonSiefke.svg-preview)~~
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=antfu.i18n-ally)


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `yarn lint`

Use eslint to check for script errors

### `yarn lint:fix`

Use eslint to check and try to fix script errors

### `yarn stylelint`

Use stylelint to check for style errors

### `yarn stylelint:fix`

Use stylelint to check and try to fix style errors

**Note: If you have added [these plugins](#enhance-your-development-experience) to your editor, you rarely need to manually execute any of the above code specification related commands.**

### `yarn analyze`

analyzing the bundle size
ref: https://github.com/svengau/cra-bundle-analyzer

Open report.html file with chrome:
```
chrome ./build/report.html
```

### `yarn analyze:source-map`

Source map explorer analyzes JavaScript bundles using the source maps. This helps you understand where code bloat is coming from.
ref: https://create-react-app.dev/docs/analyzing-the-bundle-size

## Learn More

There are a lot of link comments in the source code, if you do not understand the code, you might as well click the link in the comments to see!

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## QA
Q: `yarn upgrade` does not update package.json

A: ref https://github.com/yarnpkg/yarn/issues/2042
```
yarn global add npm-check-updates
ncu -u
yarn install --check-files
ncu -u
```
