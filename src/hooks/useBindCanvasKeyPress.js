import { useKeyPress } from 'ahooks'
import {
    removeSelectedComponent,
    copySelectedComponent,
    pasteCopiedComponent,
    selectPrevComponent,
    selectNextComponent
} from '../store/componentsReducer'
import { useDispatch } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'


function isActiveElementValid() {
    const activeElem = document.activeElement
    if (activeElem == null) return true

    const tagName = activeElem.tagName
    const isInputLike = ['INPUT', 'TEXTAREA', 'SELECT'].includes(tagName)
    const isContentEditable = activeElem.getAttribute('contenteditable') === 'true'

    // 仅在未聚焦可输入区域时响应快捷键，避免和表单输入冲突
    return !isInputLike && !isContentEditable
}

function useBindCanvasKeyPress() {
    const dispatch = useDispatch()

    // 删除组件
    useKeyPress(['backspace', 'delete'], () => {
        if (!isActiveElementValid()) return
        dispatch(removeSelectedComponent())
    })

    // 复制组件
    useKeyPress(['ctrl.c', 'meta.c'], () => {
        if (!isActiveElementValid()) return
        dispatch(copySelectedComponent())
    })

    // 粘贴组件
    useKeyPress(['ctrl.v', 'meta.v'], () => {
        if (!isActiveElementValid()) return
        dispatch(pasteCopiedComponent())
    })
    // 选中上一个
    useKeyPress('uparrow', () => {
        if (!isActiveElementValid()) return
        dispatch(selectPrevComponent())
    })

    // 选中下一个
    useKeyPress('downarrow', () => {
        if (!isActiveElementValid()) return
        dispatch(selectNextComponent())
    })

    // 撤销
    useKeyPress(
        ['ctrl.z', 'meta.z'],
        () => {
            if (!isActiveElementValid()) return
            dispatch(UndoActionCreators.undo())
        },
        {
            exactMatch: true, // 严格匹配
        }
    )

    // 重做
    useKeyPress(['ctrl.shift.z', 'meta.shift.z'], () => {
        if (!isActiveElementValid()) return
        dispatch(UndoActionCreators.redo())
    })
}



export default useBindCanvasKeyPress