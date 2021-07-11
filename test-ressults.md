FAIL  ./codegrade_mvp.test.js (9.603 s)
√ sanity check (21 ms)
server.js
[POST] /api/auth/login
√ [1] responds with the correct message on valid credentials (164 ms)
√ [2] responds with the correct status and message on invalid credentials (125 ms)
× [3] responds with a token with correct { subject, username, role_name, exp, iat } (117 ms)
[POST] /api/auth/register
× [4] creates a new user in the database when client does not provide role_name (541 ms)
× [5] creates a new user with role_id 3 (the default role) when client does not provide role_name (542 ms)
× [6] creates a new user with role_id 2 (existing role instructor) when client provides role_name instructor (548 ms)
× [7] creates a new user with a brand new role_id when client provides a role_name that does not exist yet (553 ms)
× [8] saves the user with a bcrypted password instead of plain text (551 ms)
× [9] responds with the correct user (when omitting role_name from the request) (1526 ms)
× [10] responds with the correct user (when choosing an existing role_name) (547 ms)
× [11] responds with the correct user (when choosing a valid role_name not in db) (548 ms)
× [12] leading and trailing whitespace is trimmed from the role_id (549 ms)
× [13] leading and trailing whitespace is trimmed from the role_id before validating (549 ms)
√ [14] responds with proper status and message on role_name over 32 chars after trimming (48 ms)
√ [15] responds with proper status and message if a client tries to register as an admin (50 ms)
× [16] responds with proper status on success (540 ms)
[GET] /api/users
√ [17] requests without a token are bounced with proper status and message (53 ms)
√ [18] requests with an invalid token are bounced with proper status and message (44 ms)
√ [19] requests with a valid token obtain a list of users (123 ms)
[GET] /api/users/:user_id
× [20] requests with a token with role_name admin obtain the user details (125 ms)
√ [21] requests with a token with a role_name that is not admin are bounced with proper status and message (120 ms)

