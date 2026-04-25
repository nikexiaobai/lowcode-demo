import React from "react";
import styles from './EditHeader.module.scss'
import { Button, Typography, Space } from "antd";
import { LeftOutlined } from "@ant-design/icons"
import EditToolbar from './EditToolbar'
import useGetComponentInfo from "../hooks/useGetComponentInfo";
import useGetPageInfo from "../hooks/useGetPageInfo";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Input } from "antd";
import { changePageTitle } from '../store/pageInfoReducer'
import { useDispatch } from 'react-redux'

const { Title } = Typography

const TitleElem = () => {
    const dispatch = useDispatch()
    const { title } = useGetPageInfo()
    const [editState, SetEditState] = useState(false)


    function handleChange(event) {
        const newTitle = event.target.value.trim()
        if (!newTitle) return
        dispatch(changePageTitle(newTitle))
    }

    if (editState) {
        return (
            <Input
                value={title}
                onChange={handleChange}
                onPressEnter={() => SetEditState(false)}
                onBlur={() => SetEditState(false)}
            />
        )
    }

    return (
        <Space>
            <Title>{title}</Title>
            <Button icon={<EditOutlined />} type="text" onClick={() => SetEditState(true)} />
        </Space>
    )
}

const SaveButton = () => {
    return (
        <Button>保存</Button>
    )
}

const EditHeader = () => {
    return (
        <div className={styles['header-wrapper']}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Space>
                        <Button type="link" icon={<LeftOutlined />}>
                            返回
                        </Button>
                        <TitleElem />
                    </Space>

                </div>
                <div className={styles.main}>
                    <EditToolbar />
                </div>
                <div className={styles.right}>
                    <Space>
                        <SaveButton />
                        <Button type="primary">返回</Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default EditHeader