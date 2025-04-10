/**
 * @api {post} /api/movies Criar filme
 * @apiName CreateMovie
 * @apiGroup Filmes
 *
 * @apiBody {String} title Título do filme.
 * @apiBody {String} description Descrição do filme.
 * @apiBody {Number} releaseYear Ano de lançamento.
 *
 * @apiSuccess (201) {String} id ID do filme.
 * @apiSuccess (201) {String} title Título.
 * @apiSuccess (201) {String} description Descrição.
 * @apiSuccess (201) {Number} releaseYear Ano de lançamento.
 * @apiSuccess (201) {Object} externalData Dados da OMDb.
 *
 * @apiError (400) ValidationError Erro de validação.
 * @apiError (500) ServerError Erro interno.
 */

/**
 * @api {get} /api/movies Listar todos os filmes
 * @apiName GetAllMovies
 * @apiGroup Filmes
 *
 * @apiSuccess (200) {Object[]} movies Lista de filmes com dados do OMDb.
 *
 * @apiError (500) ServerError Erro ao listar filmes.
 */

/**
 * @api {get} /api/movies/:id Buscar filme por ID
 * @apiName GetMovieById
 * @apiGroup Filmes
 *
 * @apiParam {String} id ID do filme.
 *
 * @apiSuccess (200) {String} id ID do filme.
 * @apiSuccess (200) {String} title Título.
 * @apiSuccess (200) {String} description Descrição.
 * @apiSuccess (200) {Number} releaseYear Ano de lançamento.
 * @apiSuccess (200) {Object} externalData Dados adicionais da OMDb.
 *
 * @apiError (404) NotFound Filme não encontrado.
 */

/**
 * @api {put} /api/movies/:id Atualizar um filme
 * @apiName UpdateMovie
 * @apiGroup Filmes
 *
 * @apiParam {String} id ID do filme.
 * @apiBody {String} [title] Novo título.
 * @apiBody {String} [description] Nova descrição.
 * @apiBody {Number} [releaseYear] Novo ano de lançamento.
 *
 * @apiSuccess (200) {Object} movie Filme atualizado.
 *
 * @apiError (400) ValidationError Erro de validação.
 * @apiError (404) NotFound Filme não encontrado.
 */

/**
 * @api {delete} /api/movies/:id Deletar um filme
 * @apiName DeleteMovie
 * @apiGroup Filmes
 *
 * @apiParam {String} id ID do filme.
 *
 * @apiSuccess (204) NoContent Filme deletado com sucesso.
 *
 * @apiError (404) NotFound Filme não encontrado.
 */
