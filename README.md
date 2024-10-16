
# Rate Limiter

## About The Project
 This is very simple verion of what asked , Tried to implement using redis Cache.

### Getting Started

 For this project Node , npm should be installed in your computer
 
 For Node installation , Refer : [Node Installation Guide](https://nodejs.org/en/download/source-code)
 
  Verify the Node and npm installation with 
  ```sh
  node --version
  ```
  ```sh
  npm  --version 
  ```
If you face difficulty with Nodejs Installtion Refer
[Medium trouble shooting Guide](https://medium.com/@asiandigitalhub/troubleshooting-installation-issues-for-node-js-40ef0261e54c)

### Setting Up the Project
1. Clone the Repo
```sh
git clone https://github.com/Jayanth930/FinTagret-Assignment
```
2. Install the dependencies
```sh
npm install 
```
3. Now run the server 
```sh
npm run start 
```

### Trouble Shooting Guide
* The major problem might arise would be due to verison problem and also with global packages verion vs local package version

### Available API End points

API : To Test Rate Limiting   
METHOD : **POST**  
ENDPOINT : http://localhost:3500/api/v1/bikes  
Content-Type : application/json  
{  
    &nbsp; &nbsp; &nbsp; "user_id" : "4587"  
}

### Flaws And Drawbacks

1. The main issue I was unable to solve is that ofcourse I think you guys doesn't want to make assignment hard , but the issue is that if a user exceeds the rate Limit I will queue them and Hit the same end-pint from my backend , but if it's success / failure how the user knows that , But I thought thats why in the assignment its asked to just write to Log file instead of respoding back.
<br>
&nbsp; &nbsp; &nbsp; Ex : Hypothetical case : We implemented this feature on API end-point : **Get blogs for a user** , Lets say user clicking on multiple blogs or some sort of button (could be a bot as well) then if I queue them , and Hit that from my backend (from queue), then how can I respond him back , usually we do that by res.status(200).json("Your blog") if we serving single user at a time , but now I can't figured it out by myself with Limited time.

2. Also as I am using 2 workers (2 replica sets), I observed when I setInterval for 60 secs , The redis cache called double time , so Logs in Log file are also double.