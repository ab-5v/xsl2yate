TESTS=test/*.js

test:
	mocha --require should --reporter spec $(TESTS)

.PHONY: test
