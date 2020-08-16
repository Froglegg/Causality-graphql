import React from "react";

import JournalTable from "./JournalTable";
import JournalAddEntry from "./JournalAddEntry";

function JournalDetail(props: any) {
  const [view, setView] = React.useState<any>("table");

  console.log(props);

  return (
    <>
      {view === "table" ? (
        <JournalTable {...props} view={view} setView={setView} />
      ) : (
        <JournalAddEntry {...props} view={view} setView={setView} />
      )}
    </>
  );
}

export default JournalDetail;
