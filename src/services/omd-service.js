import axios from 'axios';

const OMDB_API_KEY = process.env.OMDB_API_KEY;
const BASE_URL = 'http://www.omdbapi.com/';

export async function getMovieDetailsFromOMDb(title) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        t: title,
        apikey: OMDB_API_KEY,
        plot: 'short',
      },
    });

    if (response.data.Response === 'False') return null;

    const { Poster, Plot, imdbRating } = response.data;

    const sanitize = (value) => (value && value !== 'N/A' ? value : null);

    return {
      poster: sanitize(Poster),
      plot: sanitize(Plot),
      imdbRating: sanitize(imdbRating),
    };
  } catch (error) {
    console.error('[OMDb ERROR]', error.message);
    return null;
  }
}
