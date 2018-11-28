# Setup instructions

- [Download and install Nodejs](https://nodejs.org/en/)

- While installing, make sure common dependencies are installed as well.  
  (For example, [Python2 is required by node-gyp](https://github.com/nodejs/node-gyp), most of this will be taken care of for you by the installer)

- open terminal/command prompt with admin privileges

- ``npm install -g ionic``  
  (may require ``sudo`` on Mac or Linux)

- ``npm install -g cordova``  
  (may require ``sudo`` on Mac or Linux)

- These dependencies are required globally

- Navigate terminal to this project's repo and ``npm install``  
  (This will look at ``packages.json`` and install other node packages required by the project locally in the repo)

- ``ionic serve``  
  It will take a while to compile, but the page should show up in your browser.
