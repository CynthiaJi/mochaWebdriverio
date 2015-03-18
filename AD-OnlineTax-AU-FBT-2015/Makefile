DIR ?= $(dir $(lastword $(MAKEFILE_LIST)))
LINT := $(DIR)/node_modules/.bin/eslint
MOCHA := $(DIR)/node_modules/.bin/mocha

all: test lint

lint:
	@$(LINT) *.js lib spec

test:
	@$(MOCHA) --recursive spec/**/*.spec.js

.PHONY: lint test
