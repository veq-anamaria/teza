import styles from "../styles";
// import React from 'react'
import 'antd/dist/reset.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

const Login = () => {
  // const [loggedIn, setLoggedIn] = useState(false);
  const onFinish = values => {
    const {username, password} = values
    axios.post('http://localhost:3001/validatePassword', {username , password})
      .then(res => {
        if(res.data.validation){
          alert('Bienvennue '+res.data.lastname) 
          console.log(res.data);   
        }
        else{
          alert('Utilisateur, password est incorrect')
        }
      })
  }
  
  return (
    <section id="login" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
    <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
    <div style={{justifyContent:'center'}}>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Veuillez entrer votre nom => utilisateur',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Veuillez saisir votre mot de passe !',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox color="white" >Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="" color="white" >
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
    </div>
    </div>
    </section>
  )
}

export default Login