● server.js › [POST] /api/auth/login › [3] responds with a token with correct { subject, username, role_name, exp, iat }

    expect(received).toMatchObject(expected)

    - Expected  - 3
    + Received  + 2

      Object {
    -   "role_name": "admin",
    -   "subject": 1,
    -   "username": "bob",
    +   "exp": 1626132433,
    +   "iat": 1626046033,
      }

      39 |       expect(decoded).toHaveProperty('iat')
      40 |       expect(decoded).toHaveProperty('exp')
    > 41 |       expect(decoded).toMatchObject({
         |                       ^
      42 |         subject: 1,
      43 |         role_name: 'admin',
      44 |         username: 'bob',

      at Object.<anonymous> (codegrade_mvp.test.js:41:23)

● server.js › [POST] /api/auth/register › [4] creates a new user in the database when client does not provide role_name

    thrown: "Exceeded timeout of 500 ms for a test.
    Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."

      56 |   })
      57 |   describe('[POST] /api/auth/register', () => {
    > 58 |     it('[4] creates a new user in the database when client does not provide role_name', async () => {
         |     ^
      59 |       await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234' })
      60 |       const devon = await db('users').where('username', 'devon').first()
      61 |       expect(devon).toMatchObject({ username: 'devon' })

      at codegrade_mvp.test.js:58:5
      at codegrade_mvp.test.js:57:3
      at Object.<anonymous> (codegrade_mvp.test.js:22:1)

● server.js › [POST] /api/auth/register › [5] creates a new user with role_id 3 (the default role) when client does not provide role_name

    thrown: "Exceeded timeout of 500 ms for a test.
    Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."

      61 |       expect(devon).toMatchObject({ username: 'devon' })
      62 |     }, 500)
    > 63 |     it('[5] creates a new user with role_id 3 (the default role) when client does not provide role_name', async () => {
         |     ^
      64 |       await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234' })
      65 |       const devon = await db('users').where('username', 'devon').first()
      66 |       expect(devon).toMatchObject({ role_id: 2 })

      at codegrade_mvp.test.js:63:5
      at codegrade_mvp.test.js:57:3
      at Object.<anonymous> (codegrade_mvp.test.js:22:1)

● server.js › [POST] /api/auth/register › [6] creates a new user with role_id 2 (existing role instructor) when client provides role_name instructor

    thrown: "Exceeded timeout of 500 ms for a test.
    Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."

      66 |       expect(devon).toMatchObject({ role_id: 2 })
      67 |     }, 500)
    > 68 |     it('[6] creates a new user with role_id 2 (existing role instructor) when client provides role_name instructor', async () => {
         |     ^
      69 |       await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234', role_name: 'instructor' })
      70 |       const devon = await db('users').where('username', 'devon').first()
      71 |       expect(devon).toMatchObject({ role_id: 3 })

      at codegrade_mvp.test.js:68:5
      at codegrade_mvp.test.js:57:3
      at Object.<anonymous> (codegrade_mvp.test.js:22:1)

● server.js › [POST] /api/auth/register › [7] creates a new user with a brand new role_id when client provides a role_name that does not exist yet

    thrown: "Exceeded timeout of 500 ms for a test.
    Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."

      71 |       expect(devon).toMatchObject({ role_id: 3 })
      72 |     }, 500)
    > 73 |     it('[7] creates a new user with a brand new role_id when client provides a role_name that does not exist yet', async () => {
         |     ^
      74 |       await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234', role_name: 'valid' })
      75 |       const devon = await db('users').where('username', 'devon').first()
      76 |       expect(devon).toMatchObject({ role_id: 4 })

      at codegrade_mvp.test.js:73:5
      at codegrade_mvp.test.js:57:3
      at Object.<anonymous> (codegrade_mvp.test.js:22:1)

● server.js › [POST] /api/auth/register › [8] saves the user with a bcrypted password instead of plain text

    thrown: "Exceeded timeout of 500 ms for a test.
    Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."

      76 |       expect(devon).toMatchObject({ role_id: 4 })
      77 |     }, 500)
    > 78 |     it('[8] saves the user with a bcrypted password instead of plain text', async () => {
         |     ^
      79 |       await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234' })
      80 |       const devon = await db('users').where('username', 'devon').first()
      81 |       expect(bcrypt.compareSync('1234', devon.password)).toBeTruthy()

      at codegrade_mvp.test.js:78:5
      at codegrade_mvp.test.js:57:3
      at Object.<anonymous> (codegrade_mvp.test.js:22:1)

● server.js › [POST] /api/auth/register › [9] responds with the correct user (when omitting role_name from the request)

    thrown: "Exceeded timeout of 500 ms for a test.
    Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."

      81 |       expect(bcrypt.compareSync('1234', devon.password)).toBeTruthy()
      82 |     }, 500)
    > 83 |     it('[9] responds with the correct user (when omitting role_name from the request)', async () => {
         |     ^
      84 |       const res = await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234' })
      85 |       expect(res.body).toMatchObject({ user_id: 3, username: 'devon', role_name: 'student' })
      86 |     }, 500)

      at codegrade_mvp.test.js:83:5
      at codegrade_mvp.test.js:57:3
      at Object.<anonymous> (codegrade_mvp.test.js:22:1)

● server.js › [POST] /api/auth/register › [10] responds with the correct user (when choosing an existing role_name)

    thrown: "Exceeded timeout of 500 ms for a test.
    Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."

      85 |       expect(res.body).toMatchObject({ user_id: 3, username: 'devon', role_name: 'student' })
      86 |     }, 500)
    > 87 |     it('[10] responds with the correct user (when choosing an existing role_name)', async () => {
         |     ^
      88 |       const res = await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234', role_name: 'instructor' })
      89 |       expect(res.body).toMatchObject({ user_id: 3, username: 'devon', role_name: 'instructor' })
      90 |     }, 500)

      at codegrade_mvp.test.js:87:5
      at codegrade_mvp.test.js:57:3
      at Object.<anonymous> (codegrade_mvp.test.js:22:1)

