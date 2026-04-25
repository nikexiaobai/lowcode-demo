import React from "react";
import useGetComponentInfo from "../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../component";
import { changeComponentProps } from "../store/componentsReducer";
import { useDispatch } from "react-redux";

const NoProp = () => {
    return <div style={{ textAlign: "center" }}>未选中组件</div>
}

const ComponentProp = () => {

    const dispacth = useDispatch()

    const { selectedComponent } = useGetComponentInfo()
    if (selectedComponent == null) return <NoProp />

    const { type, props, fe_id, isLocked } = selectedComponent

    const componentConf = getComponentConfByType(type)

    if (componentConf == null) return <NoProp />


    function changeProps(newProps) {
        if (newProps == null) return
        dispacth(changeComponentProps({ fe_id, newProps }))
    }

    const { PropComponent } = componentConf

    // 同类型组件切换时若不设 key，Form 会复用实例，字段仍显示上一选中项
    return <PropComponent key={fe_id} {...props} onChange={changeProps} disabled={isLocked} />
}

export default ComponentProp