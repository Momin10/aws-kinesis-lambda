
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const config = require('./config')
const convert = require('./convertKinesisRecord')
const dynamoDb = new AWS.DynamoDB.DocumentClient()

/**
 * This is our AWS Lambda event handler
 */
function process(event, context, callback) {
	event.Records.forEach(record => {
		const set = convert(record)
		// Pass data and callback functions to processor 
        publishResult(set)
    })
}

module.exports.process = process

// ========================================================================
// Private functions
// ========================================================================

function publishResult(value) {
	const params = {
		TableName: config.RESULTS_TABLE,
		Item: {
			key: value.message.toString(16),
			timestamp: new Date().toString()
		},
	}
	// Write the record to the database
	dynamoDb.put(params, err => {
		if(err) console.error(err, err.stack)
	})
}