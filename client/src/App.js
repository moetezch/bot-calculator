import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Input, Button, Layout, Space, Form } from 'antd';
const { Header, Content } = Layout;

const socket = io('http://localhost:4777');
socket.on('connect', () => {
    console.log(`Connected to the server}`);
});

const App = () => {
    const [command, setCommand] = useState('');
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        socket.on('result', (result) => {
            setResult(result);
        });
        socket.on('history', (history) => {
            setHistory(history);
        });

        return () => {
            socket.off('result');
            socket.off('history');
        };
    }, []);

    const handleCommandChange = (event) => {
        setCommand(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (command.toLowerCase() === 'history') {
            socket.emit('history');
        } else {
            socket.emit('calculate', command);
        }
        setCommand('');
        setResult('');
        setHistory([]);
    };

    const formItemLayout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 14,
        },
    };

    const buttonItemLayout = {
        wrapperCol: {
            span: 14,
            offset: 4,
        },
    };

    return (
        <Layout>
            <Header>
                <h1 style={{ color: 'white' }}>Calculator App</h1>
            </Header>
            <Content
                style={{
                    padding: '24px',
                    minHeight: 'calc(100vh - 134px)',
                }}
            >
                <Space
                    direction="vertical"
                    size="small"
                    style={{
                        display: 'flex',
                    }}
                >
                    <Form
                        {...formItemLayout}
                        layout="horizontal"
                        form={form}
                        initialValues={{
                            layout: 'horizontal',
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                    >
                        <Form.Item>
                            <Input
                                type="text"
                                value={command}
                                onChange={handleCommandChange}
                                placeholder="Enter command (e.g., 1 + 1) or history to get the last 10 commands"
                            />
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary" onClick={handleSubmit}>
                                Calculate
                            </Button>
                        </Form.Item>
                    </Form>
                    {result && <p>Result: {result}</p>}
                    {history.length > 0 && (
                        <>
                            <h2>History</h2>
                            <ul>
                                {history.map((item, index) => (
                                    <li key={index}>
                                        {item.command} = {item.result}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </Space>
            </Content>
        </Layout>
    );
};

export default App;
