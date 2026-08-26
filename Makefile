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

# example change
# Go Git CMS — edit posts locally in the CMS editor (no account needed).
cms:
	npx @go-git-cms/gitcms-ide dev --local
