import React from "react";
import styles from './EditCanvas.module.scss'
import useGetComponentInfo from '../hooks/useGetComponentInfo'
import { getComponentConfByType } from "../component"
import { useDispatch } from "react-redux";
import useBindCanvasKeyPress from "../hooks/useBindCanvasKeyPress";
import { changeSelectedId, moveComponent } from "../store/componentsReducer";
import SortableContainer from "../component/DragSortable/SortableContainer";
import SortableItem from "../component/DragSortable/SortableItem";

const EditCanvas = () => {
    const dispacth = useDispatch()

    function getComponent(componentInfo) {
        const { type, props } = componentInfo

        const componentConf = getComponentConfByType(type)

        if (componentConf == null) return null

        const { Component } = componentConf
        return <Component {...props} />
    }

    const { componentList, selectedId } = useGetComponentInfo()
    // console.log(componentList) 

    function handleClick(event, id) {
        event.stopPropagation()
        dispacth(changeSelectedId(id))
    }

    // 绑定快捷键
    useBindCanvasKeyPress()

    // 拖拽组件
    const componentListWithId = componentList.map(c => {
        return { ...c, id: c.fe_id }
    })

    function handleDragEnd(oldIndex, newIndex) {
        dispacth(moveComponent({ oldIndex, newIndex }))
    }

    return (
        <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
            <div className={styles.canvas}>
                {componentList.filter(c => !c.isHidden).map(c => {
                    const { fe_id, isLocked } = c
                    return (
                        <SortableItem key={fe_id} id={fe_id}>
                            <div
                                key={fe_id}
                                className={`${styles['component-wrapper']} ${fe_id === selectedId ? styles.selected : ''} ${isLocked ? styles.locked : ''}`}
                                onClick={(e) => handleClick(e, fe_id)}
                            >
                                <div className={styles.component}>
                                    {getComponent(c)}
                                </div>
                            </div>
                        </SortableItem>
                    )
                })}
            </div>
        </SortableContainer>

    )
}

export default EditCanvas