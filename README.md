# ![Logo](https://github.com/arianeborges/ignews/blob/master/public/images/logo.svg)

### 💻 DEMO

![ignews demo](https://github.com/arianeborges/ignews/blob/master/Animation.gif)

### 📜 About

The application was developed using the NextJS framework applying concepts such as external API consumption, Root API, Server Side Rendering (SSR), Static Site Generation (SSG), STRIPE for subscription payments, NextAuth for authentication with Github, FaunaDB to store the information of the user in a database and Prismic CMS for adding and managing the content of the posts.

### 🛠 Technologies

- React JS
- Next JS
- [Next-Auth](https://next-auth.js.org/)
- Typescript
- SASS
- [FaunaDB](https://fauna.com/)
- [Stripe](https://stripe.com/)
- [Prismic CMS](https://prismic.io/docs)

### 📋 Funcionalities

- [x] Login via Github
- [x] Subscription via Stripe
- [x] See all posts preview without login and subscription
- [x] See all posts when logged and subscribed

### 📕 Installation

#### Requirement

Create account and configure external services:

- Stripe
- FaunaDB
- Prismic CMS

Service settings are located in the [servicesConfig.md](https://github.com/arianeborges/ignews/blob/master/serviceConfig.md) file at the root of the project.

```
# Clone this repository
$ git clone https://github.com/arianeborges/ignews.git

# Open the folder ignews
$ cd ignews

# Install the dependencies
$ npm install 

# At the root of the project, create a copy of the .env.local.example file
# Change the name of the copy to .env.local
# Fill in the environment variables according to the instructions
$ cp .env.local.example .env.local

# Run stripe listen to listen to webhook events
$ stripe listen --forward-to localhost:3000/api/webhooks 

# Execute the application
$ npm dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
