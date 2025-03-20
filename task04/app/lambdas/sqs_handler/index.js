const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    if (!event.Records || event.Records.length === 0) {
        console.log("No messages received.");
        return {
            statusCode: 204,
            body: JSON.stringify({ message: "No messages to process." })
        };
    }

    event.Records.forEach(record => {
        console.log("Received SQS message:", record.body);
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ message: `Processed ${event.Records.length} messages.` })
    };
};
