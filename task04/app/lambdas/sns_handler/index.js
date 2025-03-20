exports.handler = async (event, context) => {
    console.log("=== SNS Lambda Triggered ===");
    console.log("Event:", JSON.stringify(event, null, 2));

    if (!event.Records || event.Records.length === 0) {
        console.warn("No SNS messages received.");
        return {
            statusCode: 204,
            body: JSON.stringify({ message: "No SNS messages to process." })
        };
    }

    event.Records.forEach(record => {
        if (record.Sns) {
            let message = record.Sns.Message;
            console.log("Raw SNS message:", message);

            // Attempt to parse the SNS message as JSON
            try {
                message = JSON.parse(message);
                console.log("Parsed SNS message:", message);
            } catch (error) {
                console.warn("Failed to parse SNS message as valid JSON. Using the raw string.");
            }
        }
    });

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "SNS message(s) processed successfully."
        })
    };
};
