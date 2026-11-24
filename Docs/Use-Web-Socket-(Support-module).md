# Support Module API Documentation

Documentation for using the Support Module in the O-API project with Swagger UI, Postman, and Socket.IO.

## 1. Introduction

The Support Module is designed to manage support tickets and enable communication between users and administrators.

Available features:

- Create support tickets
- Retrieve the authenticated user's tickets
- Retrieve messages from a ticket
- Send messages through WebSocket
- Receive messages in real time
- Close tickets as an administrator
- Reopen tickets as an administrator
- Change ticket status to `IN_PROGRESS` as an administrator

## 2. User Roles

| Role | Permissions |
|---|---|
| USER | Create tickets and access their own tickets |
| SELLER | Create tickets and access their own tickets |
| ADMIN | Administrative access and messaging across tickets |

Note: Actual permissions must be verified against the Guards and Services. Having a valid token alone does not grant permission to access every ticket.

## 3. Authentication

All HTTP endpoints in this Controller are protected by `JwtAuthGuard`.

You must provide a valid JWT access token when using Swagger UI or Postman.

Request header:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Swagger UI Authentication

1. Open Swagger UI.
2. Click the **Authorize** button.
3. Enter your JWT access token.
4. Execute the desired requests.

## 4. REST API Endpoints

Base path:

```http
/support
```

### 4.1. Create a Ticket

```http
POST /support/tickets
```

Description: Creates a new support ticket.

Request Body:

```json
{
  "title": "Problem with order registration"
}
```

The user's information is extracted from the JWT token. You do not need to provide `userId` in the request body.

Default ticket status:

```text
OPEN
```

Postman configuration:

- Method: `POST`
- URL: `{{BASE_URL}}/support/tickets`
- Authorization: Bearer Token
- Body: raw → JSON

### 4.2. Get User Tickets

```http
GET /support/tickets
```

Description: Retrieves the tickets belonging to the authenticated user.

No Query Parameters or Request Body are required.

### 4.3. Get Ticket Messages

```http
GET /support/tickets/:id/messages
```

Example:

```http
GET /support/tickets/674a12345678901234567890/messages
```

Path parameters:

| Parameter | Type | Description |
|---|---|---|
| id | string | MongoDB ticket ID |

In the current Service implementation, access is checked by comparing the ticket owner ID with the authenticated user's ID.

### 4.4. Close a Ticket

```http
PATCH /support/tickets/:id/close
```

Required role: `ADMIN`

Path parameter:

```text
id = Ticket ID
```

No request body is required.

### 4.5. Reopen a Ticket

```http
PATCH /support/tickets/:id/reopen
```

Required role: `ADMIN`

Only tickets with the `CLOSED` status can be reopened.

### 4.6. Change Ticket Status to IN_PROGRESS

```http
PATCH /support/tickets/:id/inprogress
```

Required role: `ADMIN`

Only tickets with the `OPEN` status can be moved to this status.

## 5. Ticket Statuses

The project defines the following enum:

```ts
export enum TicketStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    CLOSED = 'CLOSED',
}
```

| Status | Description |
|---|---|
| OPEN | A newly created or reopened ticket |
| IN_PROGRESS | The ticket is currently being handled |
| CLOSED | The ticket has been closed |

Sending new messages is not allowed when a ticket is `CLOSED`.

## 6. WebSocket Usage

The Support Module uses Socket.IO.

Namespace:

```text
/support
```

Connection URL:

```text
{{BASE_URL}}/support
```

A valid JWT is required for authentication. The exact token field and handshake format depend on the implementation of `WsJwtGuard`. Since that Guard is not included in the provided ZIP, its exact handshake configuration cannot be confirmed here.

### 6.1. Join a Ticket

Event:

```text
join_ticket
```

Payload:

```json
{
  "ticketId": "674a12345678901234567890"
}
```

Before joining the room, the user's permission to access the ticket must be checked.

Example success response:

```json
{
  "status": "joined"
}
```

Room naming convention:

```text
ticket_TICKET_ID
```

### 6.2. Send a Message

Event:

```text
send_message
```

Payload:

```json
{
  "ticketId": "674a12345678901234567890",
  "message": "Hello, please investigate my issue."
}
```

The sender's information is obtained from the authenticated user on the server:

- `senderId`
- `senderRole`

The client must not determine or submit the sender's role.

### 6.3. Receive a Message

