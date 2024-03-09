import logo from "./logo.svg";

import PageHeader from "./components/PageHeader";
import CustomSearch from "./components/CustomSearch";
import React, { useState, useEffect } from "react";
import { Layout, message, Menu } from "antd";
import { LikeOutlined, FireOutlined } from "@ant-design/icons";
import {
  logout,
  getFavoriteItem,
  getTopGames,
  searchGameById,
  getRecommendations,
} from "./utils";
import Home from "./components/Home";
const { Header, Content, Sider } = Layout;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [topGames, setTopGames] = useState([]);
  const [resources, setResources] = useState({
    videos: [],
    streams: [],
    clips: [],
  });

  useEffect(() => {
    getTopGames()
      .then((data) => {
        setTopGames(data);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }, []);

  const signinOnClick = () => {
    setLoggedIn(true);
    getFavoriteItem().then((data) => {
      setFavoriteItems(data);
    });
  };

  const signoutOnClick = () => {
    logout()
      .then(() => {
        setLoggedIn(false);
        message.success("Successfully signed out!");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  const customSearchOnSuccess = (data) => {
    setResources(data);
  };

  const onGameSelect = ({ key }) => {
    if (key === "recommendation") {
      getRecommendations().then((data) => {
        setResources(data);
      });

      return;
    }

    searchGameById(key).then((data) => {
      setResources(data);
    });
  };
  const favoriteOnChange = () => {
    getFavoriteItem()
      .then((data) => {
        setFavoriteItems(data);
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const mapTopGamesToProps = (topGames) => [
    {
      label: "Recommend for you!",
      key: "recommendation",
      icon: <LikeOutlined />,
    },
    {
      label: "Popular Games",
      key: "popular_games",
      icon: <FireOutlined />,
      children: topGames.map((game) => ({
        label: game.name,
        key: game.id,
        icon: (
          <img
            alt="placeholder"
            src={game.box_art_url
              .replace("{height}", "40")
              .replace("{width}", "40")}
            style={{ borderRadius: "50%", marginRight: "20px" }}
          />
        ),
      })),
    },
  ];

  const logo =
    "https://createx.agency/wp-content/uploads/2022/04/mobile-game-publishers-1024x480-1.png";
  return (
    <Layout>
      <Header className="site-layout-header-background">
        <img src={logo} className="App-logo" alt="logo" />
      </Header>
      <PageHeader
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "pink",
          fontFamily: "Arial",
        }}
        loggedIn={loggedIn}
        signoutOnClick={signoutOnClick}
        signinOnSuccess={signinOnClick}
        favoriteItems={favoriteItems}
      />
      <Layout>
        <Sider width={300} className="site-layout-background">
          <CustomSearch onSuccess={customSearchOnSuccess} />

          <Menu
            mode="inline"
            onSelect={onGameSelect}
            style={{ marginTop: "10px" }}
            items={mapTopGamesToProps(topGames)}
          />
        </Sider>
        <Layout style={{ padding: "24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              height: 800,
              overflow: "auto",
            }}
          >
            <Home
              resources={resources}
              loggedIn={loggedIn}
              favoriteOnChange={favoriteOnChange}
              favoriteItems={favoriteItems}
            />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
