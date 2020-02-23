const AWS = require('aws-sdk')
const config = require('./config')

const kinesis = new AWS.Kinesis({region:"eu-west-1"})

const params = {
    Data: '{"message":"Hi Momin"}' /* Strings will be Base-64 encoded on your behalf */, /* required */
    PartitionKey: '0', /* required */
    StreamName: config.KINESIS_WORK_STREAM, /* required */
}

kinesis.putRecord(params, (err, data) => {
  if (err) console.log(err, err.stack) // an error occurred
  else     console.log(data)           // successful response
})