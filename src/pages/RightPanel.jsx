import React from "react";
import { Tabs } from "antd";
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import ComponentProp from "./ComponentProp";
import PageSetting from "./PageSetting";
import { useState, useEffect } from "react";
import useGetComponentInfo from "../hooks/useGetComponentInfo";

const RightPanel = () => {

    const [activeKey, setActiveKey] = useState('prop')
    const { selectedId } = useGetComponentInfo()

    useEffect(() => {
        if (selectedId) setActiveKey('prop')
        else setActiveKey('setting')
    }, [selectedId])

    const tabsItems = [
        {
            key: 'prop',
            label: (
                <span>
                    <FileTextOutlined />属性
                </span>
            ),
            children: <ComponentProp />
        },
        {
            key: 'setting',
            label: (
                <span>
                    <SettingOutlined />设置
                </span>
            ),
            children: <PageSetting />
        }
    ]

    return (
        <Tabs items={tabsItems} activeKey={activeKey}></Tabs>
    )
}
export default RightPanel