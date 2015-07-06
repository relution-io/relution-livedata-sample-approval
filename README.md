- http://yourIP/mway/approval-sample/refresh need first for import or get live channel
- http://yourIP/mway/approval-sample/approvals/info live channel
- http://yourIP/mway/approval-sample/approvals GET all approvals
- http://yourIP/mway/approval-sample/approvals/srm-E7D110-000000743803 GET approval by id
- http://yourIP/mway/approval-sample/approvals/srm-E7D110-000000743803 PATCH approval by id


###Postman collection

````
{
	"id": "c5c90a87-a66c-0d4d-f2df-597a113d2ed4",
	"name": "Approval-sample",
	"description": "",
	"order": [
		"1bd686d6-7b9c-ea20-7bc1-3357fb6e2b63",
		"f727fbc9-6a5c-20cd-4359-4f44b9bf1fe0",
		"b1712ed4-47e9-a900-b1c8-426ed02dd39c",
		"39521536-f0f9-a6d3-a2f5-312b0f4f3b79"
	],
	"folders": [],
	"timestamp": 1435568565311,
	"synced": false,
	"owner": "",
	"subscribed": false,
	"remoteLink": "",
	"public": false,
	"write": true,
	"requests": [
		{
			"id": "1bd686d6-7b9c-ea20-7bc1-3357fb6e2b63",
			"headers": "Content-Type: application/json\nAccept: application/json\nAuthorization: Basic cGFzY2FsOmhhbGxvMTIzNA==\n",
			"url": "{{url}}:{{port}}/mway/approval-sample/approvals/sample-C-ac5b1e69-63af-4945-9744-9b3f7c078caf",
			"pathVariables": {},
			"preRequestScript": "",
			"method": "GET",
			"collectionId": "c5c90a87-a66c-0d4d-f2df-597a113d2ed4",
			"data": [],
			"dataMode": "params",
			"name": "GET/id",
			"description": "",
			"descriptionFormat": "html",
			"time": 1435568565310,
			"version": 2,
			"responses": [],
			"tests": "",
			"currentHelper": "basicAuth",
			"helperAttributes": {
				"username": "pascal",
				"password": "hallo1234",
				"id": "basic",
				"timestamp": 1434450802528
			},
			"synced": false
		},
		{
			"id": "39521536-f0f9-a6d3-a2f5-312b0f4f3b79",
			"headers": "Content-Type: application/json\nAccept: application/json\nAuthorization: Basic cGFzY2FsOmhhbGxvMTIzNA==\n",
			"url": "{{url}}:{{port}}/mway/approval-sample/approvals/refresh",
			"pathVariables": {},
			"preRequestScript": "",
			"method": "POST",
			"collectionId": "c5c90a87-a66c-0d4d-f2df-597a113d2ed4",
			"data": [],
			"dataMode": "raw",
			"name": "Refresh import",
			"description": "",
			"descriptionFormat": "html",
			"time": 1435568661165,
			"version": 2,
			"responses": [],
			"tests": "",
			"currentHelper": "basicAuth",
			"helperAttributes": {
				"username": "pascal",
				"password": "hallo1234",
				"id": "basic",
				"timestamp": 1434450802528
			},
			"collectionOwner": 0,
			"synced": false,
			"rawModeData": "{\n    \"approver\": {\n        \"id\": \"1c341954-e83c-4dd8-a5e7-e958806a36fc\"\n    },\n    \"requester\": {\n        \"id\": \"1c341954-e83c-4dd8-a5e7-e958806a36fc\"\n    },\n    \"aclEntries\": [\n        \"1c341954-e83c-4dd8-a5e7-e958806a36fc:rw\"\n    ],\n    \"provider\": \"sample\",\n    \"header\": {\n        \"typeOfMail\": \"approve_or_reject\"\n    },\n    \"id\": \"sample-E-ac5b1e69-63af-4945-9744-9b3f7c078caf\",\n    \"state\": \"approved\",\n    \"items\": [\n        {\n            \"priceUnit\": \"€\",\n            \"shipToAddress\": {},\n            \"quantity\": \"5\",\n            \"description\": \"Iphone 6\",\n            \"itemId\": \"9\",\n            \"price\": \"600\",\n            \"deliveryDate\": 1427897969807\n        },\n        {\n            \"priceUnit\": \"€\",\n            \"shipToAddress\": {},\n            \"quantity\": \"5\",\n            \"description\": \"Iphone 6+\",\n            \"itemId\": \"11\",\n            \"price\": \"750\",\n            \"deliveryDate\": 1422800369807\n        }\n    ]\n}"
		},
		{
			"id": "b1712ed4-47e9-a900-b1c8-426ed02dd39c",
			"headers": "Content-Type: application/json\nAccept: application/json\nAuthorization: Basic cGFzY2FsOmhhbGxvMTIzNA==\n",
			"url": "{{url}}:{{port}}/mway/approval-sample/approvals",
			"pathVariables": {},
			"preRequestScript": "",
			"method": "GET",
			"collectionId": "c5c90a87-a66c-0d4d-f2df-597a113d2ed4",
			"data": [],
			"dataMode": "params",
			"name": "GET/all",
			"description": "",
			"descriptionFormat": "html",
			"time": 1435568628393,
			"version": 2,
			"responses": [],
			"tests": "",
			"currentHelper": "basicAuth",
			"helperAttributes": {
				"username": "pascal",
				"password": "hallo1234",
				"id": "basic",
				"timestamp": 1434450802528
			},
			"collectionOwner": 0,
			"synced": false
		},
		{
			"id": "f727fbc9-6a5c-20cd-4359-4f44b9bf1fe0",
			"headers": "Content-Type: application/json\nAccept: application/json\nAuthorization: Basic cGFzY2FsOmhhbGxvMTIzNA==\n",
			"url": "{{url}}:{{port}}/mway/approval-sample/approvals/sample-C-ac5b1e69-63af-4945-9744-9b3f7c078caf",
			"pathVariables": {},
			"preRequestScript": "",
			"method": "PATCH",
			"collectionId": "c5c90a87-a66c-0d4d-f2df-597a113d2ed4",
			"data": [],
			"dataMode": "raw",
			"name": "PATCH/ID",
			"description": "",
			"descriptionFormat": "html",
			"time": 1435568603044,
			"version": 2,
			"responses": [],
			"tests": "",
			"currentHelper": "normal",
			"helperAttributes": {},
			"collectionOwner": 0,
			"synced": false,
			"rawModeData": "{\n    \"state\": \"approved\",\n    \"comment\": \"Lorem blubber\"\n}"
		}
	]
}
````
