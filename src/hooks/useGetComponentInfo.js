import { useSelector } from "react-redux";

function useGetComponentInfo() {
    const components = useSelector(state => state.components.present)

    const { componentList = [], selectedId = '', copiedComponent } = components


    const selectedComponent = componentList.find(c => c.fe_id === selectedId)

    return {
        componentList,
        selectedId,
        selectedComponent,
        copiedComponent
    }
}

export default useGetComponentInfo