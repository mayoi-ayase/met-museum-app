const Painting = ({
  paintingImg,
  paintingUrl,
  paintingTitle,
  artist,
  credit,
}) => {
  async function fetchPaintings() {}

  return (
    <div>
      <img className="painting-image" src={paintingImg}></img>
      <div className="painting-rng-info">
        <p className="painting-title">{paintingTitle}</p>
        <p className="painting-flavor-text artist-rng"> {artist}</p>
        <p className="painting-flavor-text">{credit}</p>
        <a className="painting-flavor-text link-hover" href={paintingUrl}>
          See on Met Museum
        </a>
      </div>
    </div>
  );
};

export default Painting;
