import { useEffect } from "react";
import { getComponent } from "../api/getComponent";
import { useDispatch } from "react-redux";
import { copySelectedComponent, resetComponents } from "../store/componentsReducer";
import { resetPageInfo } from "../store/pageInfoReducer";

export function useLoadQuestionData() {
    const dispatch = useDispatch()

    useEffect(() => {
        async function loadData() {
            const res = await getComponent()
            const data1 = res.data
            const data2 = data1.data
            const data3 = data2.data
            const { title, componentList, desc, js, css } = data3
            let selectedId = ''
            if (componentList.length > 0) {
                selectedId = componentList[0].fe_id
            }
            dispatch(resetComponents({ componentList, selectedId, copiedComponent: null }))
            dispatch(resetPageInfo({ title, desc, js, css }))
            console.log(title, componentList)
        }
        loadData()
    }, [dispatch])
}
