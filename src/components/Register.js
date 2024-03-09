import { Button, Form, Input, Modal, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { register } from "../utils";

function Register() {
  const [displayModal, setDisplayModal] = useState(false);
  const handleCancell = () => {
    setDisplayModal(false);
  };
  const signupOnClick = () => {
    setDisplayModal(true);
  };
  const onFinished = (data) => {
    register(data)
      .then(() => {
        setDisplayModal(false);
        message.success("Successfully signed up!");
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  return (
    <>
      <Button shape="round" type="primary" onClick={signupOnClick}>
        Register
      </Button>
      <Modal
        title="Register"
        visible={displayModal}
        onCancel={handleCancell}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          name="normal_register"
          initialValues={{ remember: true }}
          onFinish={onFinished}
          preserve={false}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="firstname"
            rules={[
              { required: true, message: "Please input your firstname!" },
            ]}
          >
            <Input placeholder="Firstname" />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[{ required: true, message: "Please input your lastname!" }]}
          >
            <Input placeholder="Lastname" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Register;
