import { configureStore } from "@reduxjs/toolkit";
import componentsReducer from './componentsReducer'
import pageInfoReducer from './pageInfoReducer'
import undoable, { excludeAction, StateWithHistory } from 'redux-undo'


export const store = configureStore({
    reducer: {
        // 组件列表
        // 没有undo
        // components: componentsReducer,

        // 增加了 undo
        components: undoable(componentsReducer, {
            limit: 20, // 限制 undo 20 步
            filter: excludeAction([
                'components/resetComponents',
                'components/changeSelectedId',
                'components/selectPrevComponent',
                'components/selectNextComponent',
            ]),
        }),
        // 问卷信息
        pageInfo: pageInfoReducer,
    },
});