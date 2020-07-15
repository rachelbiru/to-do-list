import { createPool } from 'mysql2/promise';

export async function connect() {
 const connection = await createPool({
        host: 'localhost',
        user: 'root',
        password: "0549452791",
        database: 'to_do_list',
        connectionLimit: 10
    })

    return connection;

}

