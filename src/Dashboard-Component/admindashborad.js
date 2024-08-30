import React, { useState, useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Admindashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:7000/api/getall');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const onFinish = async (values) => {
        try {
            const response = await axios.post('http://localhost:7000/api/create', values);
            console.log('User created:', response.data);
            fetchUsers();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div>
            <div className='container-fluid h-screen' style={{ background: '#12bcb8' }}>
                <div className='row'>
                    <div className='col-sm-4'></div>
                    <div className='col-sm-4 p-3 border-sm shadow' style={{ background: '#ffdfbf', marginTop: '190px' }}>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            style={{ margin: '20px' }}
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="email"
                                rules={[{ required: true, message: 'Please input your Email!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your Password!' }]}
                            >
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>

                            <Row justify='flex' gap={12}>
                                <Col span={12}>
                                    <Checkbox>Remember me</Checkbox>
                                </Col>
                                <Col span={12}>
                                    <a className="login-form-forgot text-end" href="">Forgot password</a>
                                </Col>
                            </Row>
                            <Button type='primary' className='mt-3' block> <Link to="/admin">Login</Link></Button>
                            <span className='mt-2'>Or <a href="">register now!</a></span>
                        </Form>
                    </div>
                </div>
            </div>

            <div>
                <h2>User List</h2>
                <ul>
                    {users.map(user => (
                        <li key={user._id}>{user.email}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Admindashboard;
