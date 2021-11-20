#!/bin/sh

#NextJs
rm -rf templates/nextjs-redux
heroku git:clone -a mernjs-nextjs templates/nextjs-redux


#NodeJs
rm -rf templates/nodejs-expressjs
heroku git:clone -a mernjs-nodejs templates/nodejs-expressjs


#Context
rm -rf templates/reactjs-context
heroku git:clone -a mernjs-react-context templates/reactjs-context


#ElectronJs
rm -rf templates/reactjs-electronjs
heroku git:clone -a mernjs-electronjs templates/reactjs-electronjs


#ReactJs
rm -rf templates/reactjs-redux
heroku git:clone -a mernjs-reactjs templates/reactjs-redux