import { verificarConexao } from "./infrastructure/mysql.js";
import { port } from "./config/env.js";
import app from "./app.js";

verificarConexao()
    .then(() => app.listen(port, () => console.log(`GT Store API está disponível: http://localhost:${port}`)))
    .catch((erro) => {
        console.log('Não foi possível inicializar a aplicação', erro);
        process.exitCode = 1;
    });