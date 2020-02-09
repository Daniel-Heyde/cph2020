import json
import decimal
import boto3
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError

BAD_REQUEST = 400
SUCCEEDED = 200

dynamo = boto3.resource('dynamodb')


# Handles request passed in through API gateway
def handler(event, context):
    method = event['httpMethod']
    if method == 'GET':
        return handle_get(event)
    elif method == 'POST':
        return handle_cors(event)
    elif method == 'OPTIONS':
        return handle_cors(event)


# Returns options header with access control allowed for the client for cors preflight requests
def handle_cors(event):
    return response(SUCCEEDED, 'CORS PREFLIGHT', event['Origin'])


# Returns data or a visualization based on the query string
def handle_get(event):
    request = event["queryStringParameters"]
    table_name = "Trivia"
    table = dynamo.Table(table_name)
    body = get_items(request, table)

    return response(SUCCEEDED, body)

# Queries dynamodb for specified time or geographic data and returns a json object with matching items
def get_items(request, table):
    try:
        return table.query(
            KeyConditionExpression=Key('Type-SetNum').eq(request['type'] + "-" + str(request['set-num'])))
    except ClientError as e:
        print(e.response['Error']['Message'])



# Wraps response to match api gateway's expected format for a lambda proxy
def response(status, body, origin='*'):
    return {
        "isBase64Encoded": "false",
        "statusCode": status,
        "headers": {'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'GET, POST'},
        "body": json.dumps(body, default=convert_decimal_to_float)
    }


# Changes decimal objects to floats for string to json conversion
def convert_decimal_to_float(obj):
    if isinstance(obj, decimal.Decimal):
        return float(obj)
    raise TypeError
