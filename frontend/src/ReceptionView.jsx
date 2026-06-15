function ReceptionView({
  patientName,
  setPatientName,
  queue,
  currentToken,
  avgTime,
  setAvgTime,
  activityLog,
  addPatient,
  callNextToken,
  deletePatient,
  clearAll,
  clearActivityLog,
}) {
  return (
    <div className="app reception-fade">

      {/* LEFT PANEL */}

      <div className="left-panel">

        <div className="header">
          <h1>🏥 QueueSync</h1>

          <span className="badge">
            Staff View
          </span>
        </div>

        <h2 className="fade-in">
          Receptionist Dashboard
        </h2>

        <div className="stats">

          <div className="stat-card">
            <p>NOW SERVING</p>

            <h3 className="serving-token">
              {currentToken
                ? `#${currentToken.token}`
                : "--"}
            </h3>

            {currentToken && (
              <span className="current-name">
                {currentToken.name}
              </span>
            )}
          </div>

          <div className="stat-card">
            <p>WAITING</p>

            <h3>{queue.length}</h3>

            <span>Patients</span>
          </div>

        </div>

        <button
          className="call-btn"
          onClick={callNextToken}
        >
          Call Next Token
        </button>

        <div className="avg-card">

            <label>
                Average Consultation Time
            </label>

            <h2>
                {avgTime > 0
                    ? `${avgTime} min`
                    : "Not enough data"}
            </h2>

        </div>

        <div className="activity-card">

          <div className="activity-header">

            <h3>Activity Log</h3>

            <button
              className="clear-log-btn"
              onClick={clearActivityLog}
            >
              Clear
            </button>

          </div>

          {activityLog.length === 0 ? (
            <p>No activity yet</p>
          ) : (
            activityLog.map((log, index) => (
              <div
                key={index}
                className="activity-item"
              >
                {log}
              </div>
            ))
          )}

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="right-panel">

        <div className="add-card">

          <h3>Add Patient</h3>

          <input
            type="text"
            placeholder="Patient name"
            value={patientName}
            onChange={(e) =>
              setPatientName(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addPatient();
              }
            }}
          />

          <button
            className="add-btn"
            onClick={addPatient}
          >
            Add Patient
          </button>

        </div>

        <div className="queue-card">

          <h3>Queue</h3>

          {queue.length === 0 ? (
            <p>No patients waiting</p>
          ) : (
            queue.map((patient) => (
              <div
                key={patient.token}
                className="queue-item"
              >

                <div>
                  #{patient.token} {patient.name}
                </div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deletePatient(
                      patient.token
                    )
                  }
                >
                  ✕
                </button>

              </div>
            ))
          )}

        </div>

        <button
          className="clear-btn"
          onClick={clearAll}
        >
          Clear All Queue
        </button>

      </div>

    </div>
  );
}

export default ReceptionView;
