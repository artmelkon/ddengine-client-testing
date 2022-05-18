// import React from 'react';
import { Droppable } from "react-beautiful-dnd";

import File from "./File.component";
import classes from "./Column.module.scss";

const Column = (props) => {
  const {column: {_id, title}} = props;
  // console.log('column props ', props)
  return (
    <div className={classes.Container}>
      <h3 className={classes.Title}>{title}</h3>
      <Droppable droppableId={_id}>
        {(provided, snapshot) => (
          <div
            className={`${classes.ProductList} ${
              snapshot.isDraggingOver ? classes.activeBg : classes.bgColor
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >

            {props.files.map((file, index) =>
            {
              console.log('map file', file)
              return <File key={file._id} file={file} index={index} column={title}/>
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
