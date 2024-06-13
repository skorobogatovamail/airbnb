mkdir server client
npx gitignore node

touch .prettierrc
echo '
{
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "trailingComma": "all"
}
' > .prettierrc

cd server
npm init -y 
npm i express sequelize sequelize-cli pg pg-hstore morgan dotenv nodemon cookie-parser jsonwebtoken bcrypt
npm init @eslint/config@0.4.6

touch .env .env.example
echo 'DB_NAME=
DB_USER=
DB_PASS=
PORT=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=' > .env

echo 'DB_NAME=
DB_USER=
DB_PASS=
PORT=
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=' >  .env.example