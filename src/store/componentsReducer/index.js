import { createSlice } from '@reduxjs/toolkit'
import { getNextSelectedId, insertNewComponent } from './utils'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'
import { arrayMove } from '@dnd-kit/sortable'



const INIT_STATE = {
    selectedId: '',
    componentList: [],
    copiedComponent: null
}

export const componentsSlice = createSlice({
    name: 'components',
    initialState: INIT_STATE,
    reducers: {
        // 重置所有组件
        resetComponents: (state, action) => {
            return action.payload
        },
        // 修改selected（createSlice 已内置 Immer，无需再包一层 produce）
        changeSelectedId: (state, action) => {
            state.selectedId = action.payload
        },
        // 添加新组件
        addComponent: (draft, action) => {
            const newComponent = action.payload
            const { selectedId, componentList } = draft
            const index = componentList.findIndex(c => c.fe_id == selectedId)
            if (index < 0) {
                draft.componentList.push(newComponent)
            } else {
                draft.componentList.splice(index + 1, 0, newComponent)
            }
        },
        // 修改组件的信息
        changeComponentProps: (draft, action) => {
            const { fe_id, newProps } = action.payload

            const curCom = draft.componentList.find(c => c.fe_id == fe_id)

            if (curCom) {
                curCom.props = {
                    ...curCom.props,
                    ...newProps,
                }
            }
        },
        // 删除选中的组件
        removeSelectedComponent: (draft) => {
            const { componentList = [], selectedId } = draft

            const index = componentList.findIndex(c => c.fe_id === selectedId)
            if (index < 0) return

            // 重新计算selectedId
            const newSelectedId = getNextSelectedId(selectedId, componentList)
            draft.selectedId = newSelectedId

            componentList.splice(index, 1)

        },
        // 隐藏选中的组件
        changeComponentHidden: (draft, action) => {
            const { componentList = [] } = draft
            const { fe_id, isHidden } = action.payload

            let newSelectedId = ''
            if (isHidden) {
                // 要隐藏
                newSelectedId = getNextSelectedId(fe_id, componentList)
            } else {
                // 要显示
                newSelectedId = fe_id
            }
            draft.selectedId = newSelectedId


            const curCom = componentList.find(c => c.fe_id == fe_id)
            if (curCom) {
                curCom.isHidden = isHidden
            }


        },
        // 锁定当前选中组件
        toggleComponentLocked: (draft, action) => {
            const { fe_id } = action.payload

            const curComp = draft.componentList.find(c => c.fe_id === fe_id)
            if (curComp) {
                curComp.isLocked = !curComp.isLocked
            }
        },
        // 拷贝选中组件
        copySelectedComponent: (draft) => {
            const { selectedId, componentList = [] } = draft
            const selectedComponent = componentList.find(c => c.fe_id === selectedId)
            if (selectedComponent == null) return
            draft.copiedComponent = cloneDeep(selectedComponent) // 深拷贝
        },
        // 粘贴组件
        pasteCopiedComponent: (draft) => {
            const { copiedComponent } = draft
            if (copiedComponent == null) return

            // 要把 fe_id 给修改了，重要！！
            copiedComponent.fe_id = nanoid()

            // 插入 copiedComponent
            insertNewComponent(draft, copiedComponent)
        },
        selectPrevComponent: (draft) => {
            const { selectedId, componentList } = draft
            const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

            if (selectedIndex < 0) return // 未选中组件
            if (selectedIndex <= 0) return // 已经选中了第一个，无法在向上选中

            draft.selectedId = componentList[selectedIndex - 1].fe_id
        },

        // 选中下一个
        selectNextComponent: (draft) => {
            const { selectedId, componentList } = draft
            const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)

            if (selectedIndex < 0) return // 未选中组件
            if (selectedIndex + 1 === componentList.length) return // 已经选中了最后一个，无法再向下选中

            draft.selectedId = componentList[selectedIndex + 1].fe_id
        },
        // 修改组件标题
        changeComponentTitle:
            (draft, action) => {
                const { title, fe_id } = action.payload
                const curComp = draft.componentList.find(c => c.fe_id === fe_id)
                if (curComp) curComp.title = title
            },
        // 移动组件位置
        moveComponent: (draft, action) => {
            const { componentList: curComponentList } = draft
            const { oldIndex, newIndex } = action.payload

            draft.componentList = arrayMove(curComponentList, oldIndex, newIndex)
        },

    }
})

export const { resetComponents, changeSelectedId, addComponent, changeComponentProps, removeSelectedComponent, changeComponentHidden
    , toggleComponentLocked, copySelectedComponent, pasteCopiedComponent, selectPrevComponent, selectNextComponent, changeComponentTitle, moveComponent
} = componentsSlice.actions

export default componentsSlice.reducer