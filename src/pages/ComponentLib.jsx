import React from "react";
import { componentConfGroup } from "../component";
import { Typography } from "antd";
import styles from './ComponentLib.module.scss'
import { addComponent } from "../store/componentsReducer";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";

const { Title } = Typography


const Lib = () => {

    const dispacth = useDispatch()

    function getComponent(c) {


        const { title, type, Component, defaultProps } = c


        function handleClick() {
            dispacth(addComponent({
                fe_id: nanoid(),
                title,
                type,
                props: defaultProps
            }
            ))
        }

        return <div key={type} className={styles.wrapper} onClick={handleClick}>
            <div className={styles.component}>
                <Component />
            </div>

        </div>
    }

    return (
        <>
            {componentConfGroup.map((group, index) => {
                const { groupName, components } = group
                return <div key={index} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '-30px' }}>
                    <Title level={3}>{groupName}</Title>
                    <div>
                        {components.map(c => getComponent(c))}
                    </div>
                </div>
            })}
        </>
    )
}

export default Lib