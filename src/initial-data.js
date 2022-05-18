const initialData = {
  tasks: [
    { id: "file-1", filename: "budapesht.psb" },
    { id: "file-2", filename: "vienna.psb" },
    { id: "file-3", filename: "los-angeles.psb" },
    { id: "file-4", filename: "casablanca.psb" },
  ],
  columns: [
    {
      id: "column-1",
      title: "Start",
      taskIds: ["file-1", "file-2", "file-3", "file-4"],
    },

    {
      id: "column-2",
      title: "Destination",
      taskIds: [],
    },

  ],
  /* Facilitate the reorder of the columns */
  columnOrder: ["column-1", 'collumn-2'],
};

export default initialData;
