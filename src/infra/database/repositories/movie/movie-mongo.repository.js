import { MovieModel } from '../../mongoose/schemas/movie.schema.js';

function cleanMovieData(movie) {
  const { _id, __v, createdAt, updatedAt, ...rest } = movie;
  return rest;
}

export class MovieMongoRepository {
  async create(movieData) {
    const movie = new MovieModel(movieData);
    await movie.save();
    return cleanMovieData(movie.toObject());
  }

  async findAll() {
    const movies = await MovieModel.find().lean();
    return movies.map(cleanMovieData);
  }

  async findById(id) {
    const movie = await MovieModel.findOne({ id }).lean();
    return movie ? cleanMovieData(movie) : null;
  }

  async update(id, data) {
    const movie = await MovieModel.findOneAndUpdate({ id }, data, {
      new: true,
      lean: true,
    });
    return movie ? cleanMovieData(movie) : null;
  }

  async delete(id) {
    return await MovieModel.deleteOne({ id });
  }
}
