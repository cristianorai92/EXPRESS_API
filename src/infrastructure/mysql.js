import { database } from '../config/env.js';
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    ...database,
    waitForConnections: true,
    connectionLimit: 10,
    decimalNumbers: true
});

async function verificarConexao() {
    const connection = await pool.getConnection();
    try {
        await connection.query('SELECT 1');
    } finally {
        connection.release();
    }
}

export { pool, verificarConexao }