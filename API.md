# BSIT 2B Elections Backend — API Reference

Machine-oriented documentation for integrating with or generating clients against this HTTP API.

## Base

| Item | Value |
|------|--------|
| Base URL | `http://localhost:8080` |
| Content type | `application/json` (request and response bodies) |
| CORS | `Access-Control-Allow-Origin: *`; methods `GET, POST, PUT, DELETE, OPTIONS`; header `Content-Type` |
| Auth | None |

## Domain rules (important)

1. **Cast vs submit**
   - `POST /votes` = pick/change a candidate for a position (draft ballot).
   - `POST /votes/submit` = finalize ballot (`users.done_voting = true`).
2. **After submit, ballot is locked**
   - If `done_voting` is `true`, `POST /votes` returns `403` with body text `voting already submitted`.
3. **One candidate per position per voter**
   - Casting again for the same `(voter_id, position)` replaces the candidate.
4. **One vote per candidate per voter**
   - Casting the same `candidate_id` for a different `position` moves that vote to the new position (does not create two rows for the same candidate).
5. **IDs** are UUIDs (string form in JSON).

## Data models

### User

```json
{
  "id": "uuid",
  "created_at": "RFC3339 timestamp",
  "name": "string",
  "is_eligible": true,
  "ineligibility_reason": "string",
  "done_voting": false
}
```

### Vote

```json
{
  "id": "uuid",
  "created_at": "RFC3339 timestamp",
  "voter_id": "uuid",
  "candidate_id": "uuid",
  "position": "string"
}
```

### VotingStatus

```json
{
  "not_voted": 0,
  "done_voting": 0,
  "total_voters": 0
}
```

- `not_voted`: count of users with `done_voting = false`
- `done_voting`: count of users with `done_voting = true`
- `total_voters`: total users (`not_voted + done_voting`)

---

## Routes

### `GET /users`

List all users.

**Response:** `200` — `User[]`

**Errors:** `500` — plain text error message

---

### `GET /votes`

List all votes.

**Response:** `200` — `Vote[]` (ordered by `created_at` ascending)

**Errors:** `500` — plain text error message

---

### `GET /votes/status`

Aggregate voting progress across all users.

**Response:** `200` — `VotingStatus`

**Errors:** `500` — plain text error message

---

### `GET /votes/voter/{voterID}`

List votes cast by one voter.

**Path params**

| Name | Type | Required | Notes |
|------|------|----------|--------|
| `voterID` | UUID string | yes | Invalid UUID → `400` |

**Response:** `200` — `Vote[]` (may be empty `[]`; ordered by `created_at` ascending)

**Errors**

| Status | Body (plain text) |
|--------|-------------------|
| `400` | `invalid voter id` |
| `500` | error message |

---

### `POST /votes`

Cast or update a vote for a position. Allowed only while the voter has `done_voting = false`.

**Request body**

```json
{
  "voter_id": "uuid",
  "candidate_id": "uuid",
  "position": "string"
}
```

| Field | Required | Notes |
|-------|----------|--------|
| `voter_id` | yes | non-nil UUID |
| `candidate_id` | yes | non-nil UUID |
| `position` | yes | non-empty string |

**Behavior**

1. Reject if voter not found → `404`
2. Reject if voter `done_voting` is true → `403`
3. Delete any existing vote by this voter for this `candidate_id` (move candidate off old position)
4. Upsert on `(voter_id, position)`: insert or replace `candidate_id`
5. Return saved `Vote` row

**Response:** `201` — `Vote`

**Errors**

| Status | Body (plain text) |
|--------|-------------------|
| `400` | `invalid request body` |
| `400` | `voter_id, candidate_id, and position are required` |
| `403` | `voting already submitted` |
| `404` | `voter not found` |
| `500` | error message |

---

### `POST /votes/submit`

Finalize a voter’s ballot: set `users.done_voting = true`. After this, `POST /votes` for that voter is forbidden.

**Request body**

```json
{
  "voter_id": "uuid"
}
```

| Field | Required | Notes |
|-------|----------|--------|
| `voter_id` | yes | non-nil UUID |

**Response:** `200` — updated `User` (with `done_voting: true`)

**Errors**

| Status | Body (plain text) |
|--------|-------------------|
| `400` | `invalid request body` |
| `400` | `voter_id is required` |
| `404` | `voter not found` |
| `500` | error message |

**Note:** Calling submit again on an already-submitted voter still succeeds and returns the user with `done_voting: true` (idempotent update).

---

## Typical client flow

```
1. GET /users                          → pick voter + candidates
2. POST /votes                          → cast/change votes per position (repeat as needed)
3. GET /votes/voter/{voterID}           → review ballot
4. POST /votes/submit                   → lock ballot (done_voting = true)
5. GET /votes/status                    → dashboard counts
6. GET /votes                           → all ballots (admin/results)
```

After step 4, step 2 for that `voter_id` must fail with `403`.

---

## Error format

Error responses use `http.Error`: **plain text** body (not JSON), with an appropriate status code. Success responses are JSON with `Content-Type: application/json`.

---

## Route index

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/users` | List users |
| `GET` | `/votes` | List all votes |
| `GET` | `/votes/status` | Voting progress counts |
| `GET` | `/votes/voter/{voterID}` | Votes for one voter |
| `POST` | `/votes` | Cast/update a vote |
| `POST` | `/votes/submit` | Finalize ballot (`done_voting = true`) |
