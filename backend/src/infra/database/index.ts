import pgPromise from "pg-promise";

const pgp = pgPromise({});

const database = pgp({
    user: "postgres",
    password: "admin",
    host: "postgres",
    port: 5432,
    database: "postgres",
    allowExitOnIdle: true
})

export default database;
