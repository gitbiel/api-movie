export class MovieRepository {
  constructor(movieModel) {
    this.movieModel = movieModel;
  }

  async create(data) {
    const movie = new this.movieModel(data);
    return await movie.save();
  }

  async findAll() {
    return await this.movieModel.find();
  }

  async findById(id) {
    return await this.movieModel.findById(id);
  }

  async update(id, data) {
    return await this.movieModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await this.movieModel.findByIdAndDelete(id);
  }
}