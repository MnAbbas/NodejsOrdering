# GolangOrdering
this is a sample of restful apis for ordering system

I did my best to keep it simple , clean and structured 

this project is built based on mvc models 

# Technology
I using [Nodejs](https://nodejs.org)  , [express](http://expressjs.com) , [mysql](https://www.mysql.com) , [chai](https://www.chaijs.com), [mocha](https://mochajs.org) in this project

# Settup
``` ./bash.sh ``` 
will install mysql & nodejs if needed otherwise it will create use , database and one table
default user is :=dumyuser
default pass is :=dumypassword

# Existinig mysql
if an istance of mysql is exist , please in bash.sh provide one user & password 
to execute the sql scripts
otherwise it will handeled by the bash file

# Pre-requirment
this project has its default value such as 
dbuser information , logfile path , server address listner 
but in case of changing anyof them 
you must have a folder named config
with a config.yaml in it according to source 
you could be able to change it accordingly

# Test
I create more than 10 test cases which will be tested automaticly
just needed to go to root of project and call
``` npm test ```
it will print the result of tests

# Run
for setup and run project just need these files
- bash.sh ---- this is for setup and run project
- mysqlscript.sql -- this is mysql script

:+1: its ready to node! :shipit:
