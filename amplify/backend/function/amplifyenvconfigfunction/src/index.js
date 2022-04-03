

const aws = require('aws-sdk');


//Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]



/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["API_KEY"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
     headers: {
         "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
     }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
};
