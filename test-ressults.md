
FAIL  ./codegrade_mvp.test.js
√ sanity check (21 ms)
server.js
[POST] /api/auth/login
√ [1] responds with the correct message on valid credentials (160 ms)
√ [2] responds with the correct status and message on invalid credentials (122 ms)
× [3] responds with a token with correct { subject, username, role_name, exp, iat } (133 ms)
[POST] /api/auth/register
× [4] creates a new user in the database when client does not provide role_name (60 ms)
× [5] creates a new user with role_id 3 (the default role) when client does not provide role_name (56 ms)
√ [6] creates a new user with role_id 2 (existing role instructor) when client provides role_name instructor (68 ms)
√ [7] creates a new user with a brand new role_id when client provides a role_name that does not exist yet (60 ms)
× [8] saves the user with a bcrypted password instead of plain text (51 ms)
× [9] responds with the correct user (when omitting role_name from the request) (53 ms)
× [10] responds with the correct user (when choosing an existing role_name) (60 ms)
× [11] responds with the correct user (when choosing a valid role_name not in db) (65 ms)
× [12] leading and trailing whitespace is trimmed from the role_id (65 ms)
× [13] leading and trailing whitespace is trimmed from the role_id before validating (63 ms)
√ [14] responds with proper status and message on role_name over 32 chars after trimming (41 ms)
√ [15] responds with proper status and message if a client tries to register as an admin (48 ms)
× [16] responds with proper status on success (63 ms)
[GET] /api/users
√ [17] requests without a token are bounced with proper status and message (50 ms)
√ [18] requests with an invalid token are bounced with proper status and message (48 ms)
√ [19] requests with a valid token obtain a list of users (124 ms)
[GET] /api/users/:user_id
× [20] requests with a token with role_name admin obtain the user details (134 ms)
√ [21] requests with a token with a role_name that is not admin are bounced with proper status and message (143 ms)

