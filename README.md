# Host on Chain

##

Install dependencies

```
yarn install
```

Run the code

```
yarn dev
```

## Description of the project

## Inspiration

With our background in charities, it was important for us to take this opportunity to create a social project.
One of our teammate is coming from Ukraine so we wanted to find a way to help refugees. Also, with the recent winter hitting Berlin, we thought about hosting homeless and refugees in hostel rooms paid thanks to donation.

## What it does

Connect donators to charity DAO to host homeless people or refugees.

## How we built it

We built a Dapp hosted on Q chain.
When a users makes a donation, a transaction from the user's address to a smart contract will be sent.
The Smart Contract will then make a transaction to the Charity DAO and reward the user with an NFT.

It was relevant for us to build on Q chain because decisions can be enforced on this blockchain. Thus, a user can trust the DAO to spend the money the right way.

## Challenges we ran into

We used the library wagmi to connect to metamask and to the smart contract. However this library is not supporting Q chain.
We were also challenged by time because even with all efforts we could not implement the connection through a web3provider in time.

## Accomplishments that we're proud of

Create a fully functional plateform and make it available online.
Create a functional smart contract to manage donation.

## What we learned

Work with a very tight schedule
Communicate within the team between people who have different backgrounds and tech skills.

## What's next for H.E.R. build

Implement connection to metamask and to the smart contract on Q chain.
Create a backend and a databse to store users and rooms.
