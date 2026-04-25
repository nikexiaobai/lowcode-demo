import React from "react";
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

const SortableContainer = (props) => {
    const { children, items, onDragEnd } = props

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // 8px
            },
        })
    )

    function handleDragEnd(event) {
        const { active, over } = event
        if (over == null) return

        if (active.id !== over.id) {
            const oldIndex = items.findIndex(c => c.fe_id === active.id)
            const newIndex = items.findIndex(c => c.fe_id === over.id)
            onDragEnd(oldIndex, newIndex)
        }
    }

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
                {children}
            </SortableContext>
        </DndContext>
    )
}
export default SortableContainer