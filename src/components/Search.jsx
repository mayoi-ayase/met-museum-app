/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import Joi from "joi";
import PaintingResult from "./PaintingResult";
import { useEffect, useState, setState } from "react";
import { useQuery } from "react-query";
import { joiResolver } from "@hookform/resolvers/joi";
import { Form, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { Link } from "react-router-dom";
import { ChevronRight } from "react-bootstrap-icons";

const Search = () => {
  const { isFetching, isLoading, isError } = useQuery(["result"], onSubmit, {
    refetchonWindowFocus: false,
    enabled: false,
  });

  const schema = Joi.object({
    search: Joi.string().min(1).max(50).required(),
  });

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(schema),
    defaultValues: {
      search: "Enter your search query here...",
    },
  });

  const [searchResult, setSearchResult] = useState([]);
  const [totalResults, setTotalResults] = useState("");
  const [resultList, setResultList] = useState([]);

  async function fetchList(slicedRes) {
    slicedRes.map(async (x) => {
      let paintingResult = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${x}`
      );
      let paintingRes = await paintingResult.json();
      if (paintingRes.objectID) {
        // ^ filtering out empty objects. THANKS MET MUSEUM
        setResultList((ps) => [
          // this adds to previous state rather than overwriting
          ...ps,
          {
            id: paintingRes.objectID,
            paintingImg: paintingRes.primaryImageSmall,
            paintingUrl: paintingRes.objectURL,
            paintingTitle: paintingRes.title,
            paintingArtist: paintingRes.artistDisplayName,
            paintingCredit: paintingRes.creditLine,
          },
        ]);
      }
    });
  }

  async function onSubmit(data) {
    setResultList([]); // clearing results on re-run
    let result = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&q=${data.search}`
    );
    let res = await result.json();
    if (res.objectIDs == 0 || res.objectIDs == null) {
      setTotalResults("No results.");
      // i have to put this check up here, because if i put it after slicedRes or setSearchResult it throws an error because it's trying to slice/set an empty array. figured this one out during user testing thanks portfolio doc.
    }
    let slicedRes = [...res.objectIDs.slice(0, 50)];
    setSearchResult(slicedRes);

    if (res.total >= 50) {
      setTotalResults("Showing first 50 results."); // I only want 50 results to show because I don't really want to tank the page if someone sends a search for something with say, 10k results. I use slice later on to limit the results in the map.
      await fetchList(slicedRes);
    } else {
      setTotalResults(`Showing ${res.total} results.`); // i've done these separate from the first res.total because if there's more than 0 results I want to display them, not just end the if statement.
      // ! This is not entirely accurate because later in the code I have it filter out empty objects when displaying, but res.total accounts for those empty objects. So sometimes res.total will display a higher number than the actual number of objects that's displayed but um... I don't think it's too important of a detail... and this API is quite unpleasant to work with so I'll have to go with the "accurate-ish" number displayed by res.total.
      await fetchList(slicedRes);
    }
  }

  if (isLoading) {
    return <div>Loading</div>;
  } else if (isFetching) {
    return <div>Loading</div>;
  } else if (isError) {
    return <div>{isError.message}</div>;
  }

  return (
    <div className="search-wrapper">
      <Form
        className="search-form"
        noValidate="noValidate"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="d-flex flex-column flex-md-row py-md-2 search-flex">
          <Form.Label for="search" className="invisible"></Form.Label>
          <Controller
            name="search"
            control={control}
            render={({ field }) => <Form.Control {...field} />}
          />
          <button className="button" type="submit" data-testid="search-button">
            Search
          </button>
        </div>
      </Form>
      <div className="search-nav-links">
        <Link reloadDocument className="link-hover me-2" to="/paintings">
          I'm out of ideas. Let's go to a random room. {<ChevronRight />}
        </Link>
        <Link className="link-hover ms-2" to="/">
          Time to go home. {<ChevronRight />}
        </Link>
      </div>
      <div className="painting-results">{totalResults}</div>
      {resultList.map((x, index) => {
        return (
          <PaintingResult
            key={resultList[index].id}
            paintingimage={resultList[index].paintingImg}
            paintingUrl={resultList[index].paintingUrl}
            paintingTitle={resultList[index].paintingTitle}
            paintingArtist={resultList[index].paintingArtist}
            paintingCredit={resultList[index].paintingCredit}
          />
        );
      })}
    </div>
  );
};

export default Search;