● server.js › [POST] /api/auth/register › [11] responds with the correct user (when choosing a valid role_name not in db)

    thrown: "Exceeded timeout of 500 ms for a test.
    Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."

      89 |       expect(res.body).toMatchObject({ user_id: 3, username: 'devon', role_name: 'instructor' })
      90 |     }, 500)
    > 91 |     it('[11] responds with the correct user (when choosing a valid role_name not in db)', async () => {
         |     ^
      92 |       const res = await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234', role_name: 'angel' })
      93 |       expect(res.body).toMatchObject({ user_id: 3, username: 'devon', role_name: 'angel' })
      94 |     }, 500)

      at codegrade_mvp.test.js:91:5
      at codegrade_mvp.test.js:57:3
      at Object.<anonymous> (codegrade_mvp.test.js:22:1)

● server.js › [POST] /api/auth/register › [12] leading and trailing whitespace is trimmed from the role_id

    thrown: "Exceeded timeout of 500 ms for a test.
    Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."

      93 |       expect(res.body).toMatchObject({ user_id: 3, username: 'devon', role_name: 'angel' })
      94 |     }, 500)
    > 95 |     it('[12] leading and trailing whitespace is trimmed from the role_id', async () => {
         |     ^
      96 |       const res = await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234', role_name: '    angel    ' })
      97 |       expect(res.body).toMatchObject({ user_id: 3, username: 'devon', role_name: 'angel' })
      98 |     }, 500)

      at codegrade_mvp.test.js:95:5
      at codegrade_mvp.test.js:57:3
      at Object.<anonymous> (codegrade_mvp.test.js:22:1)

● server.js › [POST] /api/auth/register › [13] leading and trailing whitespace is trimmed from the role_id before validating

    thrown: "Exceeded timeout of 500 ms for a test.
    Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."

       97 |       expect(res.body).toMatchObject({ user_id: 3, username: 'devon', role_name: 'angel' })
       98 |     }, 500)
    >  99 |     it('[13] leading and trailing whitespace is trimmed from the role_id before validating', async () => {
          |     ^
      100 |       const res = await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234', role_name: '              angel              ' })
      101 |       expect(res.body).toMatchObject({ user_id: 3, username: 'devon', role_name: 'angel' })
      102 |     }, 500)

      at codegrade_mvp.test.js:99:5
      at codegrade_mvp.test.js:57:3
      at Object.<anonymous> (codegrade_mvp.test.js:22:1)

● server.js › [POST] /api/auth/register › [16] responds with proper status on success

    thrown: "Exceeded timeout of 500 ms for a test.
    Use jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test."

      114 |       expect(res.status).toBe(422)
      115 |     }, 500)
    > 116 |     it('[16] responds with proper status on success', async () => {
          |     ^
      117 |       const res = await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234' })
      118 |       expect(res.status).toBe(201)
      119 |     }, 500)

      at codegrade_mvp.test.js:116:5
      at codegrade_mvp.test.js:57:3
      at Object.<anonymous> (codegrade_mvp.test.js:22:1)

● server.js › [GET] /api/users/:user_id › [20] requests with a token with role_name admin obtain the user details

    expect(received).toMatchObject(expected)

    - Expected  - 3
    + Received  + 1

      Object {
    -   "role_name": "admin",
    -   "user_id": 1,
    -   "username": "bob",
    +   "message": "This is not for you",
      }

      138 |       let res = await request(server).post('/api/auth/login').send({ username: 'bob', password: '1234' })
      139 |       res = await request(server).get('/api/users/1').set('Authorization', res.body.token)
    > 140 |       expect(res.body).toMatchObject({ "role_name": "admin", "user_id": 1, "username": "bob" })
          |                        ^
      141 |     })
      142 |     it('[21] requests with a token with a role_name that is not admin are bounced with proper status and message', async () => {
      143 |       let res = await request(server).post('/api/auth/login').send({ username: 'sue', password: '1234' })

      at Object.<anonymous> (codegrade_mvp.test.js:140:24)

Test Suites: 1 failed, 1 total
Tests:       13 failed, 9 passed, 22 total
Snapshots:   0 total
Time:        9.674 s, estimated 10 s
Ran all test suites related to changed files.

