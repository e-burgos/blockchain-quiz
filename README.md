# Blockchain Quiz

You can see this [Demo](https://blockchain-quiz.vercel.app/) on vercel.

## The challenge

A survey company wants to make a new quiz form that rewards users with tokens for participating in the survey.
They create surveys, loading them into JSON format and they want you to program a responsive web application using React or Next.js & Material UI/AntDesign for people to answer and submit they results, getting tokens in the process.

The web should behave as follows:

- Connect Metamask wallet
- Ensure user is connected to ropsten, if not show a button to switch networks
  automatically.
- Show balance of $QUIZ token (address below).
- Once the page is loaded, present the title of the daily trivia with its picture and
  a button that allows you to begin answering.
- Once the survey starts, display the current question, which will be available for
  the amount of seconds in the lifetimeSeconds property.
- Answered or not it should move onto the next question.
- Once all the questions are finished, show an overview with all the answers.
- Show a button to submit the questions to the validator contract
- Refresh the balance of $QUIZ

## Main tutorials and tools used

[Adding Web3 to Our NextJS TypeScript Project](https://betterprogramming.pub/adding-web3-to-our-nextjs-typescript-project-861e9ed5feaf)

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
