###### CityScope!!!!

### Technology Stack

- **Language** : Javascript
- **Framework** : React

### Libraries

- **UI Library**: Antd [(link)](https://ant.design/)
- **forms**: Formik [(link)](https://formik.org/)
- **form validation**: yup [(link)](https://www.npmjs.com/package/yup)
- **time**: moment [(link)](https://momentjs.com/)
- **State Management**: Redux [(link)](https://redux.js.org/)

### VS Code extensions

- ESLint
- Prettier

### Project Setup

- Clone the project [repository](https://gitlab.com/dhruv-grappus/analog/analog-frontend-cms.git) from Bitbucket
- After cloning, get into the project folder
  ```sh
  $ cd frontend-command-centre
  ```
- Add your git info
  ```sh
  $ git config --local user.name "<your full name>"
  $ git config --local user.email "<your grappus email id>"
  $ git config --local user.signingkey "<your grappus gitlab signingkey>"
  ```
- Checkout your new branch from `dev`
- Install all dependencies
  ```sh
  $ yarn
  ```
- Paste the env variables in the `.env` files
- Run the app
  ```sh
  $ yarn start
  ```
- App is now running at
  ```
  http://localhost:3000/
  ```

### Ground rules

- we use `yarn` as package manager, so should you. It is advised **not** to mix package managers in order to avoid resolution inconsistencies caused by unsynchronized lock files.

### Authors and Maintainers

##### Nikhil Srivastava : nikhil21.sri@gmail.com
