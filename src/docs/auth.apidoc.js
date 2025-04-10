/**
 * @api {post} /api/auth/login Login do usuário
 * @apiName LoginUser
 * @apiGroup Autenticação
 *
 * @apiBody {String} email Email do usuário.
 * @apiBody {String} password Senha do usuário.
 *
 * @apiSuccess (200) {String} token Token JWT para autenticação.
 *
 * @apiError (400) ValidationError Dados inválidos.
 * @apiError (401) Unauthorized Credenciais inválidas.
 */
