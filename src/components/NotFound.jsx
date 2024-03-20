import { Link } from "react-router-dom";
import { ChevronRight } from "react-bootstrap-icons";

function NotFound() {
  return (
    <div className="home-wrapper error-ani">
      <h1 className="home-header error-ani">Oops! Page not found.</h1>
      <Link reloadDocument className="home-link error-ani" to="/index">
        Did you get lost? That's okay, the entrance is this way.
        {<ChevronRight />}
      </Link>
    </div>
  );
}

export default NotFound;
