import Painting from "./Painting";
import { setState, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { ChevronRight } from "react-bootstrap-icons";
import Spinner from "react-bootstrap/Spinner";

// ! This works I promise the API is just kind of busted so it might take a few reloads.

const Paintings = () => {
  const { isLoading, isError, data } = useQuery(["painting"], fetchNumber, {
    refetchOnWindowFocus: false,
  });
  const paintingNumber = [];
  const [paintingList, setPaintingList] = useState([]);

  function rng(max) {
    return Math.ceil(Math.random() * max);
  }

  function getNumber(res) {
    var totalNumber = res.total;
    var randomNumber = rng(totalNumber);
    var paintingId = res.objectIDs[randomNumber];
    return paintingId;
  }

  async function fetchNumber() {
    var response = await fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&q=%22%22"
    );
    var res = await response.json();

    const paintingNumber = [getNumber(res), getNumber(res), getNumber(res)]; // this is IDs only

    let paintingOne = await renderPaintings(paintingNumber[0]);
    let paintingTwo = await renderPaintings(paintingNumber[1]);
    let paintingThree = await renderPaintings(paintingNumber[2]);

    while (
      paintingOne.primaryImage == "" ||
      paintingTwo.primaryImage == "" ||
      paintingThree.primaryImage == "" ||
      paintingOne.objectID == null ||
      paintingTwo.objectID == null ||
      paintingThree.objectID == null
    ) {
      //this while loop rerolls when there's no image in fetched URL - the query in the first API call should have filtered out links with no images but I suppose it's kind of broken or something... i also tried to make it so it rerolls if there's a 404 but it seems everytime there is one the app just kills itself, I can handle that with an error message (IT'S SO JANK. THANKS MET MUSEUM.)
      if (
        paintingOne.primaryImage == "" ||
        paintingTwo.primaryImage == "" ||
        paintingThree.primaryImage == "" ||
        paintingOne.objectID == null ||
        paintingTwo.objectID == null ||
        paintingThree.objectID == null
      ) {
        console.log("NO IMAGE");
        paintingOne = await renderPaintings(paintingNumber[0]);
        paintingTwo = await renderPaintings(paintingNumber[1]);
        paintingThree = await renderPaintings(paintingNumber[2]);
      }
      setTimeout(loop, 0);
    }
    setPaintingList([paintingOne, paintingTwo, paintingThree]);
  }

  async function renderPaintings(id) {
    var pres = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
    );
    var presult = await pres.json();
    return presult;
  }

  if (isLoading) {
    return (
      <div className="painting-wrapper">{<Spinner animation="border" />}</div>
    );
  } else if (isError) {
    return (
      <div className="painting-wrapper flex-column">
        <div>
          <h3>
            I'm sorry! I broke. It's hard work dragging all these paintings out
            here!
          </h3>
          <button
            className="button text-large my-2 mx-auto d-block"
            onClick={() => window.location.reload()}
          >
            Want to try again?
          </button>
          <Link to="/search">
            <div className="error-link link-hover">
              ...Or if it's giving you this much of a headache, you can just
              pick out a painting for yourself... {<ChevronRight />}
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="painting-wrapper">
        {paintingList.map((x, index) => {
          return (
            <>
              <div className="painting-rng-card">
                <Painting
                  key={index}
                  paintingNumber={paintingList[index].objectID}
                  paintingImg={paintingList[index].primaryImageSmall}
                  paintingTitle={paintingList[index].title}
                  paintingUrl={paintingList[index].objectURL}
                  artist={paintingList[index].artistDisplayName}
                  credit={paintingList[index].creditLine}
                />
              </div>
            </>
          );
        })}
      </div>
      <div className="page-nav-link">
        <Link className="link-hover" to="/search">
          I have something specific I want to look at. {<ChevronRight />}
        </Link>
        <Link className="link-hover" to="/index">
          Time to go home. {<ChevronRight />}
        </Link>
      </div>
    </div>
  );
};

export default Paintings;
