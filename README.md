# Dynamic Take Home Challenge

## Introduction

This is a learning + demo project built for job application at Dynamic.xyz that runs on sepolia test network.
It's a simple single page app + API that allows you to login with Dynamic and then create and manage
multiple custodial wallets. You can:
- Create wallets
- Update wallet's personal alias and description
- Sign Messages
- Send Transactions
- Share wallets (either read-only or allowing signature)

## Security considerations

Private keys are being stored as plain text on a serverless database. Of course this is not advised for a
real world implementation of this kind of product, where handling and storing private keys should be done
under much better security measures and following proper standards. As this was just a test project,
implementing such barriers were outside of the scope of the task.

## Testing

TBD

## Architecture decisions

As I don't have a previous blockchain background, I decided to learn the basics by using Dynamic.xyz SDK,
as that would be more useful in case I got hired. For that reason I started from
the [NextAuth & Dynamic](https://docs.dynamic.xyz/guides/frameworks/next-auth) guide and cloning
the [dynamic-labs/nextAuth-example](https://github.com/dynamic-labs/nextAuth-example) project.
When cloning the project I found out it was not working properly so I had to first understand and fix the
issue. Later on, I continued with implementing the challenge while trying to stick as much as possible
to the specifications of the Take Home. I build a simple API architecture following REST principle but
implementing only the requested actions:
- `GET /api/wallets` List all available wallets for current user
- `POST /api/wallets` Creates a new wallet
- `POST /api/wallets/[address]/sendTransaction` Transfers an amount to a receiver wallet
- `GET /api/wallets/[address]/signMessage` Signs a message and return the signature

Besides the API, I implemented the UI by using server actions, which are the recommended Next.js way to
handle this kind of tasks.

For the dabatase, I created a simple structure consisting in two tables:
- `wallets`: Store address, private key, and audit timestamps.
- `wallet_access`: With `address`+`user_email` as primary key, it links the wallets to the users, allowing
to share a wallet. I also included `alias` and `description` as part of this table, to enable different
users to have a different alias for the same shared wallet. For example, I could call it: `My shared wallet`
and somebody else could call that same wallet `Gonzalo's wallet`. This table also has an `access_rights`
array field that allows to scalate to a granular level of permissions. However, right now I've only
implemented 3 kind of access rights:
  - `reader`: They can see the wallet on their list and update it's own alias/description for that wallet.
  - `signer`: All above + can sign message or send transactions.
  - `owner`: All above + can decide to share the account and set permissions.

I've not used an ORM, wich is probably not ideal, but with this really simple and small DB schema and a
limited amount of time it was not worthy to implement a whole ORM, so I just used prepared statements
through tagged template literals.

## Other considerations

As this is just a sample project and I'm already behind schedule, there are multiple missing features,
i.e. you can't update or remove access right once you shared the wallet. Of course this is not suitable
for real world scenario, but I didn't wanted to keep delaying the submit of the take home. The same
applies to the UI, which is really basic and uses `prompt`, `confirm` and `alert` boxes instead of proper
styled popup components, but as I'm applying for a backend position I decided to don't spend extra time
on improving the UX and just focus on being able to fulfill all required features.