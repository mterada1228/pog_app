import React from "react";

import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";

import rotteryBoxImg from "./rottely_box.png";
import loseBall from "./lose_ball.png";
import loseImg from "./lose.png";
import winBall from "./win_ball.png";
import winImg from "./win.png";

import "./App.css";

const UNDRAWN = 0;
const WIN = 1;
const LOSE = 2;

type attendee = {
  name: string;
  status: number;
};

const App = () => {
  const [openInputAttendeesDialog, setOpenInputAttendeesDialog] =
    React.useState(true);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openRotteryResultWinDialog, setOpenRotteryResultWinDialog] =
    React.useState(false);
  const [openRotteryResultLoseDialog, setOpenRotteryResultLoseDialog] =
    React.useState(false);
  const [attendees, setAttendees] = React.useState<attendee[]>([
    { name: "", status: UNDRAWN },
  ]);

  const handleAddAttendee = () => {
    setAttendees([...attendees, { name: "", status: UNDRAWN }]);
  };

  const handleRemoveAttendee = () => {
    if (attendees.length === 1) return;
    setAttendees(attendees.slice(0, attendees.length - 1));
  };

  const handleInputAttendeesDialogOK = () => {
    setOpenInputAttendeesDialog(false);
  };

  const handleDrawLotteryStart = (index: number) => {
    setOpenBackdrop(true);
    setTimeout(() => {
      const result = lotteryResult();
      const updatedAttendees = [...attendees];
      updatedAttendees[index].status = result;
      setAttendees(updatedAttendees);
      setOpenBackdrop(false);
      if (result === WIN) {
        setOpenRotteryResultWinDialog(true);
      } else {
        setOpenRotteryResultLoseDialog(true);
      }
    }, 3000);
  };

  const lotteryResult = () => {
    const p =
      (1.0 - attendees.filter((attendee) => attendee.status === WIN).length) /
      attendees.filter((attendee) => attendee.status === UNDRAWN).length;
    const n = Math.random();

    if (n < p) {
      return WIN;
    } else {
      return LOSE;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Dialog open={openInputAttendeesDialog}>
          <DialogTitle>参加者を入力</DialogTitle>
          {attendees.map((_attendee, index) => {
            return (
              <TextField
                key={index}
                label={`参加者${index + 1}`}
                onChange={(e) => {
                  const updatedAttendees = [...attendees];
                  updatedAttendees[index] = {
                    name: e.target.value,
                    status: UNDRAWN,
                  };
                  setAttendees(updatedAttendees);
                }}
              />
            );
          })}
          <Button onClick={handleAddAttendee}>参加者を追加</Button>
          <Button onClick={handleRemoveAttendee}>参加者を削除</Button>
          <Button onClick={handleInputAttendeesDialogOK}>OK</Button>
        </Dialog>

        <img src={rotteryBoxImg} className="App-logo" alt="rottery-box-img" />

        <Grid container spacing={2}>
          {attendees.map((attendee, index) => {
            return (
              <Grid key={index} item xs={4}>
                {attendee.status === UNDRAWN ? (
                  ""
                ) : attendee.status === WIN ? (
                  <img width={"10%"} src={winBall} />
                ) : (
                  <img width={"10%"} src={loseBall} />
                )}
                <p>{attendee.name}</p>
                {attendee.status === UNDRAWN ? (
                  <Button onClick={() => handleDrawLotteryStart(index)}>
                    抽選する
                  </Button>
                ) : (
                  ""
                )}
              </Grid>
            );
          })}
        </Grid>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Dialog open={openRotteryResultWinDialog}>
          <img src={winImg} />
          <Button onClick={() => setOpenRotteryResultWinDialog(false)}>
            OK
          </Button>
        </Dialog>

        <Dialog open={openRotteryResultLoseDialog}>
          <img src={loseImg} />
          <Button onClick={() => setOpenRotteryResultLoseDialog(false)}>
            OK
          </Button>
        </Dialog>
      </header>
    </div>
  );
};

export default App;
