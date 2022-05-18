import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import _ from "lodash";
import { DragDropContext, Draggable } from "react-beautiful-dnd";

import {
  GET_DND_HUBTABLE,
  UPDATE_HUBCOLUMN,
  ADD_TO_HUBCOLUMN,
  REMOVE_FROM_HUBCOLUMN,
} from "../queries";
import Column from "../components/HobManager/Column.component";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { initialData } from "../initial-data";

/* SASS MODULE */
import classes from "./index.module.scss";

const HubManager = (props) => {
  const [initState, setInitState] = useState(initialData);
  const { loading, error, data } = useQuery(GET_DND_HUBTABLE, {
    variables: { tableName: "dndtable" },
    fetchPolicy: "no-cache",
  });

  /* declaring Mutations for Chooser */
  const [updateHubColumn] = useMutation(UPDATE_HUBCOLUMN);
  const [addToHubColumn] = useMutation(ADD_TO_HUBCOLUMN);
  const [removeFromHubColumn] = useMutation(REMOVE_FROM_HUBCOLUMN);

  const setDnDTable = (data) => {
    const { getDnDHubTable: Table } = data;
    const files = {};
    const columns = {};
    const columnOrder = Table.columnOrder;

    /**
     * structuring draggable items
     */
    Table.files.forEach((file) => {
      console.log("file data ", file);
      files[file._id] = { _id: file._id, filename: file.filename };
    });

    Table.columns.forEach((col) => {
      columns[col._id] = {
        _id: col._id,
        title: col.title,
        fileIds: col.fileIds,
      };
      console.log("col fileId ", col);
    });

    const initTable = {
      files,
      columns,
      columnOrder,
    };
    setInitState(initTable);
    console.log(" initTable ", initTable);
  };

  useEffect(() => {
    if (data) {
      setDnDTable(data);
    }
  }, [data]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error!!!</p>;

  const onDragStart = () => {
    document.body.style.color = "orange";
  };

  const onDragEnd = async (result) => {
    document.body.style.color = "inherit";

    // FILE reorder column
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = initState.columns[source.droppableId];
    const finish = initState.columns[destination.droppableId];

    // console.log('start ', start)
    const filteredId = start.fileIds.filter(
      (file) => draggableId === file._id.toString()
    );

    if (start === finish) {
      const newFileIds = Array.from(start.fileIds);
      newFileIds.splice(source.index, 1);
      newFileIds.splice(destination.index, 0, filteredId[0]);

      const newColumn = {
        ...start,
        fileIds: newFileIds,
      };

      const newState = {
        ...initState,
        columns: {
          ...initState.columns,
          [newColumn._id]: newColumn,
        },
      };
      console.log("new State ", { ...newState });

      const { _id, fileIds } = newColumn;
      updateHubColumn({
        variables: {
          _id,
          fileIds: _.map(fileIds, (file) => file._id),
        },
        refetchQueries: [GET_DND_HUBTABLE, "getDnDHubTable"],
      });
      return setInitState(newState);
    }

    // Moving from one box to another
    const startFileIds = Array.from(start.fileIds);
    startFileIds.splice(source.index, 1);
    const newStart = {
      ...start,
      fileIds: startFileIds,
    };

    const finishFileIds = Array.from(finish.fileIds);
    const filteredFinishedId = _.filter(
      start.fileIds,
      (file) => draggableId === file._id
    );

    finishFileIds.splice(destination.index, 0, filteredFinishedId[0]);
    const newFinish = {
      ...finish,
      fileIds: finishFileIds,
    };

    const newState = {
      ...initState,
      columns: {
        ...initState.columns,
        [newStart._id]: newStart,
        [newFinish._id]: newFinish,
      },
    };

    removeFromHubColumn({
      variables: {
        _id: newStart._id,
        fileIds: draggableId,
      },
    }).catch((err) => console.error("Error ", err.message));

    const { _id, fileIds } = newFinish;
    addToHubColumn({
      variables: {
        _id,
        fileIds: _.map(fileIds, (prod) => prod._id),
      },
      refetchQueries: [GET_DND_HUBTABLE, "getDnDTable"],
    }).catch((err) => console.error("Error ", err));

    return setInitState(newState);
  };

  const { columnOrder, columns, files } = initState;
  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <div className={classes.Container}>
        {_.map(columnOrder, (columnId) => {
          const column = columns[columnId._id];
          const file = _.map(column.fileIds, (file) => files[file._id]);
          return <Column key={column._id} column={column} files={file} />;
        })}
      </div>
    </DragDropContext>
  );
};

export default HubManager;
