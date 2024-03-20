/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const PaintingResult = ({
  paintingimage,
  paintingUrl,
  paintingArtist,
  paintingCredit,
  paintingTitle,
}) => {
  return (
    <>
      <div className="paintingcard d-flex">
        <img className="paintingimg" src={paintingimage}></img>
        <div className="paintinginfo">
          <span className="painting-title text-large d-block">
            {paintingTitle}
          </span>
          <p className="painting-flavor-text search-artist transp">
            <em>{paintingArtist}</em>
          </p>
          <p className="painting-flavor-text transp">{paintingCredit}</p>
          <a className="link-hover" href={paintingUrl}>
            See on Met Museum
          </a>
        </div>
      </div>
    </>
  );
};

export default PaintingResult;
