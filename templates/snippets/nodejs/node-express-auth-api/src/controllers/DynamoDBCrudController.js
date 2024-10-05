const Utilities = require('../Utilities');
const { PutItemCommand, GetItemCommand, ScanCommand, UpdateItemCommand, DeleteItemCommand } = require('@aws-sdk/client-dynamodb');
const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
const dynamoDBClient = require('../database/dbconfig/DB_dynamodb_connection')
const tableName = 'users'

class DynamoDBCrudController {

	async create(req, res) {
		try {
			const putItemCommand = new PutItemCommand({
				TableName: tableName,
				Item: marshall(req.body)
			});
			const data = dynamoDBClient.send(putItemCommand);
			Utilities.apiResponse(res, 200, 'User Created Successfully!', data)
		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}

	async read(req, res) {
		try {
			let id = req.params.userId
			if (!id) {
				const scanCommand = new ScanCommand({
					TableName: tableName
				});
				const result = await dynamoDBClient.send(scanCommand);
				const data = result.Items.map(item => unmarshall(item));
				return Utilities.apiResponse(res, 200, 'Get Users Successfully', data)
			}
			const getItemCommand = new GetItemCommand({
				TableName: tableName,
				Key: marshall({ id })
			});
			const result = await dynamoDBClient.send(getItemCommand);
			const data = unmarshall(result.Item);
			return Utilities.apiResponse(res, 200, 'Get Users Successfully', data)
		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}

	async update(req, res) {
		try {
			let id = req.params.userId
			const updateItemCommand = new UpdateItemCommand({
				TableName: tableName,
				Key: marshall({ id }),
				UpdateExpression: 'set #name = :name',
				ExpressionAttributeNames: { '#name': 'name' },
				ExpressionAttributeValues: marshall({ ':name': req.body.name })
			});
			const data = dynamoDBClient.send(updateItemCommand);
			return Utilities.apiResponse(res, 200, 'User Has Been Updated Successfully', data)
		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}

	async delete(req, res) {
		try {
			let id = req.params.userId
			const deleteItemCommand = new DeleteItemCommand({
				TableName: tableName,
				Key: marshall({ id })
			});
			const data = dynamoDBClient.send(deleteItemCommand);
			Utilities.apiResponse(res, 200, 'User Deleted Successfully', data)
		} catch (error) {
			Utilities.apiResponse(res, 500, error)
		}
	}
}

module.exports = new DynamoDBCrudController();