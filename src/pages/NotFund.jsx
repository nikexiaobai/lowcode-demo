import React from "react"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Item from "./Item";
import { useState } from 'react'

function NotFund() {

    const [items, setItems] = useState([
        { fe_id: 'c1', title: '组件一' },
        { fe_id: 'c2', title: '组件二' },
        { fe_id: 'c3', title: '组件三' }
    ])
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    )

    function handleDragEnd(event) {
        const { active, over } = event
        if (over == null) return

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex(c => c.fe_id === active.id)
                const newIndex = items.findIndex(c => c.fe_id === over.id)
                console.log(oldIndex, newIndex)
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }

    const itemsWithId = items.map(c => {
        return {
            ...c,
            id: c.fe_id
        }
    })

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={itemsWithId}
                strategy={verticalListSortingStrategy}
            >
                {itemsWithId.map(c => <Item key={c.id} id={c.id} title={c.title} />)}
            </SortableContext>
        </DndContext>
    )
}

export default NotFund