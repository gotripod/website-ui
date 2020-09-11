# Running a development environment:

- Install docker + docker compose
- Install make

Then run:

`make start`

Access the site on http://localhost:3000.

# Deploying

Push to master (if you're an admin) or open a PR against admin. Deploys are done automatically from the master branch.

# Updating dependencies

Open the Terminal in VSCode.

To see what's outdated:

`npx npm-check-updates`

To update package.json:

`npx npm-check-updates -u && npm install`

Then stop the docker container and rebuild with:

`make start-with-rebuild`
