import { MovieModel } from '../../mongoose/schemas/movie.schema.js';

export class MovieMongoRepository {
  async create(movieData) {
    const movie = new MovieModel(movieData);
    await movie.save();
    return movie.toObject();
  }

  async findAll() {
    return MovieModel.find().lean();
  }

  async findById(id) {
    return MovieModel.findOne({ id });
  }

  async update(id, data) {
    return await MovieModel.findOneAndUpdate({ id }, data, {
      new: true,
    });
  }

  async delete(id) {
    return await MovieModel.deleteOne({ id });
  }
}
