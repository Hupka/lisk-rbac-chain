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

### Features

* Insights into the on-chain RBAC ruleset: view roles, permissions, accounts and their permissions.
* Configure the RBAC ruleset by submitting various transactions. 

### Troubleshooting

Up until here, when submitting transactions none of the errors reported by the blockchain are visualized in the frontend. There debugging why submitted transactions didn't lead to a result can be cumbersome. We advise to use the network tab in the developer tools of your browser. 

**Common pitfalls:**
* Not logged in with a valid passphrase
* The account does not have sufficient permissions to submit any of the transactions. Can be validated on the 'Check Permissions' page.
