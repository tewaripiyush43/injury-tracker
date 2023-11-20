This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Website Link
To see the deployed website please visit this link `https://injury-tracker-kappa.vercel.app/`

## Required Features
All the required features are implemented

## Bonus Features
This is a Progressive Web App (PWA)

## Getting Started

To run this project in the development server first, you need to create a MongoDB database and put that link in the `.env` file  `DATABASE_URL`

```bash
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.tqn6fhs.mongodb.net/<database_name>?retryWrites=true&w=majority
```
then you will need to update the Apollo client URL with your localhost URL in `lib/apolloClient` e.g. `http://localhost:3000/`

after that you will need to create an account on Auth0 and follow these instructions till `Configure the SDK` on `https://auth0.com/docs/quickstart/webapp/nextjs` and add the AUTH URLs in your env file.

```bash
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='https://{yourDomain}'
AUTH0_CLIENT_ID='{yourClientId}'
AUTH0_CLIENT_SECRET='{yourClientSecret}'
```

now you are ready to go

run 
```bash
npm i
```

and then 

```bash
npm run dev
```

to run the development server.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

