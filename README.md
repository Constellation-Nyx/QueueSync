# QueueSync

QueueSync is a real-time smart queue management system designed to reduce patient uncertainty and improve hospital workflow efficiency.

Traditional hospital queues often leave patients unaware of their waiting status, leading to overcrowding, repeated inquiries at reception desks, and inefficient queue handling. QueueSync addresses this problem by providing a live, synchronized queue experience for both reception staff and patients.

Receptionists can add, manage, and call patient tokens through a centralized dashboard, while patients can view the currently served token, track their position in the queue, and receive dynamically calculated wait-time estimates based on actual consultation durations rather than fixed assumptions.

Built using React, Express.js, and Socket.IO, QueueSync ensures real-time updates across all connected devices, creating a transparent and efficient waiting experience.

### Key Features

* Real-time queue synchronization using Socket.IO
* Separate Receptionist and Patient dashboards
* Live token calling and queue management
* Dynamic wait-time prediction based on consultation history
* Token status tracking and search functionality
* Activity logging for queue operations
* Responsive and user-friendly interface

### Impact

QueueSync improves patient experience by reducing uncertainty during waiting periods while helping healthcare staff manage queues more efficiently. The system demonstrates how real-time technologies can be used to create smarter and more transparent healthcare services.

## Tech Stack
**Frontend**: React + Vite\
**Backend**: Express.js + Socket.IO\
**Real-time Communication**: WebSockets (Socket.IO)\
**Storage**: Local Storage (Prototype Version)\
**Future Enhancement**: MongoDB for persistent queue and analytics storage

## Run Locally

Frontend:

npm install
npm run dev

Backend:

npm install
node server.js
