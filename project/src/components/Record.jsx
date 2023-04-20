import styles from "../styles";
// import React from 'react'
import 'antd/dist/reset.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'

class User {
  constructor(id_user, firstname, lastname, email, nr_tel, username, password) {
    this.id_user= id_user;
    this.firstname= firstname;
    this.lastname= lastname;
    this.email= email;
    this.nr_tel=nr_tel;
    this.username = username;
    this.password = password;
  }
}

const Record = () => {
  // const [loggedIn, setLoggedIn] = useState(false);
  const onFinish = values => {
    const {firstname, lastname, email, nr_tel, password} = values
    axios.post('http://localhost:3001/createUser', {firstname, lastname, email, nr_tel, password})
    .then(res => {
      console.log(res)
        if(res){
          alert('Inscription réussie')
      
        }
        else{
          alert('Inscription neréussie')
        }
    })
  }
  
  return (
    <section id="record" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
    <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
    <div style={{justifyContent:'center'}}>
      <Form
      name="normal_record"
      className="record-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="firstname"
        rules={[
          {
            required: true,
            message: 'Veuillez entrer votre nom',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="nom" />
      </Form.Item>

      <Form.Item
        name="lastname"
        rules={[
          {
            required: true,
            message: 'Veuillez entrer votre prenom',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="prenom" />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Veuillez entrer votre email',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email"/>
      </Form.Item>

      <Form.Item
        name="nr_tel"
        rules={[
          {
            required: true,
            message: 'Veuillez entrer votre phone number',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="phone number"/>
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
        Enregistré
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
    </div>
    </div>
    </section>
  )
}

export default Record
