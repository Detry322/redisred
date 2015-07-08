# redisred

A small Redis-based URL Redirector

## Features

### Random Visitors:

- Visitors can go to `/<whatever>`, and they'll be redirected to the associated link.
- If the link doesn't exist, they'll be presented with a nice 404 page :)
- Visiting just `/` brings you to a designated root redirect.

### Admins:

- `/admin` brings people to page where they can sign in
- `/admin/redirects` lets people view and edit all of the redirects

### API:

When logged in these calls will work.

- POST `/admin/create` creates a redirect with key `redirect_key` and url `redirect_url`
- POST `/admin/delete` deletes a redirect with key `redirect_key`

## How to get up and running

Some quick easy steps:

1. Make sure you have `gcc`, `brew`, `node`, and `npm` installed.
2. Run `brew install redis`
3. Run `npm install && npm run create-config`

## How to run the app locally

1. `npm run start-redis`
2. `npm start`

To stop the server, `Ctrl+C`, and then:

- `npm run stop-redis`
