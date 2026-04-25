import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";

const Item = (props) => {
    const { id, title } = props

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        border: '1px solid #ccc',
        margin: '10px o',
        background: '#f1f1f1'
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            Item{title}
        </div>

    )
}

export default Item
