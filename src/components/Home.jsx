import { Link } from "react-router-dom";
import { ChevronRight } from "react-bootstrap-icons";

function Home() {
  return (
    <div className="home-wrapper">
      <h1 className="home-header">Welcome to the Metropolitan Museum of Art</h1>
      <Link reloadDocument className="home-link" to="/paintings">
        I just want to have a look around. {<ChevronRight />}
      </Link>
      {/* ^if i don't have reloadDocument sometimes the page loads without calling the API, it's easier to just have the page reload each time you want to look at the RNG page. this comes at the sacrifice of dark/lightmode resetting but it's easier for an end user to re-toggle the darkmode button than know to refresh the page... */}
      <Link className="home-link" to="/search">
        I know where I'm going. {<ChevronRight />}
      </Link>
    </div>
  );
}

export default Home;
