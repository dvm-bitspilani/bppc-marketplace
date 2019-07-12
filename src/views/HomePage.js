import React from "react";
import {
  Container,
  Jumbotron,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";

import styles from "./../css-modules/homepage.module.css";
export default props => (
  <div>
    <Container>
      <Jumbotron className={styles.jumbotron}>
        <h3 className="display-4">BPPC-Marketplace</h3>
        <p className="lead">Powered by DVM</p>
        <hr className="my-2" />
        <p>
          This is for automating book purchasing and selling in BITS Pilani,
          Pilani Campus
        </p>
      </Jumbotron>
      <div>
        <Card className={styles.card}>
          <CardHeader tag="h3">How to Use ?</CardHeader>
          <CardBody>
            <CardTitle>
              <b>For New Batch :</b>
            </CardTitle>
            <CardText>
              Students of new batch are required to signup and then login
            </CardText>
            <CardTitle>
              <b>Students having BITS email :</b>
            </CardTitle>
            <CardText>
              Students having BITS-email id can directly login{" "}
            </CardText>
          </CardBody>
        </Card>
      </div>
    </Container>
  </div>
);
