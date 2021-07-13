# Lisk RBAC Console & Demo Blockchain

This project includes the Lisk RBAC Console application as well as a slim blockchain application which has the Lisk RBAC module included. 

### Installation

* Lisk SDK 5.1 needs to be installed
* `git clone https://github.com/Hupka/lisk-rbac-chain.git`
* `npm install`
* Run the blockchain application: `./bin/run start`
* Run the Lisk RBAC Console frontend: `npm run start:ui` 
* Frontend is served at `http://localhost:3000`

As this application was a submission to the first Lisk Hackathon (HackOnLisk) there exists a [Youtube video](https://youtu.be/IAmn0VWXEbM?t=351) demoing how to use the frontend. 

#### Accounts for Demo Application

The passphrases are taken from the `.secrets/default/account.json` file.

```Typescript
// Account for 'rbac_admin' role: '024bd49e98ef623ea0f57a172353cf7a58087a55'
install expose machine clarify happy music shed misery tent ability minute wide
```
```Typescript
// Account for 'role_membership_admin' role: '0480c5eba43bb3a9b76cd20f9e3c99697fbe67d5'
occur turn defense ritual history present trend nominee width blind rocket sing
```
```Typescript
// Account for 'super_admin' role: '086baf263127a7fdf23439aa55265611105eed2d'
filter echo sausage desk awkward rally absurd peasant dress random draw column
```

### Features

* Insights into the on-chain RBAC ruleset: view roles, permissions, accounts and their permissions.
* Configure the RBAC ruleset by submitting various transactions. 

### Troubleshooting

Up until here, when submitting transactions none of the errors reported by the blockchain are visualized in the frontend. There debugging why submitted transactions didn't lead to a result can be cumbersome. We advise to use the network tab in the developer tools of your browser. 

**Common pitfalls:**
* Not logged in with a valid passphrase
* The account does not have sufficient permissions to submit any of the transactions. Can be validated on the 'Check Permissions' page.
