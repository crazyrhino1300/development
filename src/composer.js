import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Biography from "./bio.js"
export default function composerComp(prop, addYear, addFav, appendComposer) {
    return (
        <div className="cardholder">
            <Card style = {{height: "20rem", width: "18rem"}}>
                <Card.Body >
                    <div className="cardbod" >
                        {/* <img className="profile-pic" src={prop.photo} /> */}
                        <Biography prop={prop}/>
                    </div>

                </Card.Body>
                <Card.Header className="cardname" style = {{height: "3rem"}}>
                    <h3>{prop.name}</h3>
                    <Button className = "favorite-button" style = {{background: "pink", outline: "pink solid 1px", borderColor: "pink", hoverColor: "red"}} 
                            variant="info" size="sm" active
                            onClick={() => { addYear(prop); addFav(); appendComposer(prop) }}> 
                        <p> &#9829; </p>
                    </Button>
                </Card.Header>
            </Card>
        </div>
    );
}