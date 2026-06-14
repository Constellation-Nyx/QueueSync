import { useState, useEffect } from "react";
import "./App.css";
import { io } from "socket.io-client";
import PatientView from "./PatientView";
import ReceptionView from "./ReceptionView";

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const socket = io("http://localhost:3001");


function App() {
  const [patientName, setPatientName] = useState("");

  const [queue, setQueue] = useState(
    JSON.parse(localStorage.getItem("queue")) || []
  );

  const [tokenCounter, setTokenCounter] = useState(
    JSON.parse(localStorage.getItem("tokenCounter")) || 0
  );

  const [currentToken, setCurrentToken] = useState(
    JSON.parse(localStorage.getItem("currentToken")) || null
  );

  const [avgTime, setAvgTime] = useState(
    JSON.parse(localStorage.getItem("avgTime")) || 10
  );

  const [activityLog, setActivityLog] = useState(
    JSON.parse(localStorage.getItem("activityLog")) || []
  );

  useEffect(() => {
    localStorage.setItem(
      "queue",
      JSON.stringify(queue)
    );

    localStorage.setItem(
      "tokenCounter",
      JSON.stringify(tokenCounter)
    );

    localStorage.setItem(
      "currentToken",
      JSON.stringify(currentToken)
    );

    localStorage.setItem(
      "avgTime",
      JSON.stringify(avgTime)
    );

    localStorage.setItem(
      "activityLog",
      JSON.stringify(activityLog)
    );
  }, [
    queue,
    tokenCounter,
    currentToken,
    avgTime,
    activityLog,
  ]);

  useEffect(() => {
  socket.on("queueUpdate", (data) => {
    console.log("Received:", data);

    setQueue(data.queue);
    setCurrentToken(data.currentToken);
    setAvgTime(data.avgTime);
  });

  return () => {
    socket.off("queueUpdate");
  };
}, []);


  const addPatient = () => {
    if (!patientName.trim()) return;

    const newPatient = {
      token: tokenCounter + 1,
      name: patientName,
    };

    setQueue([...queue, newPatient]);

    socket.emit("updateQueue", {
      queue: [...queue, newPatient],
      currentToken,
      avgTime,
    });

    setTokenCounter(tokenCounter + 1);

    setActivityLog([
      `Added ${patientName} - Token #${tokenCounter + 1}`,
      ...activityLog,
    ]);

    setPatientName("");
  };

  const callNextToken = () => {
    if (queue.length === 0) return;

    const nextPatient = queue[0];

    setCurrentToken(nextPatient);

    setQueue(queue.slice(1));

    socket.emit("updateQueue", {
      queue: queue.slice(1),
      currentToken: nextPatient,
      avgTime,
    });

    setActivityLog([
      `Called Token #${nextPatient.token} (${nextPatient.name})`,
      ...activityLog,
    ]);
  };

  const deletePatient = (token) => {
    const updatedQueue =
      queue.filter(
        (patient) => patient.token !== token
      );

    setQueue(updatedQueue);

    socket.emit("updateQueue", {
      queue: updatedQueue,
      currentToken,
      avgTime,
    });

    setActivityLog([
      `Deleted Token #${token}`,
      ...activityLog,
    ]);
  };

  const clearAll = () => {
    if (
      !window.confirm(
        "Reset queue and tokens?"
      )
    )
      return;

    localStorage.removeItem("queue");
    localStorage.removeItem("tokenCounter");
    localStorage.removeItem("currentToken");
    localStorage.removeItem("avgTime");
    localStorage.removeItem("activityLog");

    setQueue([]);
    setCurrentToken(null);

    socket.emit("updateQueue", {
      queue: [],
      currentToken: null,
      avgTime,
    });

    setTokenCounter(0);

    setActivityLog([
      "Queue Reset",
      ...activityLog,
    ]);
  };

  const clearActivityLog = () => {
    if (
      !window.confirm(
        "Clear all activity logs?"
      )
    )
      return;

    setActivityLog([]);

    localStorage.removeItem("activityLog");
  };

return (
  <Routes>

    <Route
      path="/reception"
      element={
        <ReceptionView
          patientName={patientName}
          setPatientName={setPatientName}
          queue={queue}
          currentToken={currentToken}
          avgTime={avgTime}
          setAvgTime={setAvgTime}
          activityLog={activityLog}
          addPatient={addPatient}
          callNextToken={callNextToken}
          deletePatient={deletePatient}
          clearAll={clearAll}
          clearActivityLog={clearActivityLog}
        />
      }
    />

    <Route
      path="/patient"
      element={
        <PatientView
          currentToken={currentToken}
          queue={queue}
          avgTime={avgTime}
        />
      }
    />

    <Route
      path="*"
      element={<Navigate to="/reception" />}
    />

  </Routes>
);
}

export default App;