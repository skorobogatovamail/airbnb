cd server
npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string
npx sequelize-cli model:generate --name Entry --attributes name:string,address:string,description:text,hostId:integer,image:text
npx sequelize-cli model:generate --name Comment --attributes userId:integer,entryId:integer,text:integer
npx sequelize-cli model:generate --name Booking --attributes userId:integer,entryId:integer

npx sequelize-cli seed:generate --name User
npx sequelize-cli seed:generate --name Entry
npx sequelize-cli seed:generate --name Comment
npx sequelize-cli seed:generate --name Booking