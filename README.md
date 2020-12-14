---
Repo Type: Sample
Languages:
- Node.js
- JavaScript
- T-SQL
- JSON
Products:
- Azure Synapse Analytics
- Azure Functions
Description: "Creating a bare minimum Azure Function REST API to return JSON results from Azure Synapse Analytics with Node.js"
---

# REST API to return JSON results from Azure Synapse Analytics with Azure Functions and Node.js

![License](https://img.shields.io/badge/license-MIT-green.svg)

Creating a serverless REST API with Azure Functions is just a matter of a few lines of code. Azure Functions is an outstanding modern serverless computing service that developers use to create scalable solutions without worrying about the infrastructure setup. Node.js is another most popular selections to develop scalable, refined, high-performance REST API to be used by diverse clients. Azure Functions takes care of running the Node.js code.

The code is triggered when Azure Functions receives an HTTP request. The function code handles the request, prepares a SQL query with the given parameters, executes the query against the Synapse data warehouse, converts the results to JSON, and returns it to the caller.

## Motivation

Azure SQL Database and SQL Server 2016 (and later) supports an in-built feature for formatting query results as JSON. Then JSON support for Azure SQL data warehouse (currently Azure Synapse Analytics) was announced. Synapse Analytics supports querying and manipulating JSON data. However, there is no out-of-the-box support in Synapse to return SQL query results as JSON.

This project was kick-started to create an endpoint to query and get JSON data from Synapse Analytics for a handful of in-house applications.

## Features

* Connection Credentials fetched from environment varibles during exeution avoiding plain-text storage
* Rich documentation available for the used libraries
* Easy to extend to convert to complex JSON structures

## API Reference

This app uses Tedious (node implementation of TDS protocol) to connect and query the Synapse Analytics. The official documentation can be found here: https://tediousjs.github.io/tedious/getting-started.html

## How to use?

When deployed to Azure (or running locally), an HTTP request triggers the app. The request may or may not have query variables to refine the query results. The app expects a `color` query parameter to filter the results.

## Local Setup Requirements

Following softwares and libraries should be installed on the local machine to run and test the app locally:

* [Node.js](https://nodejs.org/en/download/)
* [Tedious](https://www.npmjs.com/package/tedious)
* [.NET Core](https://dotnet.microsoft.com/download)
* [Visual Studio Code](https://code.visualstudio.com/download)
* Azure Functions extension for Visual Studio Code
* [Azure Functions Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Ccsharp%2Cbash#v2)

## Local Adjustments to Run the App

Adjust the connection details and credentials in `local.settings.json` to point and connect to a desired Synapse instance.

If script execution is disabled on your machine, you might encounter the following error during execution

![License](/images/script_error.png)

To resolve this issue, change the script [execution policy](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.1) to "Unrestricted". Run the following command in the PowerShell as admin

```bash
Set-ExecutionPolicy Unrestricted
```

![License](/images/script_policy_change.png)

Revert the execution policy

```bash
Set-ExecutionPolicy Restricted
```

A successful execution will show you the local URL 

![License](/images/success_run.png)

Refer to the Microsoft Docs for assistance: https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-node#run-the-function-locally

## Deploy to Azure

This app is a bare minimum working sample and can be deployed to Azure directly from the VS Code.

Refer to Microsoft Docs for step-by-step instructions: https://docs.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-node#sign-in-to-azure

## Further Reading

Read the relevant blog to get a better insight to certain coding decisions: https://dhyanintech.medium.com/a-node-function-app-to-get-json-results-from-azure-synapse-analytics-e671dd6ae827
