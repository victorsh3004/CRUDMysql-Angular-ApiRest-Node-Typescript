import mysql from 'mysql2';

import keys from './keys';

const pool = mysql.createPool(keys.database).promise();

pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection);
        console.log("connection");
});

export default pool;