Event:

```text
receive_message
```

Example payload:

```json
{
  "id": "674a12345678901234567891",
  "senderId": "USER_ID",
  "message": "Hello, your message has been received.",
  "senderRole": "ADMIN",
  "createdAt": "2026-11-24T10:00:00.000Z"
}
```

After a message is saved to the database, it is broadcast to the members of that ticket's room.

## 7. Testing with Postman

### 7.1. Testing REST API Endpoints

1. Create a new request in Postman.
2. Enter the API URL.
3. Open the Authorization tab.
4. Select Bearer Token.
5. Enter a valid JWT.
6. If required, set the Body type to raw → JSON.
7. Send the request.

Suggested Postman environment variables:

```text
BASE_URL = http://localhost:3000
TOKEN = YOUR_ACCESS_TOKEN
TICKET_ID = YOUR_TICKET_ID
```

Example request:

```http
POST {{BASE_URL}}/support/tickets
```

Request Body:

```json
{
  "title": "Account-related issue"
}
```

### 7.2. Testing Socket.IO

Create a Socket.IO request in Postman.

Namespace:

```text
/support
```

After connecting and authenticating:

First, emit the following event:

```text
join_ticket
```

Payload:

```json
{
  "ticketId": "{{TICKET_ID}}"
}
```

Then, to send a message, emit:

```text
send_message
```

Payload:

```json
{
  "ticketId": "{{TICKET_ID}}",
  "message": "Hello, this is a test message."
}
```

To receive incoming messages, listen for:

```text
receive_message
```

Note: The exact authentication configuration for Socket.IO must match the implementation of `WsJwtGuard`.

## 8. Testing with Swagger UI

Swagger UI is used to test HTTP REST API endpoints.

Steps:

1. Open your project's Swagger UI page.
2. Find the Support section.
3. Click **Authorize**.
4. Enter your JWT.
5. Expand the desired endpoint.
6. Click **Try it out**.
7. Enter the required parameters or request body.
8. Click **Execute**.

The following endpoints belong to the current Support Controller:

```text
POST   /support/tickets
GET    /support/tickets
GET    /support/tickets/{id}/messages
PATCH  /support/tickets/{id}/close
PATCH  /support/tickets/{id}/reopen
PATCH  /support/tickets/{id}/inprogress
```

Note: Swagger UI is used for REST API testing. Socket.IO events must be tested with a WebSocket/Socket.IO-compatible tool, such as Postman.

## 9. Possible Errors

| Error | Description |
|---|---|
| 401 Unauthorized | The token is missing or invalid |
| 403 Forbidden | The user is not authorized to perform the operation |
| 404 Not Found | The ticket does not exist or access is not permitted |
| 409 Conflict | The requested operation is incompatible with the ticket's current status |
| Invalid ticket ID | The provided ticket ID is invalid |
| Ticket is closed | The ticket is closed and cannot accept new messages |

## 10. Security Considerations

- The sender ID must be extracted from the JWT.
- The sender's role must never be trusted from client input.
- Ticket access must be verified before joining a room.
- Sending a message must independently verify ticket access, even if the client has not joined the room.
- Regular users must not be able to access other users' tickets.
- Only ADMIN should be allowed to change ticket statuses.

---

## 11. Current Implementation Limitations

The following limitations should be considered when using the current version of the code:

1. The Controller passes only `userId` to the Service when retrieving ticket messages. Therefore, ADMIN is also checked as the ticket owner in this endpoint, and administrative access to other users' messages is not currently available.

2. An endpoint for retrieving all tickets as ADMIN does not exist in the Controller, although the `findAllTickets` method is implemented in the Repository.

3. The Controller uses `@Roles`, but the implementation of `RolesGuard` is not included in the provided ZIP. Therefore, the actual role restrictions on administrative endpoints must also be verified.

4. Basic Swagger decorators such as `ApiTags` and `ApiBearerAuth` are defined, but the request DTOs and complete response documentation are not available in this version. As a result, Swagger may not display request bodies completely.

5. The Swagger initialization code and WebSocket handshake configuration are not included in the ZIP. Therefore, the final Swagger URL and exact Socket.IO JWT authentication format must be determined from the main project files.

6. The Gateway handles WebSocket errors through general error handling. Consequently, not all possible errors will necessarily be returned using the same status codes as HTTP errors.

---

**End of Support Module Documentation**