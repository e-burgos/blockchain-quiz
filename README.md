# Blockchain Quiz

You can see this [Demo](https://blockchain-quiz.vercel.app/) on vercel.

You can see vite version [Demo](https://membrane-frontend-cc-eburgos.vercel.app/) on vercel.

## The challenge

A survey company wants to make a new quiz form that rewards users with tokens for participating in the survey.
They create surveys, loading them into JSON format and they want you to develop a responsive web application using React and TypeScript for people to answer and submit the results, getting tokens in the process.

### Requirements:

- Vite (preferred) or Next.js for the front end infrastructure, taking into account for the architecture of the project hierarchy and organization of directories, routing, conventions and good practices of clean code, good design patterns for the app itself but also for the react components
- For the app state, React Query (preferred), Contexts or Mobx State Tree
- Material UI with React Hook Form for components (plus)
- Add a descriptive “readme” file, it should also include links to any resources and
  documentation used to solve the challenge.

### The web should behave as follows:

- Connect Metamask wallet
- Ensure user is connected to Goerli and if not show a button to switch networks
  automatically.
- Show balance of $QUIZ token (address below).
- Once the page is loaded, present the title of the daily trivia with its picture and a button
  that allows you to begin answering.
- Once the survey starts, display the current question, which will be available for the amount
  of seconds in the lifetimeSeconds property.
- Answered or not it should move onto the next question.
- Once all the questions are finished, show an overview with all the answers.
- Show a button to submit the questions to the validator contract
- Refresh the balance of $QUIZ

## Some improvements from the developer

- The Dapp will perform a validation if the metamask is installed, if not it shows a button to install it in the browser as an extension.
- User needs to install Metamask wallet to use the Dapp.
- The user must connect to the goerli network to start the questionnaire otherwise the application will tell you how to do it.
- The questionnaire is loaded from a JSON file and must have the ID Survey property to submit (in the given example it is not present).

## How to run the project

- Clone the project
- Make sure you have environment variables given in the .env.local-example file.
- Run `npm install` to install the dependencies
- Run `npm run dev` to run the project in development mode.
- Run `npm run build` to build the project.

## Main tutorials and tools used

[Web3Modal](https://github.com/WalletConnect/web3modal)

[WalletConnect Web3 Provider](https://www.npmjs.com/package/@walletconnect/web3-provider)

[Material UI](https://mui.com/)

[Material UI templates](https://mui.com/material-ui/getting-started/templates/)

## Material UI for Next.js with TypeScript

```sh
curl https://codeload.github.com/mui/material-ui/tar.gz/master | tar -xz --strip=2  material-ui-master/examples/nextjs-with-typescript
cd nextjs-with-typescript
```

Install it and run:

```sh
npm install
npm run dev
```

### The idea behind the example

The project uses [Next.js](https://github.com/vercel/next.js), which is a framework for server-rendered React apps.
It includes `@mui/material` and its peer dependencies, including `emotion`, the default style engine in MUI v5. If you prefer, you can [use styled-components instead](https://mui.com/material-ui/guides/interoperability/#styled-components).

### What's next?

You now have a working example project.
You can head back to the documentation, continuing browsing it from the [templates](https://mui.com/material-ui/getting-started/templates/) section.
