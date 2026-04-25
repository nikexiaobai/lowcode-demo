import styles from './Lowcode.module.scss'
import EditCanvas from './EditCanvas'
import { useDispatch } from 'react-redux'
import { getComponent } from '../api/getComponent'
import { useLoadQuestionData } from '../hooks/useLoadQuestionData'
import { changeSelectedId } from '../store/componentsReducer'
import LeftPanel from './Leftpanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'

function Lowcode() {
    const dispacth = useDispatch()

    useLoadQuestionData()

    function clearSelectedId() {
        dispacth(changeSelectedId(''))
    }



    return (
        <div className={styles.container}>
            <div style={{ backgroundColor: "#fff" }}><EditHeader /></div>
            <div className={styles['content-wrapper']}>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <LeftPanel />
                    </div>
                    <div className={styles.main} onClick={clearSelectedId}>
                        <div className={styles['canvas-wrapper']}>
                            <EditCanvas />
                        </div>
                    </div>
                    <div className={styles.right}>
                        <RightPanel />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Lowcode