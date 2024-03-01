// const defaultGateway = require('default-gateway');
// const publicIp = require('public-ip');
const dns = require('dns');

/*
const { A, B } = defaultGateway.v4();
// gateway = '1.2.3.4', interface = 'en1'
console.log(A, B);

 const { C, D } =  defaultGateway.v6();
// gateway = '2001:db8::1', interface = 'en2'
console.log(C, D); 

const { E, F } = defaultGateway.v4.sync();
// gateway = '1.2.3.4', interface = 'en1'
console.log(E, F);

const { G, H } = defaultGateway.v6.sync();
// gateway = '2001:db8::1', interface = 'en2'
console.log(G, H); 



var guessGateway = function () {
	var network = os.networkInterfaces(),
		guess = '10.0.0.1';
  
	Object.keys(network).forEach(function(interfaces){
	  network[interfaces].forEach(function(interface){
		if(!interface.internal && interface.family === "IPv4") {
		  guess = interface.address.split('.');
		  guess[guess.length -1] = "1";
		  guess = guess.join('.');
		}
	  });
	})
  
	return guess;
  };
  console.log(guessGateway());


var findIP = new Promise(r => {
	var w = window,
		a = new (w.RTCPeerConnection || w.mozRTCPeerConnection || w.webkitRTCPeerConnection)({
			iceServers: []
		}),
		b = () => { };
	a.createDataChannel("");
	a.createOffer(c => a.setLocalDescription(c, b, b), b);
	a.onicecandidate = c => {
		try {
			c.candidate.candidate.match(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g).forEach(r)
		} catch (e) { }
	}
})


findIP.then(ip => document.write('your ip: ', ip)).catch(e => console.error(e))
findIP.then(ip => console.warn('your ip: ', ip)).catch(e => console.error(e))


dns.lookup(A,
(err, addresses, family) => {
   // Print the IP address of user
   console.log('IP Address : ', addresses);
   // Print the number of families found
   console.log('IP Family: ', family);
});*//*

const os = require('os');
console.log('IP Address: ', os.networkInterfaces())
// console.log('IP Address: ' + JSON.stringify(os.networkInterfaces()['Wi-Fi']).match(/"192.168.\d+.\d+"/g)[0])*/
/*

var xx = [
	{
		"entry": [
			{
				"fullUrl": "https://healthcare.googleapis.com/v1/projects/testanddeleteproject/locations/us-central1/datasets/DataSetFHIR1/fhirStores/DemoDataStore/fhir/Practitioner/56b975e5-ed12-4d40-81c4-473bacf23937",
				"resource": {
					"active": true,
					"address": [
						{
							"city": "TAUNTON",
							"country": "US",
							"line": [
								"58 TREMONT STREET"
							],
							"postalCode": "2780",
							"state": "MA"
						}
					],
					"gender": "male",
					"id": "56b975e5-ed12-4d40-81c4-473bacf23937",
					"identifier": [
						{
							"system": "http://hl7.org/fhir/sid/us-npi",
							"value": "93390"
						}
					],
					"meta": {
						"lastUpdated": "2022-07-15T12:37:19.525625+00:00",
						"versionId": "MTY1Nzg4ODYzOTUyNTYyNTAwMA"
					},
					"name": [
						{
							"family": "Bosco882",
							"given": [
								"Odis959"
							],
							"prefix": [
								"Dr."
							]
						}
					],
					"resourceType": "Practitioner"
				},
				"search": {
					"mode": "match"
				}
			},
			{
				"fullUrl": "https://healthcare.googleapis.com/v1/projects/testanddeleteproject/locations/us-central1/datasets/DataSetFHIR1/fhirStores/DemoDataStore/fhir/Practitioner/8fbd2807-9aca-4743-b887-24659586a66b",
				"resource": {
					"active": true,
					"address": [
						{
							"city": "FALL RIVER",
							"country": "US",
							"line": [
								"289 PLEASANT STREET"
							],
							"postalCode": "2721",
							"state": "MA"
						}
					],
					"gender": "female",
					"id": "8fbd2807-9aca-4743-b887-24659586a66b",
					"identifier": [
						{
							"system": "http://hl7.org/fhir/sid/us-npi",
							"value": "93180"
						}
					],
					"meta": {
						"lastUpdated": "2022-07-15T12:37:19.523336+00:00",
						"versionId": "MTY1Nzg4ODYzOTUyMzMzNjAwMA"
					},
					"name": [
						{
							"family": "Armijo730",
							"given": [
								"Catalina187"
							],
							"prefix": [
								"Dr."
							]
						}
					],
					"resourceType": "Practitioner"
				},
				"search": {
					"mode": "match"
				}
			},
			{
				"fullUrl": "https://healthcare.googleapis.com/v1/projects/testanddeleteproject/locations/us-central1/datasets/DataSetFHIR1/fhirStores/DemoDataStore/fhir/Practitioner/2d376f71-dd1e-4f66-93b9-55040c05e2b0",
				"resource": {
					"active": true,
					"address": [
						{
							"city": "CAMBRIDGE",
							"country": "US",
							"line": [
								"1493 CAMBRIDGE STREET"
							],
							"postalCode": "02138",
							"state": "MA"
						}
					],
					"gender": "male",
					"id": "2d376f71-dd1e-4f66-93b9-55040c05e2b0",
					"identifier": [
						{
							"system": "http://hl7.org/fhir/sid/us-npi",
							"value": "40"
						}
					],
					"meta": {
						"lastUpdated": "2022-07-15T12:37:19.520848+00:00",
						"versionId": "MTY1Nzg4ODYzOTUyMDg0ODAwMA"
					},
					"name": [
						{
							"family": "Fay398",
							"given": [
								"Loren192"
							],
							"prefix": [
								"Dr."
							]
						}
					],
					"resourceType": "Practitioner"
				},
				"search": {
					"mode": "match"
				}
			},
			{
				"fullUrl": "https://healthcare.googleapis.com/v1/projects/testanddeleteproject/locations/us-central1/datasets/DataSetFHIR1/fhirStores/DemoDataStore/fhir/Practitioner/df608486-cb7a-4550-a6d9-15a299207238",
				"resource": {
					"active": true,
					"address": [
						{
							"city": "BOSTON",
							"country": "US",
							"line": [
								"330 BROOKLINE AVENUE"
							],
							"postalCode": "02215",
							"state": "MA"
						}
					],
					"gender": "female",
					"id": "df608486-cb7a-4550-a6d9-15a299207238",
					"identifier": [
						{
							"system": "http://hl7.org/fhir/sid/us-npi",
							"value": "360"
						}
					],
					"meta": {
						"lastUpdated": "2022-07-15T12:37:19.520023+00:00",
						"versionId": "MTY1Nzg4ODYzOTUyMDAyMzAwMA"
					},
					"name": [
						{
							"family": "Bauch723",
							"given": [
								"Macie339"
							],
							"prefix": [
								"Dr."
							]
						}
					],
					"resourceType": "Practitioner"
				},
				"search": {
					"mode": "match"
				}
			},
			{
				"fullUrl": "https://healthcare.googleapis.com/v1/projects/testanddeleteproject/locations/us-central1/datasets/DataSetFHIR1/fhirStores/DemoDataStore/fhir/Practitioner/5ff93dd3-d574-4acf-86c7-dfdbb391c7be",
				"resource": {
					"active": true,
					"address": [
						{
							"city": "FALL RIVER",
							"country": "US",
							"line": [
								"363 HIGHLAND AVENUE"
							],
							"postalCode": "02720",
							"state": "MA"
						}
					],
					"gender": "male",
					"id": "5ff93dd3-d574-4acf-86c7-dfdbb391c7be",
					"identifier": [
						{
							"system": "http://hl7.org/fhir/sid/us-npi",
							"value": "300"
						}
					],
					"meta": {
						"lastUpdated": "2022-07-15T12:37:19.519246+00:00",
						"versionId": "MTY1Nzg4ODYzOTUxOTI0NjAwMA"
					},
					"name": [
						{
							"family": "Hettinger594",
							"given": [
								"Miquel905"
							],
							"prefix": [
								"Dr."
							]
						}
					],
					"resourceType": "Practitioner"
				},
				"search": {
					"mode": "match"
				}
			},
			{
				"fullUrl": "https://healthcare.googleapis.com/v1/projects/testanddeleteproject/locations/us-central1/datasets/DataSetFHIR1/fhirStores/DemoDataStore/fhir/Practitioner/547423e6-c918-4457-9691-8c5e9d15383b",
				"resource": {
					"active": true,
					"address": [
						{
							"city": "BOSTON",
							"country": "US",
							"line": [
								"55 FRUIT STREET"
							],
							"postalCode": "02114",
							"state": "MA"
						}
					],
					"gender": "female",
					"id": "547423e6-c918-4457-9691-8c5e9d15383b",
					"identifier": [
						{
							"system": "http://hl7.org/fhir/sid/us-npi",
							"value": "280"
						}
					],
					"meta": {
						"lastUpdated": "2022-07-15T12:37:19.518647+00:00",
						"versionId": "MTY1Nzg4ODYzOTUxODY0NzAwMA"
					},
					"name": [
						{
							"family": "Weimann465",
							"given": [
								"Carol737"
							],
							"prefix": [
								"Dr."
							]
						}
					],
					"resourceType": "Practitioner"
				},
				"search": {
					"mode": "match"
				}
			},
			{
				"fullUrl": "https://healthcare.googleapis.com/v1/projects/testanddeleteproject/locations/us-central1/datasets/DataSetFHIR1/fhirStores/DemoDataStore/fhir/Practitioner/6343cb52-42b9-4128-867f-ff68b169411e",
				"resource": {
					"active": true,
					"address": [
						{
							"city": "BRIGHTON",
							"country": "US",
							"line": [
								"30 WARREN STREET"
							],
							"postalCode": "02135",
							"state": "MA"
						}
					],
					"gender": "male",
					"id": "6343cb52-42b9-4128-867f-ff68b169411e",
					"identifier": [
						{
							"system": "http://hl7.org/fhir/sid/us-npi",
							"value": "590"
						}
					],
					"meta": {
						"lastUpdated": "2022-07-15T12:37:19.516584+00:00",
						"versionId": "MTY1Nzg4ODYzOTUxNjU4NDAwMA"
					},
					"name": [
						{
							"family": "Deckow585",
							"given": [
								"Waldo53"
							],
							"prefix": [
								"Dr."
							]
						}
					],
					"resourceType": "Practitioner"
				},
				"search": {
					"mode": "match"
				}
			},
			{
				"fullUrl": "https://healthcare.googleapis.com/v1/projects/testanddeleteproject/locations/us-central1/datasets/DataSetFHIR1/fhirStores/DemoDataStore/fhir/Practitioner/dfa9a01d-5c92-464e-9d3b-58843cbef930",
				"resource": {
					"active": true,
					"address": [
						{
							"city": "TAUNTON",
							"country": "US",
							"line": [
								"88 WASHINGTON STREET"
							],
							"postalCode": "02780",
							"state": "MA"
						}
					],
					"gender": "male",
					"id": "dfa9a01d-5c92-464e-9d3b-58843cbef930",
					"identifier": [
						{
							"system": "http://hl7.org/fhir/sid/us-npi",
							"value": "290"
						}
					],
					"meta": {
						"lastUpdated": "2022-07-15T12:37:19.516558+00:00",
						"versionId": "MTY1Nzg4ODYzOTUxNjU1ODAwMA"
					},
					"name": [
						{
							"family": "Schroeder447",
							"given": [
								"Jonah176"
							],
							"prefix": [
								"Dr."
							]
						}
					],
					"resourceType": "Practitioner"
				},
				"search": {
					"mode": "match"
				}
			},
			{
				"fullUrl": "https://healthcare.googleapis.com/v1/projects/testanddeleteproject/locations/us-central1/datasets/DataSetFHIR1/fhirStores/DemoDataStore/fhir/Practitioner/a23de35c-9101-4689-b0b0-e98e6258779e",
				"resource": {
					"active": true,
					"address": [
						{
							"city": "MELROSE",
							"country": "US",
							"line": [
								"585 LEBANON STREET"
							],
							"postalCode": "02176",
							"state": "MA"
						}
					],
					"gender": "male",
					"id": "a23de35c-9101-4689-b0b0-e98e6258779e",
					"identifier": [
						{
							"system": "http://hl7.org/fhir/sid/us-npi",
							"value": "270"
						}
					],
					"meta": {
						"lastUpdated": "2022-07-15T12:37:19.514446+00:00",
						"versionId": "MTY1Nzg4ODYzOTUxNDQ0NjAwMA"
					},
					"name": [
						{
							"family": "Jacobi462",
							"given": [
								"Lane844"
							],
							"prefix": [
								"Dr."
							]
						}
					],
					"resourceType": "Practitioner"
				},
				"search": {
					"mode": "match"
				}
			},
			{
				"fullUrl": "https://healthcare.googleapis.com/v1/projects/testanddeleteproject/locations/us-central1/datasets/DataSetFHIR1/fhirStores/DemoDataStore/fhir/Practitioner/55902b8b-9a34-4874-a613-16371ae6ec74",
				"resource": {
					"active": true,
					"address": [
						{
							"city": "SPRINGFIELD",
							"country": "US",
							"line": [
								"271 CAREW STREET"
							],
							"postalCode": "01104",
							"state": "MA"
						}
					],
					"gender": "female",
					"id": "55902b8b-9a34-4874-a613-16371ae6ec74",
					"identifier": [
						{
							"system": "http://hl7.org/fhir/sid/us-npi",
							"value": "260"
						}
					],
					"meta": {
						"lastUpdated": "2022-07-15T12:37:19.513027+00:00",
						"versionId": "MTY1Nzg4ODYzOTUxMzAyNzAwMA"
					},
					"name": [
						{
							"family": "Bradtke547",
							"given": [
								"Peggie783"
							],
							"prefix": [
								"Dr."
							]
						}
					],
					"resourceType": "Practitioner"
				},
				"search": {
					"mode": "match"
				}
			}
		],
		"link": [
			{
				"relation": "search",
				"url": "https://healthcare.googleapis.com/v1/projects/testanddeleteproject/locations/us-central1/datasets/DataSetFHIR1/fhirStores/DemoDataStore/fhir/Practitioner/?_count=10"
			},
			{
				"relation": "next",
				"url": "https://healthcare.googleapis.com/v1/projects/testanddeleteproject/locations/us-central1/datasets/DataSetFHIR1/fhirStores/DemoDataStore/fhir/Practitioner/?_count=10&_page_token=Cjj3YtFff%2F%2F%2F%2F%2F%2BABePXR29xwwD%2FAf%2F%2BNjE3YjQ3YWEyMGE1YjMxZDc5ZGFhNmY3YWY4YWYxMDUAARAKIfp7n2jesxm7OQAAAACAoC6dSApQAFoLCdvlax5COpl4EANg%2FJLukAZoAQ%3D%3D"
			},
			{
				"relation": "first",
				"url": "https://healthcare.googleapis.com/v1/projects/testanddeleteproject/locations/us-central1/datasets/DataSetFHIR1/fhirStores/DemoDataStore/fhir/Practitioner/?_count=10"
			},
			{
				"relation": "self",
				"url": "https://healthcare.googleapis.com/v1/projects/testanddeleteproject/locations/us-central1/datasets/DataSetFHIR1/fhirStores/DemoDataStore/fhir/Practitioner/?_count=10"
			}
		],
		"resourceType": "Bundle",
		"total": 15,
		"type": "searchset"
	},
	{
		"resourceType": "Bundle",
		"id": "49da53d6-7123-4631-a306-b1dc68fa5906",
		"meta": {
			"lastUpdated": "2022-07-23T11:33:57.964+00:00"
		},
		"type": "searchset",
		"total": 95,
		"link": [
			{
				"relation": "self",
				"url": "https://fhir.lab.safetylabs.org/R4/Practitioner?_count=9"
			},
			{
				"relation": "next",
				"url": "https://fhir.lab.safetylabs.org/R4?_getpages=49da53d6-7123-4631-a306-b1dc68fa5906&_getpagesoffset=9&_count=9&_pretty=true&_bundletype=searchset"
			}
		],
		"entry": [
			{
				"fullUrl": "https://fhir.lab.safetylabs.org/R4/Practitioner/55",
				"resource": {
					"resourceType": "Practitioner",
					"id": "55",
					"meta": {
						"versionId": "2",
						"lastUpdated": "2019-12-04T12:52:18.000+00:00"
					},
					"identifier": [
						{
							"use": "official",
							"type": {
								"coding": [
									{
										"system": "http://hl7.org/fhir/v2/0203",
										"code": "MR",
										"display": "Medical Record Number"
									}
								],
								"text": "Medical Record Number"
							},
							"system": "http://hospital.smarthealthit.org",
							"value": "Sunil",
							"assigner": {
								"reference": "Organization/53"
							}
						}
					],
					"active": true,
					"name": [
						{
							"use": "official",
							"family": "Smith",
							"given": [
								"Tara"
							]
						}
					],
					"telecom": [
						{
							"system": "email",
							"value": "sunil.kumar@safetylabs.org"
						},
						{
							"system": "phone",
							"value": "919718408946"
						}
					],
					"gender": "male",
					"birthDate": "1985-04-10",
					"photo": [
						{
							"contentType": "mime",
							"url": "https://content.lab.safetylabs.org/lab/photo/USER/5/5.jpg"
						}
					]
				},
				"search": {
					"mode": "match"
				},
				"response": {
					"status": "200 OK",
					"etag": "W/\"2\""
				}
			},
			{
				"fullUrl": "https://fhir.lab.safetylabs.org/R4/Practitioner/502",
				"resource": {
					"resourceType": "Practitioner",
					"id": "502",
					"meta": {
						"versionId": "5",
						"lastUpdated": "2019-10-16T09:15:26.000+00:00"
					},
					"identifier": [
						{
							"use": "official",
							"type": {
								"coding": [
									{
										"system": "http://hl7.org/fhir/v2/0203",
										"code": "MR",
										"display": "Medical Record Number"
									}
								],
								"text": "Medical Record Number"
							},
							"system": "http://hospital.smarthealthit.org",
							"value": "Allen",
							"assigner": {
								"reference": "Organization/53"
							}
						}
					],
					"active": true,
					"name": [
						{
							"use": "official",
							"family": "Hall",
							"given": [
								"Jarred"
							]
						}
					],
					"telecom": [
						{
							"system": "email",
							"value": "allen.bishop@safetylabs.org"
						},
						{
							"system": "phone",
							"value": "16132036163"
						}
					],
					"gender": "male",
					"birthDate": "1971-03-16",
					"photo": [
						{
							"contentType": "mime",
							"url": "https://content.lab.safetylabs.org/lab/photo/USER/14/14.JPG"
						}
					]
				},
				"search": {
					"mode": "match"
				},
				"response": {
					"status": "200 OK",
					"etag": "W/\"5\""
				}
			},
			{
				"fullUrl": "https://fhir.lab.safetylabs.org/R4/Practitioner/1718",
				"resource": {
					"resourceType": "Practitioner",
					"id": "1718",
					"meta": {
						"versionId": "3",
						"lastUpdated": "2019-10-16T09:23:25.000+00:00"
					},
					"identifier": [
						{
							"use": "official",
							"type": {
								"coding": [
									{
										"system": "http://hl7.org/fhir/v2/0203",
										"code": "MR",
										"display": "Medical Record Number"
									}
								],
								"text": "Medical Record Number"
							},
							"system": "http://hospital.smarthealthit.org",
							"value": "Sandeep ",
							"assigner": {
								"reference": "Organization/53"
							}
						}
					],
					"active": true,
					"name": [
						{
							"use": "official",
							"family": "Ellison",
							"given": [
								"Allison"
							]
						}
					],
					"telecom": [
						{
							"system": "email",
							"value": "sandeep.verma@safetylabs.org"
						},
						{
							"system": "phone",
							"value": "18965985626"
						}
					],
					"gender": "male",
					"birthDate": "1980-04-16",
					"photo": [
						{
							"contentType": "mime",
							"url": "https://content.lab.safetylabs.org/lab/photo/USER/33/33.jpg"
						}
					]
				},
				"search": {
					"mode": "match"
				},
				"response": {
					"status": "200 OK",
					"etag": "W/\"3\""
				}
			},
			{
				"fullUrl": "https://fhir.lab.safetylabs.org/R4/Practitioner/1734",
				"resource": {
					"resourceType": "Practitioner",
					"id": "1734",
					"meta": {
						"versionId": "1",
						"lastUpdated": "2019-04-24T14:01:00.000+00:00"
					},
					"identifier": [
						{
							"use": "official",
							"type": {
								"coding": [
									{
										"system": "http://hl7.org/fhir/v2/0203",
										"code": "MR",
										"display": "Medical Record Number"
									}
								],
								"text": "Medical Record Number"
							},
							"system": "http://hospital.smarthealthit.org",
							"value": "Pooja",
							"assigner": {
								"reference": "Organization/53"
							}
						}
					],
					"active": true,
					"name": [
						{
							"use": "official",
							"family": "Mahur",
							"given": [
								"Pooja"
							]
						}
					],
					"telecom": [
						{
							"system": "email",
							"value": "pooja.mahur@safetylabs.org"
						},
						{
							"system": "phone",
							"value": "918058081417"
						}
					],
					"gender": "female",
					"birthDate": "1991-04-09"
				},
				"search": {
					"mode": "match"
				},
				"response": {
					"status": "201 Created",
					"etag": "W/\"1\""
				}
			},
			{
				"fullUrl": "https://fhir.lab.safetylabs.org/R4/Practitioner/4696",
				"resource": {
					"resourceType": "Practitioner",
					"id": "4696",
					"meta": {
						"versionId": "1",
						"lastUpdated": "2019-07-12T07:32:29.000+00:00"
					},
					"identifier": [
						{
							"use": "official",
							"type": {
								"coding": [
									{
										"system": "http://hl7.org/fhir/v2/0203",
										"code": "MR",
										"display": "Medical Record Number"
									}
								],
								"text": "Medical Record Number"
							},
							"system": "http://hospital.smarthealthit.org",
							"value": "Sanjay",
							"assigner": {
								"reference": "Organization/53"
							}
						}
					],
					"active": true,
					"name": [
						{
							"use": "official",
							"family": "Chadha",
							"given": [
								"Sanjay"
							]
						}
					],
					"telecom": [
						{
							"system": "email",
							"value": "sanjay.chadha@safetylabs.org"
						},
						{
							"system": "phone",
							"value": "19565232255"
						}
					],
					"gender": "male",
					"birthDate": "1973-06-13",
					"photo": [
						{
							"contentType": "mime",
							"url": "https://content.lab.safetylabs.org/lab/photo/USER/67/67.png"
						}
					]
				},
				"search": {
					"mode": "match"
				},
				"response": {
					"status": "201 Created",
					"etag": "W/\"1\""
				}
			},
			{
				"fullUrl": "https://fhir.lab.safetylabs.org/R4/Practitioner/4768",
				"resource": {
					"resourceType": "Practitioner",
					"id": "4768",
					"meta": {
						"versionId": "1",
						"lastUpdated": "2019-07-15T11:21:21.000+00:00"
					},
					"identifier": [
						{
							"use": "official",
							"type": {
								"coding": [
									{
										"system": "http://hl7.org/fhir/v2/0203",
										"code": "MR",
										"display": "Medical Record Number"
									}
								],
								"text": "Medical Record Number"
							},
							"system": "http://hospital.smarthealthit.org",
							"value": "Test",
							"assigner": {
								"reference": "Organization/53"
							}
						}
					],
					"active": true,
					"name": [
						{
							"use": "official",
							"family": "Test",
							"given": [
								"Test"
							]
						}
					],
					"telecom": [
						{
							"system": "email",
							"value": "test@gmail.com"
						},
						{
							"system": "phone",
							"value": "19856985689"
						}
					],
					"gender": "male",
					"birthDate": "1976-07-28",
					"photo": [
						{
							"contentType": "mime",
							"url": "https://content.lab.safetylabs.org/lab/photo/USER/68/68.jpg"
						}
					]
				},
				"search": {
					"mode": "match"
				},
				"response": {
					"status": "201 Created",
					"etag": "W/\"1\""
				}
			},
			{
				"fullUrl": "https://fhir.lab.safetylabs.org/R4/Practitioner/5458",
				"resource": {
					"resourceType": "Practitioner",
					"id": "5458",
					"meta": {
						"versionId": "1",
						"lastUpdated": "2019-08-08T13:32:15.000+00:00"
					},
					"identifier": [
						{
							"use": "official",
							"type": {
								"coding": [
									{
										"system": "http://hl7.org/fhir/v2/0203",
										"code": "MR",
										"display": "Medical Record Number"
									}
								],
								"text": "Medical Record Number"
							},
							"system": "http://hospital.smarthealthit.org",
							"value": "Test",
							"assigner": {
								"reference": "Organization/5442"
							}
						}
					],
					"active": true,
					"name": [
						{
							"use": "official",
							"family": "Practitioner",
							"given": [
								"Test"
							]
						}
					],
					"telecom": [
						{
							"system": "email",
							"value": "lab.patient10@safetylabs.org"
						},
						{
							"system": "phone",
							"value": "18958956589"
						}
					],
					"gender": "male",
					"birthDate": "1979-05-16"
				},
				"search": {
					"mode": "match"
				},
				"response": {
					"status": "201 Created",
					"etag": "W/\"1\""
				}
			},
			{
				"fullUrl": "https://fhir.lab.safetylabs.org/R4/Practitioner/null",
				"resource": {
					"resourceType": "Practitioner",
					"id": "null",
					"meta": {
						"versionId": "1",
						"lastUpdated": "2020-01-03T08:08:21.000+00:00"
					}
				},
				"search": {
					"mode": "match"
				},
				"response": {
					"status": "201 Created",
					"etag": "W/\"1\""
				}
			},
			{
				"fullUrl": "https://fhir.lab.safetylabs.org/R4/Practitioner/7653",
				"resource": {
					"resourceType": "Practitioner",
					"id": "7653",
					"meta": {
						"versionId": "1",
						"lastUpdated": "2020-02-28T06:22:42.000+00:00"
					},
					"identifier": [
						{
							"use": "official",
							"type": {
								"coding": [
									{
										"system": "http://hl7.org/fhir/v2/0203",
										"code": "MR",
										"display": "Medical Record Number"
									}
								],
								"text": "Medical Record Number"
							},
							"system": "http://hospital.smarthealthit.org",
							"value": "Frank",
							"assigner": {
								"reference": "Organization/53"
							}
						}
					],
					"active": true,
					"name": [
						{
							"use": "official",
							"family": "Lotus",
							"given": [
								"Frank"
							]
						}
					],
					"telecom": [
						{
							"system": "email",
							"value": "trial.admin@safetylabs.org"
						},
						{
							"system": "phone",
							"value": "17802428465"
						}
					],
					"gender": "male",
					"birthDate": "1999-01-05"
				},
				"search": {
					"mode": "match"
				},
				"response": {
					"status": "201 Created",
					"etag": "W/\"1\""
				}
			}
		]
	}
]
if (xx[0])
	console.log(xx[0].entry.length);
if (xx[1])
	console.log(xx[1].entry.length);*/


	const moment = require('moment')
var x = 14;

console.log(moment());
console.log(moment().subtract(x, 'days'));
console.log(moment().subtract(x, 'days').format("YYYY-MM-DDTHH:mm"));


const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})