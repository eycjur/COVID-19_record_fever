
all: lint test dev
.PHONY: dev build lint test

dev:
	yarn dev
build:
	yarn build
lint:
	yarn eslint:fix
test:
	yarn test
