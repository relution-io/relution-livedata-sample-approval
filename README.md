#Relution Livedata Sample Approval

[![Join the chat at https://gitter.im/mwaylabs/relution-livedata-sample-approval](https://badges.gitter.im/mwaylabs/relution-livedata-sample-approval.svg)](https://gitter.im/mwaylabs/relution-livedata-sample-approval?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

###Dependencies:
- node
- cordova
- mcap-cli
- ruby sass
- gulp

###Installation
#####Server
1.
  ````
    npm i -g mcap-cli
  ````
2.
````
  cd relution-livedata-approval-sample
````
3.
````
    mcap
    add Server
    mcap deploy
````
####Client
go into the folder

````
cd relution-livedata-approval-sample/client
````
add your Server Url in
`````
	relution-livedata-approval-sample/client/app/main/constant/env-dev.json
    "SERVER_URL": "YOUR SERVER URL"
`````
install dependencies:
````
	npm i && bower i
````
start in browser
````
	gulp watch
````
there are many more Gulp Commands are available full Documentation can be read [here](https://github.com/mwaylabs/generator-m)

