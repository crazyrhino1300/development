
import './App.css';
import composers from "./assets/composers.json";
import composerComp from "./composer.js"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';



function App() {
  const [total, totalYear] = useState(0);
  const [totalno, favtotal] = useState(0);
  const [favorites, favoriteComposers] = useState([]);
  const [gallery, setGal] = useState(composers);


  // compiles all of the years togethetr.
  function addYear(prop) {
    var bday = prop.birth;
    var bdayArray = bday.split('-');
    return totalYear(total + 2022 - parseInt(bdayArray[0]));
  }
  // adds 1 to the total number of favorited composers.
  function addFav() {
    return favtotal(totalno + 1);
  }

  /*
  input: num: average years since birth of the favorited composers.
  output: the era that it corresponds to
  */
  function determineEra(num) {
    if (num >= 272) {
      return "Baroque Era";
    } else if (num < 272 && num >= 202) {
      return "Classical Era";
    } else if (num < 202 && num >= 122) {
      return "Romantic Era";
    } else {
      return "Modern Era";
    }
  }
  // ===========================================================================
  // --------------------------- Sorting functions -----------------------------
  function compare(prop1, prop2) {
    let name1 = prop1.name;
    let name2 = prop2.name;

    if (name1 < name2) { return -1; }
    if (name2 > name1) { return 1; }
    return 0;
    //code taken from w3 schools.
  }

  function sortAlpha() {
    const composerArr = [...gallery]
    setGal(composerArr.sort(compare))
  }
  // ===========================================================================
  // ------------------------- Filtering functions -----------------------------
  function baroqueP(prop) {
    return prop.epoch == "Baroque"
  }
  function classicalP(prop) {
    return prop.epoch == "Classical"
  }
  function romanticP(prop) {
    return prop.epoch == "Early Romantic" || prop.epoch == "Romantic" || prop.epoch == "Late Romantic"
  }
  function modernP(prop) {
    return prop.epoch == "21st Century"
  }

  function filterBaroque() {
    const filtMe = [...gallery]
    setGal(filtMe.filter(baroqueP))
  }
  function filterClassical() {
    const filtMe = [...gallery]
    setGal(filtMe.filter(classicalP))
  }
  function filterRomantic() {
    const filtMe = [...gallery]
    setGal(filtMe.filter(romanticP))
  }
  function filterModern() {
    const filtMe = [...gallery]
    setGal(filtMe.filter(modernP))
  }

  // ===========================================================================
  // ----------------------------- Reset functions -----------------------------
  function reset() {
    setGal(composers);
  }

  // ===========================================================================
  // --------------------------- aggregator displa -----------------------------
  /* on click, adds the favorited composer to the list of composers. */
  function appendComposer(prop) {
    favoriteComposers(favorites => [prop.name, " ", ...favorites]);
  }
  // ===========================================================================
  return (
    <div id="root">
      <header>
        <Navbar className="navbar">

          <Navbar.Brand href="home"><h1>&#127925; composers 101 &#127925;</h1></Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          </Navbar.Collapse>

        </Navbar>

      </header>
      <Container>

        <Row >
          <Col md="12" lg="4">
            <div className="left">
              <h2>Which age of Classical music do you like best?</h2>
              <h2> Average Composer Age:  {total / totalno}</h2>
              <li>Baroque Era: 422 - 272 years ago</li>
              <li>Classical Era: 272 - 202 years ago</li>
              <li>Romantic Era: 202 - 122 years ago</li>
              <li>Modern Era: 122 - 0 years ago</li>
              <h2>Your favorite age seems to be the {determineEra(total / totalno)}</h2>
              <h2>Favorite composers: {favorites}</h2>
            </div>

          </Col>


          <Col md="12" lg="8">
            <div className="col2Head">
              <h2 style = {{marginBottom: "0px"}}> All of the composers listed: </h2>
              <div className="buttons">
                <Button className="button1" onClick={() => sortAlpha()}>Sort Alphabetically</Button>
                <Dropdown className = "button2" as={ButtonGroup}>
                  <Button variant="success">Epoch Filter</Button>
                  <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => filterBaroque()} >Baroque</Dropdown.Item>
                    <Dropdown.Item onClick={() => filterClassical()}>Classical</Dropdown.Item>
                    <Dropdown.Item onClick={() => filterRomantic()}>Romantic</Dropdown.Item>
                    <Dropdown.Item onClick={() => filterModern()}>Modern</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => reset()}>Reset all filters</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>




            <div className="gallery">
              {gallery.map((item) => (composerComp(item, addYear, addFav, appendComposer)))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
