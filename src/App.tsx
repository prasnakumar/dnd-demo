import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const items = [
  { id: "121312A31231", content: "first task" },
  { id: "22131AC23123123", content: "Secound task" },
];

const onDragEnd = (result: any, columns: any, setcolumns: any) => {
  console.log("asdasd", result);
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceCol = columns.filter(
      (val: any) => val.id === source.droppableId
    );
    const DestinationCol = columns.filter(
      (val: any) => val.id === destination.droppableId
    );
    const sourceId = [...sourceCol[0].items];
    const destinationId = [...DestinationCol[0].items];
    const [removed] = sourceId.splice(source.index, 1);
    destinationId.splice(destination.index, 0, removed);
    sourceCol[0].items = sourceId;
    DestinationCol[0].items = destinationId;
  } else {
    const column: any = columns.filter(
      (val: any) => val.id === source.droppableId
    );
    const copiedItems = column[0].items;
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    column[0].items = copiedItems;
  }
};

const columnsforDisplay = [
  { id: "1asdasd", name: "Todo", items: items },
  { id: "1asdvalue", name: "In Progress", items: [] },
  { id: "1asdvsalue", name: "Requested", items: [] },
  { id: "1asdvaslue", name: "Done", items: [] },
];

const App: any = () => {
  const [columnsdrag, setcolumns] = useState(columnsforDisplay);
  return (
    <div className="App">
      hekki
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columnsdrag, setcolumns)}
      >
        {columnsdrag?.map((val: any, index: any) => {
          return (
            <div className={`header${val.id}`}>
              <p>{val.name}</p>
              <div className={`col-header${val.id}`}>
                <Droppable droppableId={val.id} key={val.id}>
                  {(provided: any, snapshot: any) => {
                    return (
                      <div
                        className="box"
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                        }}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {val.items.map((item: any, index: any) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided: any, snapshot: any) => {
                                return (
                                  <div
                                    key={item.id}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      color: "white",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default App;
