import React from "react";
import { Draggable } from "react-beautiful-dnd";

import Handle from "../components/UI/Handle/Handle.component";
import classes from "./Product.module.scss";
import PSDIcon from "../assets/icons/png/070-psd.png";

const File = React.forwardRef((props, ref) => {
  console.log('props itemname ', props.file.filename)
  const isDragDisabled= props.column === 'GP Chooser';
  return (
    <Draggable
      draggableId={props.file._id}
      index={props.index}
      /* isDragDisabled will dsable dragging when the file in "GP Chooser" box */
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => {
        return (
          <div
            className={`${classes.productContainer} ${
              isDragDisabled
                ? "grey"
                : snapshot.isDragging
                ? classes.activeBg
                : classes.bgColor
            }`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Handle imgSource={PSDIcon} />
            {props.file.filename}
          </div>
        );
      }}
    </Draggable>
  );
});

export default File;
