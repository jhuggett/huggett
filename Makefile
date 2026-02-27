.PHONY: dev build preview clean install

dev:
	yarn dev

build:
	yarn build

preview:
	yarn preview

install:
	yarn install

clean:
	rm -rf dist .astro node_modules

reinstall: clean install
