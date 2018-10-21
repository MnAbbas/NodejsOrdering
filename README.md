# GolangOrdering
this is a sample of restful apis for ordering system

I did my best to keep it simple , clean and structured 

this project is built based on mvc models 

# Technology
I used [Nodejs](https://nodejs.org)  , [express](http://expressjs.com) , [mysql](https://www.mysql.com) , [chai](https://www.chaijs.com), [mocha](https://mochajs.org) in this project

# Settup
```bash
 ./bash.sh 
 ``` 
will install mysql & nodejs if needed otherwise it will create use , database and one table
```
default user is :=dumyuser
default pass is :=dumypassword
```
# Existinig mysql
if an istance of mysql is exist , please in bash.sh provide one user & password 
to execute the sql scripts
otherwise it will handeled by the bash file

# Google API Key
this project need a Google API key which has permition to call matrix api
for putting your own Google API Key you shoud go to config folder
```bash
 cd config/
 ```
under default.json or production.json change 
```javascript
"google_keys" : {
    "apikey" : "YOUR_API_KEY"
  }
```

# Pre-requirment
this project has its default value such as 
`dbuser` ,  `information` , `logfile path` , `server address` `listner`  `google api key`
but in case of changing anyof them 
you must have a folder named `config.json` or `production.json`
with a default in it according to source 
you could be able to change it accordingly
>permishn on bash.sh is important you must grant execution access to bash.sh
```bash
chmod +x bash.sh
```

# Test
I create more than 10 test cases which will be tested automaticly
just needed to go to root of project and call
```javascript
 npm test 
 ```
it will print the result of tests

# Run
for run the project
you sould copy the whole project in to one folder , alsoe the bash file must have the permision of execution
and then call 
``` bash
./bash.sh 
``` 
:+1: its ready to node! :shipit:
