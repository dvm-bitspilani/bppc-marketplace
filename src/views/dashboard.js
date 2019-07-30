import React, { Component } from "react";
import { navigate } from "@reach/router";
import { Container, Jumbotron, ListGroup, ListGroupItem } from "reactstrap";

export class dashboard extends Component {
  componentDidMount() {
    if (localStorage.getItem("token") === null) {
      window.alert("Unauthenticated user. Please login first!");
      setTimeout(() => navigate("/login"), 100);
    }
  }

  render() {
    return (
      <div>
        <Container>
          <Jumbotron>
            <h3 className="display-3">General Instructions</h3>
            <ListGroup style={{ marginTop: "5vh", marginBottom: "5vh" }} active>
              <ListGroupItem active action>
                Selling Books
              </ListGroupItem>
              <ListGroupItem>
                Click on the sell button on the top navigation bar.
              </ListGroupItem>
              <ListGroupItem>Select the books which you have.</ListGroupItem>
              <ListGroupItem>
                Upload the pictures of the books/notes or anything extra that
                you are providing to increase your selling chances.(Increases
                your credibility)
              </ListGroupItem>
              <ListGroupItem>
                Describe that extra material (if any) that you are providing.
                (You can use upto 5, one word tags too to shortly grab attention
                in a jist.)
              </ListGroupItem>
            </ListGroup>
            <hr className="my-2" />
            <ListGroup style={{ marginTop: "5vh", marginBottom: "5vh" }} active>
              <ListGroupItem active action>
                Buying Books
              </ListGroupItem>
              <ListGroupItem>
                Click on the Buy button on the top navigation bar.
              </ListGroupItem>
              <ListGroupItem>
                The page lists all the sellers that are available with their
                expected price and all the details of books.
              </ListGroupItem>
              <ListGroupItem>
                You can click on the details to see the conditions of the books
                of that particular seller, and any other extra material
                provided.
              </ListGroupItem>
            </ListGroup>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default dashboard;
