import React from "react";

import Snackbar from "../../../../Components/Snackbar";

import JournalTable from "./JournalTable";
import JournalAddEntry from "./JournalAddEntry";

function JournalDetail(props: any) {
  const [view, setView] = React.useState<any>("table");
  const [snackBar, setSnackBar] = React.useState({
    open: false,
    message: "",
  });

  return (
    <>
      {view === "table" ? (
        <JournalTable {...props} view={view} setView={setView} />
      ) : (
        <JournalAddEntry
          {...props}
          view={view}
          setView={setView}
          snackBar={snackBar}
          setSnackBar={setSnackBar}
        />
      )}
      <Snackbar
        open={snackBar.open}
        message={snackBar.message}
        handleClose={() => {
          setSnackBar({
            ...snackBar,
            open: false,
          });
        }}
        position={{ vertical: "top", horizontal: "center" }}
      />
    </>
  );
}

export default JournalDetail;
