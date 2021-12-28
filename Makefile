install: install-deps

start:
	npx webpack serve

install-deps:
	npm ci

build:
	NODE_ENV=production npx webpack

lint:
	npx eslint . --ext js,jsx