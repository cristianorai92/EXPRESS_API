import mysql from 'mysql2/promise'
import { database } from '../config/env';

const pool = mysql.createPool({
    ...database,
    waitForConnections: true,
    connectionLimit: 10,
    decimalNumbers: true
});