● server.js › [POST] /api/auth/login › [3] responds with a token with correct { subject, username, role_name, exp, iat }

    expect(received).toMatchObject(expected)

    - Expected  - 3
    + Received  + 2

      Object {
    -   "role_name": "admin",
    -   "subject": 1,
    -   "username": "bob",
    +   "exp": 1626144305,
    +   "iat": 1626057905,
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

    expect(received).toMatchObject(expected)

    Matcher error: received value must be a non-null object

    Received has value: undefined

      59 |       await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234' })
      60 |       const devon = await db('users').where('username', 'devon').first()
    > 61 |       expect(devon).toMatchObject({ username: 'devon' })
         |                     ^
      62 |     }, 500)
      63 |     it('[5] creates a new user with role_id 3 (the default role) when client does not provide role_name', async () => {
      64 |       await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234' })

      at Object.<anonymous> (codegrade_mvp.test.js:61:21)

● server.js › [POST] /api/auth/register › [5] creates a new user with role_id 3 (the default role) when client does not provide role_name

    expect(received).toMatchObject(expected)

    Matcher error: received value must be a non-null object

    Received has value: undefined

      64 |       await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234' })
      65 |       const devon = await db('users').where('username', 'devon').first()
    > 66 |       expect(devon).toMatchObject({ role_id: 2 })
         |                     ^
      67 |     }, 500)
      68 |     it('[6] creates a new user with role_id 2 (existing role instructor) when client provides role_name instructor', async () => {
      69 |       await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234', role_name: 'instructor' })

      at Object.<anonymous> (codegrade_mvp.test.js:66:21)

● server.js › [POST] /api/auth/register › [8] saves the user with a bcrypted password instead of plain text

    TypeError: Cannot read property 'password' of undefined

      79 |       await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234' })
      80 |       const devon = await db('users').where('username', 'devon').first()
    > 81 |       expect(bcrypt.compareSync('1234', devon.password)).toBeTruthy()
         |                                               ^
      82 |     }, 500)
      83 |     it('[9] responds with the correct user (when omitting role_name from the request)', async () => {
      84 |       const res = await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234' })

      at Object.<anonymous> (codegrade_mvp.test.js:81:47)

● server.js › [POST] /api/auth/register › [9] responds with the correct user (when omitting role_name from the request)

    expect(received).toMatchObject(expected)

    - Expected  - 3
    + Received  + 8

      Object {
    -   "role_name": "student",
    -   "user_id": 3,
    -   "username": "devon",
    +   "message": "Undefined binding(s) detected when compiling SELECT. Undefined column(s): [role_name] query: select * from `roles` where `role_name` = ?",
    +   "stack": "Error: Undefined binding(s) detected when compiling SELECT. Undefined column(s): [role_name] query: select * from `roles` where `role_name` = ?
    +     at QueryCompiler_SQLite3.toSQL (C:\\Users\\chef_\\Desktop\\Project Repository\\Backend Projects\\node-auth2-project-1\\node_modules\\knex\\lib\\query\\querycompiler.js:110:13)
    +     at Builder.toSQL (C:\\Users\\chef_\\Desktop\\Project Repository\\Backend Projects\\node-auth2-project-1\\node_modules\\knex\\lib\\query\\querybuilder.js:78:44)
    +     at ensureConnectionCallback (C:\\Users\\chef_\\Desktop\\Project Repository\\Backend Projects\\node-auth2-project-1\\node_modules\\knex\\lib\\execution\\internal\\ensure-connection-callback.js:4:30)
    +     at Runner.ensureConnection (C:\\Users\\chef_\\Desktop\\Project Repository\\Backend Projects\\node-auth2-project-1\\node_modules\\knex\\lib\\execution\\runner.js:272:20)
    +     at Runner.run (C:\\Users\\chef_\\Desktop\\Project Repository\\Backend Projects\\node-auth2-project-1\\node_modules\\knex\\lib\\execution\\runner.js:30:19)
    +     at C:\\Users\\chef_\\Desktop\\Project Repository\\Backend Projects\\node-auth2-project-1\\api\\users\\users-model.js:96:20",
      }

      83 |     it('[9] responds with the correct user (when omitting role_name from the request)', async () => {
      84 |       const res = await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234' })
    > 85 |       expect(res.body).toMatchObject({ user_id: 3, username: 'devon', role_name: 'student' })
         |                        ^
      86 |     }, 500)
      87 |     it('[10] responds with the correct user (when choosing an existing role_name)', async () => {
      88 |       const res = await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234', role_name: 'instructor' })

      at Object.<anonymous> (codegrade_mvp.test.js:85:24)

● server.js › [POST] /api/auth/register › [10] responds with the correct user (when choosing an existing role_name)

    expect(received).toMatchObject(expected)

    - Expected  - 3
    + Received  + 1

      Object {
    -   "role_name": "instructor",
    -   "user_id": 3,
    -   "username": "devon",
    +   "message": "Great to have to, undefined",
      }

      87 |     it('[10] responds with the correct user (when choosing an existing role_name)', async () => {
      88 |       const res = await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234', role_name: 'instructor' })
    > 89 |       expect(res.body).toMatchObject({ user_id: 3, username: 'devon', role_name: 'instructor' })
         |                        ^
      90 |     }, 500)
      91 |     it('[11] responds with the correct user (when choosing a valid role_name not in db)', async () => {
      92 |       const res = await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234', role_name: 'angel' })

      at Object.<anonymous> (codegrade_mvp.test.js:89:24)

● server.js › [POST] /api/auth/register › [11] responds with the correct user (when choosing a valid role_name not in db)

    expect(received).toMatchObject(expected)

    - Expected  - 3
    + Received  + 1

      Object {
    -   "role_name": "angel",
    -   "user_id": 3,
    -   "username": "devon",
    +   "message": "Great to have to, undefined",
      }

      91 |     it('[11] responds with the correct user (when choosing a valid role_name not in db)', async () => {
      92 |       const res = await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234', role_name: 'angel' })
    > 93 |       expect(res.body).toMatchObject({ user_id: 3, username: 'devon', role_name: 'angel' })
         |                        ^
      94 |     }, 500)
      95 |     it('[12] leading and trailing whitespace is trimmed from the role_id', async () => {
      96 |       const res = await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234', role_name: '    angel    ' })

      at Object.<anonymous> (codegrade_mvp.test.js:93:24)

● server.js › [POST] /api/auth/register › [12] leading and trailing whitespace is trimmed from the role_id

    expect(received).toMatchObject(expected)

    - Expected  - 3
    + Received  + 1

      Object {
    -   "role_name": "angel",
    -   "user_id": 3,
    -   "username": "devon",
    +   "message": "Great to have to, undefined",
      }

       95 |     it('[12] leading and trailing whitespace is trimmed from the role_id', async () => {
       96 |       const res = await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234', role_name: '    angel    ' })
    >  97 |       expect(res.body).toMatchObject({ user_id: 3, username: 'devon', role_name: 'angel' })
          |                        ^
       98 |     }, 500)
       99 |     it('[13] leading and trailing whitespace is trimmed from the role_id before validating', async () => {
      100 |       const res = await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234', role_name: '              angel              ' })

      at Object.<anonymous> (codegrade_mvp.test.js:97:24)

● server.js › [POST] /api/auth/register › [13] leading and trailing whitespace is trimmed from the role_id before validating

    expect(received).toMatchObject(expected)

    - Expected  - 3
    + Received  + 1

      Object {
    -   "role_name": "angel",
    -   "user_id": 3,
    -   "username": "devon",
    +   "message": "Great to have to, undefined",
      }

       99 |     it('[13] leading and trailing whitespace is trimmed from the role_id before validating', async () => {
      100 |       const res = await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234', role_name: '              angel              ' })
    > 101 |       expect(res.body).toMatchObject({ user_id: 3, username: 'devon', role_name: 'angel' })
          |                        ^
      102 |     }, 500)
      103 |     it('[14] responds with proper status and message on role_name over 32 chars after trimming', async () => {
      104 |       const res = await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234', role_name: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' })

      at Object.<anonymous> (codegrade_mvp.test.js:101:24)

● server.js › [POST] /api/auth/register › [16] responds with proper status on success

    expect(received).toBe(expected) // Object.is equality

    Expected: 201
    Received: 500

      116 |     it('[16] responds with proper status on success', async () => {
      117 |       const res = await request(server).post('/api/auth/register').send({ username: 'devon', password: '1234' })
    > 118 |       expect(res.status).toBe(201)
          |                          ^
      119 |     }, 500)
      120 |   })
      121 |   describe('[GET] /api/users', () => {

      at Object.<anonymous> (codegrade_mvp.test.js:118:26)

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
Tests:       11 failed, 11 passed, 22 total
Snapshots:   0 total
Time:        3.448 s, estimated 10 s
Ran all test suites related to changed files.
