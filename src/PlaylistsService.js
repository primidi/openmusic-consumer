const { Pool } = require('pg');
const { mapPlaylist, mapNestedSongs } = require('../utils');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistAndSongs(playlistId) {
    const query = {
      text: `SELECT playlists.id, playlists.name, songs.id as song_id, songs.title, songs.performer FROM playlists
      LEFT JOIN playlist_songs ON playlist_songs.playlist_id = playlists.id
      LEFT JOIN songs ON songs.id = playlist_songs.song_id
      WHERE playlists.id = $1`,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new Error('Playlist not found!');
    }

    const mappedResult = result.rows.map(mapPlaylist)[0];
    const songs = result.rows.map(mapNestedSongs);

    return {
      ...mappedResult,
      songs,
    };
  }
}

module.exports = PlaylistsService;
