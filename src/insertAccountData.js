export async function insertAccountData(env, tokenData, userData) {
	// Prepare the insert query
	const accountInsertQuery = `
		INSERT INTO accounts (
			id, access_token, scope, token_type, providerAccountId, provider, type, userId
		) VALUES (
			UUID(), ?, ?, ?, ?, ?, ?, ?
		)
	`

	// Define parameters to be inserted into the database
	const userInsertParams = [
		tokenData.access_token,
		tokenData.scope,
		tokenData.token_type,
		userData.id,
		'github', // Provider is GitHub
		'user', // Assuming 'user' as the account type
		userData.id // userId is GitHub's user ID
	]

	// Perform the database insert
	await env.D1.prepare(accountInsertQuery).bind(...userInsertParams).run()
}
