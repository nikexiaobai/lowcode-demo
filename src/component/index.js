import QuestionInputConf from './questionInput/index'
import QuestionTitleConf from './QuestionTitle'
import QuestionParagraphConf from './QuestionParagraph'
import QuestionInfoConf from './QuestionInfo'
import QuestionTextareaConf from './QuestionTextarea'
import QuestionRadioConf from './QuestionRadio'
import QuestionCheckboxConf from './QuestionCheckbox'

// 全部的组件配置的列表
const componentConfList = [
    QuestionInputConf,
    QuestionTitleConf,
    QuestionParagraphConf,
    QuestionInfoConf,
    QuestionTextareaConf,
    QuestionRadioConf,
    QuestionCheckboxConf,
]

// 组件分组
export const componentConfGroup = [
    {
        groupId: 'textGroup',
        groupName: '文本显示',
        components: [QuestionInfoConf, QuestionTitleConf, QuestionParagraphConf],
    },
    {
        groupId: 'inputGroup',
        groupName: '用户输入',
        components: [QuestionInputConf, QuestionTextareaConf],
    },
    {
        groupId: 'chooseGroup',
        groupName: '用户选择',
        components: [QuestionRadioConf, QuestionCheckboxConf],
    },
]

export function getComponentConfByType(type) {
    return componentConfList.find(c => c.type === type)
}