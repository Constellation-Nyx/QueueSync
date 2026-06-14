import { useState, useEffect } from "react";

function PatientView({
  currentToken,
  queue,
  avgTime,
}) {

  const [searchToken, setSearchToken] =
    useState("");

  const [patientStatus, setPatientStatus] =
    useState(null);
    
  useEffect(() => {
    if (searchToken) {
      checkStatus();
    }
}, [queue, currentToken]);


  const estimatedWait =
    queue.length * avgTime;

  const checkStatus = () => {
  const token = Number(searchToken);

  if (!token) return;

  if (
    currentToken &&
    token === currentToken.token
  ) {
    setPatientStatus({
      message: "🟢 It's Your Turn!",
      wait: 0,
      ahead: 0,
    });

    return;
  }

  const index = queue.findIndex(
    (p) => p.token === token
  );

  if (index !== -1) {
    setPatientStatus({
      message: "Please Wait",
      ahead: index,
      wait: index * avgTime,
      patientName: queue[index].name, 
    });

    return;
  }

  if (
    currentToken &&
    token < currentToken.token
  ) {
    setPatientStatus({
      message:
        "⚠ Token Already Called",
    });

    return;
  }

  setPatientStatus({
    message: "❌ Token Not Found",
  });
};

  return (
    <div className="patient-screen fade-patient">

      <div className="patient-header">
        <h1>🏥 QueueSync</h1>
        <p>Patient Waiting Room</p>
      </div>

      <div className="patient-main-card">

        <p className="label">
          NOW SERVING
        </p>

        <h2 className="token-number">
          {currentToken
            ? `#${currentToken.token}`
            : "--"}
        </h2>

        <p className="patient-name">
          {currentToken
            ? currentToken.name
            : "Waiting for first patient"}
        </p>

      </div>

      <div className="patient-stats">

        <div className="patient-stat-card">

          <p>TOKENS AHEAD</p>

          <h3>{queue.length}</h3>

        </div>

        <div className="patient-stat-card">

          <p>ESTIMATED WAIT</p>

          <h3>{estimatedWait} min</h3>

        </div>

      </div>

      <div className="token-check-card">

        <h3>Check Your Status</h3>

        <input
          type="number"
          placeholder="Enter token number"
          value={searchToken}
          onChange={(e) =>
            setSearchToken(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
             checkStatus();
            }
        }}
     />

        <button onClick={checkStatus}>
          Check Status
        </button>

        {patientStatus && (

          <div className="status-result">
            {patientStatus.patientName && (
                <p>
                    👤 Patient:
                    {" "}
                    {patientStatus.patientName}
                </p>
            )}
            <p className="status-message">
              {patientStatus.message}
            </p>

            {patientStatus.ahead !== undefined && (
              <p>
                Patients Ahead:
                {" "}
                {patientStatus.ahead}
              </p>
            )}

            {patientStatus.wait !== undefined && (
              <p>
                Estimated Wait Time:
                {" "}
                {patientStatus.wait}
                {" "}min
              </p>
            )}

          </div>
        )}

      </div>

      <div className="queue-display">

        <h3>Upcoming Queue</h3>

        {queue.length === 0 ? (
          <p>No patients waiting</p>
        ) : (
          queue.map((patient) => (
            <div
              key={patient.token}
              className="patient-queue-item"
            >
              <span>
                #{patient.token}
              </span>

              <span>
                {patient.name}
              </span>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default PatientView;