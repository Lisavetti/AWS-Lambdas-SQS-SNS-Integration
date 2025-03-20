const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    console.log("SNS event received:", JSON.stringify(event, null, 2));

    if (event.Records) {
        event.Records.forEach(record => {
            if (record.Sns) {
                const message = record.Sns.Message;
                console.log("SNS Message:", message);
            }
        });
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Message processed" })
    };
};
