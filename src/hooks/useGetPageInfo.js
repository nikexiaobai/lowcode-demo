import { useSelector } from "react-redux";

function useGetPageInfo() {
    const pageInfo = useSelector(state => state.pageInfo)
    return pageInfo
}

export default useGetPageInfo