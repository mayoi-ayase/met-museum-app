/* eslint-disable no-unused-vars */
import { setState, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Moon, Sun } from "react-bootstrap-icons";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [icons, setIcon] = useState(<Moon size="30" />);

  function darkModeToggle() {
    document.body.classList.toggle("dark-mode");
    if (darkMode === false) {
      setDarkMode(true);
      setIcon(<Sun size="30" color="white" />);
    } else {
      setDarkMode(false);
      setIcon(<Moon size="30" />);
    }
  }
  const DarkMode = () => {
    return (
      <div>
        <button id="dark-mode-button" onClick={darkModeToggle}>
          {icons}
        </button>
      </div>
    );
  };

  return (
    <>
      <Navbar>
        <Nav data-testid="navigation" className="me-auto text-center">
          <div
            style={{ width: "100vw" }}
            className="d-flex align-items-end justify-content-end"
          >
            <span>
              <DarkMode />
            </span>
          </div>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
