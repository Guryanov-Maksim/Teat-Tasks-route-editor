install: install-deps

start:
	npx webpack serve

install-deps:
	npm ci

build:
	NODE_ENV=production npx webpack