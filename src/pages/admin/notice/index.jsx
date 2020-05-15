import React from 'react'
import { Button, Card, List, Typography } from "antd"
import "antd/dist/antd"
/* 连接redux */
import { connect } from 'react-redux'
function index(props) {
    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ];
    return (
        <Card title="通知中心" extra={<Button onClick={
            () => props.dispatch({ type: "AllREAD" })
        }>全部已读</Button>}>
            <List
                header={<div>Header</div>}
                footer={<div>Footer</div>}
                bordered
                dataSource={data}
                renderItem={item => (
                    <List.Item style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Typography.Text mark>[ITEM]</Typography.Text> {item}
                        <Button>已读</Button>
                    </List.Item>
                )}
            />
        </Card>
    )
}

export default connect(state => state)(index)
