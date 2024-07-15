const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

const config = {
	sc_client_region: process.env.DYNAMO_DB_REGION,
	sc_client_endpoint: process.env.DYNAMO_DB_ENDPOINT,
	sc_client_access_key_id: process.env.DYNAMO_DB_ACCESS_KEY_ID,
	sc_client_secret_key: process.env.DYNAMO_DB_SECRET_ACCESS_KEY
};

const dynamoDBClient = new DynamoDBClient({
	region: config.sc_client_region || '',
	endpoint: config.sc_client_endpoint || '',
	credentials: {
		accessKeyId: config.sc_client_access_key_id || '',
		secretAccessKey: config.sc_client_secret_key || ''
	}
})

module.exports = dynamoDBClient