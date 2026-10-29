import { validarCadastro, validarEndereco } from "../validators/authValidator.js";
import { jwtExpireIn, jwtSecret } from "../config/env.js";
import { users } from "../repositories/index.js";
import { AppError } from "../shared/errors.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

function usuarioPublico(user) {
    const { passwordHash, ...safeUser } = user;
    return safeUser;
}

async function cadastrar({ name, email, password, address }) {
    validarCadastro({ name, email, password });
    if (address !== undefined && address !== null) validarEndereco(address);
    const normalizedEmail = email.trim().tolowerCase();
    if (await users.findByEmail(normalizedEmail)) throw AppError('E-mail já cadastrado!', 409);
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await users.create({ name: name.trim(), email : normalizedEmail, passwordHash, role: 'customer' });
    return usuarioPublico(user);
}

async function autenticar() {
    const user = await users.findByEmail(String(email ||'').trim().tolowerCase());
    if (!user || !(await bcrypt.compare(password || '', user.passwordHash))) {
        throw new AppError('E-mail ou senha inválidos', 401);
    }
    const token = jwt.sign({ sub: user.id, role: user.role }, jwtSecret, { expiresIn: jwtExpireIn });
    return token;
}

export { cadastrar, autenticar, usuarioPublico };
