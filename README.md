<img src="http://jack.plus/redisred/logo.png" />

A small Redis-based URL Redirector

[<img src="https://www.herokucdn.com/deploy/button.png">](https://www.heroku.com/deploy/?template=https://github.com/Detry322/redisred)

## Give it a test!

If you want to test it out first hand, try it here: [https://redisred.herokuapp.com/admin](https://redisred.herokuapp.com/admin)

Username: `admin`
Password: `testing`

## Features

### Randos

- Visitors can go to `/whatever`, and they'll be redirected to link named `whatever`
- If the link doesn't exist, they'll be presented with a nice 404 page :)
- Visiting just `/` brings you to a designated root redirect.

### Admins

- `/admin` brings people to page where they can sign in
- `/admin/redirects` lets people view and edit all of the redirects

### API

All requests must be authenticated with a `x-access-token` header.

- `GET /admin/api/` returns a json of all the redirects
- `POST /admin/api/create` creates a redirect with parameters `key` and `url`
- `POST /admin/api/delete` deletes a redirect with parameter `key`

## How to get up and running

Some quick easy steps:

1. Make sure you have `gcc`, `brew`, `node`, and `npm` installed.
2. Run `brew install redis`
3. Run `npm install && npm run create-config`
4. Edit the `.env` file to have the environment variables you like :)

## How to run the app locally

1. `npm run start-redis`
2. `npm start`

To stop the server, `Ctrl+C`, and then:

- `npm run stop-redis`

## Deploy the app to heroku

To deploy this to heroku, click this fancy button :)

[<img src="https://www.herokucdn.com/deploy/button.png">](https://www.heroku.com/deploy/?template=https://github.com/Detry322/redisred)

## Environment variables.

| Variable | Description |
| -------- | ----------- |
| PORT | The port this app should run on |
| ADMIN_USERNAME | The username used to log into the admin console |
| ADMIN_PASSWORD | The password used to log into the admin console |
| API_TOKEN | The token to be used on all API calls |
| ROOT_REDIRECT | The URL the root of your website should redirect to |
| SESSION_SECRET | A secret key for verifying the integrity of signed cookies |


## License

Redisred is released under the MIT license.
