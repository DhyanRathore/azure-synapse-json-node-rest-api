// Azure Function: Node.js REST API to read data from Azure Synapse Analytics with query parameter and return results as JSON
// Author: Dhyanendra Singh Rathore

// Import the tedious library
const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

// Entry point of the function
module.exports = function (context, req) {

    // Define variables to store connection details and credentials
    // Connection details and credentials are fetched from Environment Variables during function execution
    // Modify the connection details and credentials in local.settings.json when running the App locally
    // Add the connection details and credentials in the "Functions App -> Configuration -> Application settings" when running the App on Azure
    const config = {
        server: process.env["SYNAPSE_SERVER_FQDN"],
        authentication: {
            type: 'default',
            options: {
                userName: process.env["SYNAPSE_USER"],
                password: process.env["SYNAPSE_USER_PASSWORD"],
            }
        },
        options: {
            encrypt: true,
            database: process.env["SYNAPSE_DATABASE"],
            port: 1433
        }
    };

    // Create Connection object
    const connection = new Connection(config);

    // Create array to store the query results
    let result = [];
    let rowData = {};

    // req.query.color will be passed as a Query variable in the URL
    const payload = [req.query.color];

    // Create query to execute against the database
    const queryText = "SELECT Color, COUNT(DISTINCT[ProductID]) as cnt FROM SalesLT.Product " + (payload[0] != undefined ? " WHERE Color IN ('" + payload[0] + "')" : "") + " GROUP BY Color ORDER BY cnt;";
    context.log(queryText);

    // Create Request object
    request = new Request(queryText, function (err) {
        if (err) {
            // Error in executing query
            context.log.error(err);
            context.res.status = 500;
            context.res.body = "Error executing the query";
        } else {
            context.res = {
                status: 200,
                isRaw: true,
                body: result,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        }
        // Inform Azure Function runtime that work is done
        context.done();
    });

    // Manipulate the results and create JSON
    request.on('row', function (columns) {
        rowData = {};
        columns.forEach(function (column) {
            // IMPORTANT: Change the conversion logic here to adjust the JSON format
            rowData[column.metadata.colName] = column.value;
        });
        result.push(rowData);
    });

    connection.on('connect', function (err) {
        if (err) {
            // Error in connecting
            context.log.error(err);
            context.res.status = 500;
            context.res.body = "Error connecting to Azure Synapase";
            context.done();
        } else {
            // Connection succeeded
            connection.execSql(request);
        }
    });
}