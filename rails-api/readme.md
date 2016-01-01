#Rails API

- Meetup on 29 April 2014: [Singapore Ruby Meetup](http://www.meetup.com/Singapore-Ruby-Group/events/174440162/)
- Slides: [Speaker Deck](https://speakerdeck.com/sayanee/rails-api)

##Install

1. rename binary file `code` to `code.zip` and unzip it
1. there are 2 folders in `code.zip`: `api` and `www`

###api folder

1. this folder has the code for rails api
1. list all the git tags with tag comments

	```
	git tag -l -n1
	```
1. go from step 1 to step 7

	```
	git checkout step1
	```
1. all tags are:

	```
	step1           rails api
	step2           api versioning
	step3           json
	step4           cors
	step5a          simple user login
	step5b          token sent as part of http headers
	step5c          api exchange with token
	step6           mock server
	step7           rspec testing
	```

###www folder

1. this folder has the code for frontend angularjs
1. list all the git tags with tag comments

	```
	git tag -l -n1
	```
1. sync the step number with rails api code starting from step 4

	```
	git checkout step4a
	```
1. all tags are:

	```
	step4a          step4a - display meetups with static data
	step4b          step4b - successful cors
	step5a          simple user login
	step5c          api exchange with token
	step6           mock server
	```
