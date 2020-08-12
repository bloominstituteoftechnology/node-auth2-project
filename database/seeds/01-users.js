exports.seed = function (knex) {
  return knex('users').insert([
			{
				id: 1,
				username: 'tony',
				password: 'password',
				department: 'development',
			},
			{
				id: 2,
				username: 'Howard',
				password: 'ducking',
				department: 'password1',
			},
			{
				id: 3,
				username: 'Kevin',
				password: 'thisguy',
				department: 'driver',
			}
		])
}