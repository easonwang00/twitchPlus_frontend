import { searchGameByName } from "../utils";
import { message, Button, Modal, Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import React, { useState } from "react";
function CustomSearch({ onSuccess }) {
  const [displayModal, setDisplayModal] = useState(false);
  const handleCancel = () => {
    setDisplayModal(false);
  };
  const searchOnClick = () => {
    setDisplayModal(true);
  };
  const onSubmit = (data) => {
    searchGameByName(data.game_name)
      .then((data) => {
        setDisplayModal(false);
        onSuccess(data);
      })
      .catch((error) => {
        message.error(error.message);
      });
  };
  return (
    <>
      <Button
        shape="round"
        icon={<SearchOutlined />}
        onClick={searchOnClick}
        style={{ marginRight: "20px", marginTop: "20px" }}
      >
        Custom Search
      </Button>
      <Modal
        title="Search"
        visible={displayModal}
        onCancel={handleCancel}
        footer={null}
      >
        <Form name="custom_search" onFinished={onSubmit}>
          <Form.Item
            name="game_name"
            rules={[
              { required: true, message: "Please enter your game name!" },
            ]}
          >
            <Input prefix={<SearchOutlined />} placeholder="Game name" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CustomSearch;
