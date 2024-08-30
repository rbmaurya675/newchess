import React from 'react'
import Dashboardmenu from './dashboardmenu'
import Dashnavbar from './dashnavbar'
import { Table, Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const dataSource = [
    {
        key: '1',
        game: 'Fortnite',
        income: '$1200',
        increase: true,
    },
    {
        key: '2',
        game: 'Apex Legends',
        income: '$800',
        increase: false,
    },
    {
        key: '3',
        game: 'Call of Duty',
        income: '$950',
        increase: true,
    },
];

const columns = [
    {
        title: 'Game',
        dataIndex: 'game',
        key: 'game',
    },
    {
        title: 'Income',
        dataIndex: 'income',
        key: 'income',
    },
    {
        title: 'Trend',
        dataIndex: 'increase',
        key: 'increase',
        render: increase => (
            increase ? <ArrowUpOutlined style={{ color: 'green' }} /> : <ArrowDownOutlined style={{ color: 'red' }} />
        ),
    },
];

const Dashincome = () => {
    return (
        <div className='container-fluid'>
            <div className='row'>

                <div className='col-sm-2'> <Dashboardmenu /></div>
                <div className='col-sm-10'>

                    <Dashnavbar />
                    {/* <h1>Dashincome</h1> */}
                    <div className=" flex items-center justify-center">
                        <div className="w-full max-w-4xl p-4">
                            <Card className="mb-4 shadow-md" title="Gaming Income Statistics " >
                                <div className="flex justify-around">
                                    <Statistic
                                        title="Total Income"
                                        value={2950}
                                        precision={2}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix="$"
                                        suffix={<ArrowUpOutlined />}
                                    />
                                    <Statistic
                                        title="Average Income"
                                        value={983.33}
                                        precision={2}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix="$"
                                        suffix={<ArrowUpOutlined />}
                                    />
                                </div>
                            </Card>
                            <Card title="Income by Game" className='shadow-md' >
                                <Table dataSource={dataSource} columns={columns} pagination={false} />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Dashincome