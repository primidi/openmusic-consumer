const mapPlaylist = ({
  id,
  name,
}) => ({
  id,
  name,
});

const mapNestedSongs = ({
  song_id,
  title,
  performer,
}) => ({
  id: song_id,
  title,
  performer,
});

module.exports = {
  mapPlaylist,
  mapNestedSongs,
};
