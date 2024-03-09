import { Layout, Row, Col, Button } from "antd";
import Favorite from "./Favorite";
import Login from "./Login";
import Register from "./Register";
import React from "react";

const { Header } = Layout;
function PageHeader({
  loggedIn,
  signoutOnClick,
  signinOnSuccess,
  favoriteItems,
}) {
  return (
    <Header className="site-layout-header-background">
      <Row justify="space-between">
        <Col>{loggedIn && <Favorite favoriteItems={favoriteItems} />}</Col>
        <Col>
          {loggedIn && (
            <Button shape="round" onClick={signoutOnClick}>
              {" "}
              LogOut
            </Button>
          )}
          {!loggedIn && (
            <>
              <Login onSuccess={signinOnSuccess} />
              <Register />
            </>
          )}
        </Col>
      </Row>
    </Header>
  );
}

export default PageHeader;
