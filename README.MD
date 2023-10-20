# Frontent mobile

## Requirements

- Visual Studio Code --> yes
- Git ------------------------> yes
- React --------------------> yes
- React Native ----------> yes
- Expo --------------------> yes
- Expo Router ----------> yes
- Native Base ----------> yes
- GraphQL --------------> yes
- Apollo ------------------> yes
- Reactive Variables --> no
- ECharts ---------------> no
- Yup ---------------------> yes
- React Hook Form ---> yes
- luxon --------------------> yes
- TypeScript -------------> yes
- Cypress ----------------> no
- GraphQL Gen --------> no
- Debugging ------------> (using chrome)
- ESLint ------------------> no
- Prettier -----------------> no

## How to execute

(start backend first)

1 - Install dependencies with npm:

```
npm i
```

2 - Start expo with:

```
npm run start
```

3 - Change the url according to what expo shows in the console in the file
"app/\_layout.tsx":

```
const client = new ApolloClient({
  uri: 'http://192.168.1.70:3333/graphql', <--this line!
  cache: new InMemoryCache(),
})
```

4 - Select the options according to each platform.
