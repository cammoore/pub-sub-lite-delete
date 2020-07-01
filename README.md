# Example pub-sub-lite Meteor application

## Installation

First, download and install [Meteor](https://www.meteor.com/). 

Second, download the pub-sub-lite-delete code from [https://github.com/cammoore/pub-sub-lite-delete](https://github.com/cammoore/pub-sub-lite-delete).

Next, cd to the `pub-sub-lite-delete/app` directory and invoke `meteor npm install`:

```
pub-sub-lite-delete/app $ meteor npm install
```

This will download and install the third-party libraries required to run this system. If you are not in the `app` directory and you run `meteor npm install`. You will see something like:
```shell script
pub-sub-lite-delete $ meteor npm install
npm WARN saveError ENOENT: no such file or directory, open 'pub-sub-lite-delete\package.json'
npm WARN enoent ENOENT: no such file or directory, open 'pub-sub-lite-delete\package.json'
npm WARN pub-sub-lite-delete No description
npm WARN pub-sub-lite-delete No repository field.
npm WARN pub-sub-lite-delete No README data
npm WARN pub-sub-lite-delete No license field.

up to date in 0.426s
found 0 vulnerabilities

pub-sub-lite-delete $
```
To make sure the database starts from an empty state, run:

```
pub-sub-lite-delete/app$ meteor reset
Project reset.
pub-sub-lite-delete/app $
```

To run the system, invoke this command:

```
 meteor npm run start                                                                                                                                                   12:28:08

> app@ start pub-sub-lite-delete/app
> cross-env METEOR_NO_RELEASE_CHECK=1 meteor --settings ../config/settings.development.json

[[[[[ /pub-sub-lite-delete/app ]]]]]

=> Started proxy.                             
=> Started MongoDB.                           
W20200701-12:29:03.417(-10)? (STDERR) Note: you are using a pure-JavaScript implementation of bcrypt.
W20200701-12:29:03.472(-10)? (STDERR) While this implementation will work correctly, it is known to be
W20200701-12:29:03.472(-10)? (STDERR) approximately three times slower than the native implementation.
W20200701-12:29:03.472(-10)? (STDERR) In order to use the native implementation instead, run
W20200701-12:29:03.473(-10)? (STDERR) 
W20200701-12:29:03.473(-10)? (STDERR)   meteor npm install --save bcrypt
W20200701-12:29:03.473(-10)? (STDERR) 
W20200701-12:29:03.473(-10)? (STDERR) in the root directory of your application.
I20200701-12:29:05.243(-10)? Creating default data.
I20200701-12:29:05.244(-10)?   Adding: Basket (john@foo.com)
I20200701-12:29:05.280(-10)?   Adding: Bicycle (john@foo.com)
I20200701-12:29:05.283(-10)?   Adding: Banana (admin@foo.com)
I20200701-12:29:05.285(-10)?   Adding: Boogie Board (admin@foo.com)
=> Started your app.

=> App running at: http://localhost:3000/
```

Don't worry about the bcrypt warning.

Open localhost:3000 in your browser. You should see a list of stuff. Adding and updating works fine, but deletion does delete an item, but the list keeps displaying the item until you refresh the page.
