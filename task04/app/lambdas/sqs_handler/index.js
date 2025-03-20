exports.handler = async (event, context) => {
    console.log("=== SQS Lambda Triggered ===");
    console.log("Event:", JSON.stringify(event, null, 2));

    if (!event.Records || event.Records.length === 0) {
        console.warn("No SQS messages received.");
        return {
            statusCode: 204,
            body: JSON.stringify({ message: "No messages to process." })
        };
    }

    event.Records.forEach(record => {
        let messageBody = record.body;
        console.log("Raw SQS message body:", messageBody);

        // Attempt to parse the message body as JSON
        try {
            messageBody = JSON.parse(messageBody);
            console.log("Parsed SQS message body:", messageBody);
        } catch (error) {
            console.warn("Failed to parse message body as valid JSON. Using the raw string.");
        }
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `Processed ${event.Records.length} message(s).`
        })
    };
};
