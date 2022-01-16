const db = require('../../data/db-config.js');

function find() {
  return db("users as u")
    .join("roles as r", "u.role_id", "=", "r.role_id")
    .select("u.user_id","u.username","r.role_name")
  /**
    You will need to join two tables.
    Resolves to an ARRAY with all users.

    [
      {
        "user_id": 1,
        "username": "bob",
        "role_name": "admin"
      },
      {
        "user_id": 2,
        "username": "sue",
        "role_name": "instructor"
      }
    ]
   */
}

function findBy(filter) {
  return db("users as u")
    .join("roles as r", "u.role_id", "=", "r.role_id")
    .select("u.user_id","u.username","u.password","r.role_name")
    .where(filter)
  /**
    You will need to join two tables.
    Resolves to an ARRAY with all users that match the filter condition.

    [
      {
        "user_id": 1,
        "username": "bob",
        "password": "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq",
        "role_name": "admin",
      }
    ]
   */
}

function findById(user_id) {
  return db("users as u")
    .join("roles as r", "u.role_id", "=", "r.role_id")
    .select("u.user_id","u.username","r.role_name")
    .where("u.user_id", user_id)
    .first()
  /**
    You will need to join two tables.
    Resolves to the user with the given user_id.

    {
      "user_id": 2,
      "username": "sue",
      "role_name": "instructor"
    }
   */
}

/**
  Creating a user requires a single insert (into users) if the role record with the given
  role_name already exists in the db, or two inserts (into roles and then into users)
  if the given role_name does not exist yet.

  When an operation like creating a user involves inserts to several tables,
  we want the operation to succeed or fail as a whole. It would not do to
  insert a new role record and then have the insertion of the user fail.

  In situations like these we use transactions: if anything inside the transaction
  fails, all the database changes in it are rolled back.

  {
    "user_id": 7,
    "username": "anna",
    "role_name": "team lead"
  }
 */
async function add({ username, password, role_name }) { // done for you
  let created_user_id
  await db.transaction(async trx => {
    let role_id_to_use
    const [role] = await trx('roles').where('role_name', role_name)
    if (role) {
      role_id_to_use = role.role_id
    } else {
      const [role_id] = await trx('roles').insert({ role_name: role_name })
      role_id_to_use = role_id
    }
    const [user_id] = await trx('users').insert({ username, password, role_id: role_id_to_use })
    created_user_id = user_id
  })
  return findById(created_user_id)
}

module.exports = {
  add,
  find,
  findBy,
  findById,
};
