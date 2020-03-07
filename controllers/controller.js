'use strict';

const dialogflow = require('dialogflow');
const uuid = require('uuid');

exports.get_request = function (req, res) {
    res.send('GET Request. Google Dialogflow REST API middleware');
    console.log('GET Request. Google Dialogflow REST API middleware');
}


/** 
 * For V2 webhook response format please ref. https://dialogflow.com/docs/reference/v1-v2-migration-guide-fulfillment#webhook_responses
 */
exports.dialogflow_rest_api_request = function () {
    try{
        //runSample('gdfrestapi');
        //authentication();
        let projectId = "gdfrestapi";
        let sessionId = uuid.v4();
        let query = "hello";
        let languageCode= 'en-US';
        detectTextIntent(projectId, sessionId, query, languageCode)
    }
    catch(e){
        console.log(e);
    } 
}

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used. Ref. step 4 JSON file to get project id. 
 *                 Also please note if you select some other project id while creating the Dialogflow agent then it wont work.
 */
async function runSample(projectId = 'gdfrestapi') {
    // A unique identifier for the given session
    const sessionId = uuid.v4();
    console.log(`runSample()>  sessionId: ${sessionId}`);
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    try{
        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: 'hello',
                // The language used by the client (en-US)
                languageCode: 'en-US',
            },
            },
        };
    
        // Send request and log result
        const responses = await sessionClient.detectIntent(request);
        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);
        if (result.intent) {
            console.log(`  Intent: ${result.intent.displayName}`);
        } else {
            console.log(`  No intent matched.`);
        }
    }
    catch(e){
        console.log(e);
    }
    
  }

async function authentication(){
    // Imports the Google Cloud client library.
    const {Storage} = require('@google-cloud/storage');

    // Instantiates a client. If you don't specify credentials when constructing
    // the client, the client library will look for credentials in the
    // environment.
    const storage = new Storage();

    try {
    // Makes an authenticated API request.
    const results = await storage.getBuckets();

    const [buckets] = results;

    console.log('Buckets:');
    buckets.forEach(bucket => {
        console.log(bucket.name);
    });
    } catch (err) {
    console.error('ERROR:', err);
    }
}

function detectTextIntent(projectId, sessionId, query, languageCode) {

//https://dialogflow.com/docs/agents#settings

let privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCTNfx/16hTPWqk\nnvLCPO9KmcJAtaaJaAUoPdZLeBWx3OmSRgdSahaJOa8+F9+Ig81Pr4Fwi0i3cMVB\n67HeKUctywkVNIlABYRHrDP76ytRbyB9hrhV+FX8fF+HVPIJbS3H4FRKp1pFvG/f\nv2itYTyE+VQQ6rYs0/f5Hq2ByeiEpz18mu2iK+s6z+1QpQ2Tl+by71ACw3gjQ/PW\nA4P2UMevJkYZTwE582vZVW/rgbtI7y/C5XTDbCEpBP8TF3fnuXFogTErE778KGpH\nj5Xt6A2uiYz3TIAYImeMnfDorShQRnNhtqYAdE646bsWFgDy720igPkRiTXmfcVo\nki6uEy5VAgMBAAECggEAHPByfGFVVlPPCKC0oWmgMv6qGNV88SsxRFlvrLNlNGt0\nwUwh+VogpwZfhGnmCCy86krau9ityV4ScSSX+VANDZwJ45DJ4HuVJw/bwkzXXbFm\nZjbbOw9QPAvpLa4NzLuZUd8wQuLGVMo4BfjXZ6ojXxKyq4awnHxpFaCpxEeAfb8k\nZTpsFAIocnj/JWyK1A+eKndLGHGDF2HZA1LJvELAp78sR2sxFbJNKgFkJQFFloNO\nE6GID2PeCAFWrug5CgBk1dZ52A9UaE0F3Zai4vyYKTf0sEMlTV6KmfADOEF6fDEM\nfp5Gqr04lXhejCq7BvnWQXKypFx2ggrX8NHxMmSCGwKBgQDLx7f0oEN9JIXBnROg\n55qG323XBNbcz66TnfVaGGK+2YiVIB2pEECoEU7VKWOCqgAVHDXZ6U/VmJBymsbS\nkomiuZC7PfANxuoSWQkco7RhCpBC1XHqIguO89/OzvJdJKP3P2GZ8XfUr/E6ifPj\nCeS4WwSDmPyPRTb2AmlGOb/pqwKBgQC47z1WSlIhohlMEmVMHLcop/K+E5Swh8Ef\nYOcghFWj7DjRnl2nvveCVQjqnAStC6/LmRzCTmIrwRxH31/lvPYMI0i7Lw5SgM/c\nYq1zNQKuV9kZ9k0gljAfLTjKN+sz+S7iodM6b4njQ8csb3RtD1MmIlMTt6fYmpfa\nEPKw/VFH/wKBgAkYT9iGMpzqPWIHzbF3xMjSPgfDuoc+aa9C9Ilh3z5fXR4ywcAi\n7o/Rve/7mepiBgDrMmgYZqzE02WaDNenHKd7mr8Qo58pypapDKQPlmRiYU/qUNw/\nSr7Fma6UQ/LuSLcnSAbj5RJEDAMt1wnCDkhAH7Jz6InIcAyIzQQKXctjAoGAOJsi\nDzOYiCrxy1MmJnHzrkIaDww3SwGCn3Qtyso23IIFskPjLuFJKV+V5xnyZHVbTdqD\n7wXHDtWBLo6078EzHuv96y2wGJjNBww9QzJKq8q/7S5y1TKjcCeLZnpPSA1RyJT3\n7r8NWb75TCShYnB6ZwXCoBprCeXn7Rua7YncQ0kCgYBZxMm/iKn2gBMZc4XwYogy\nceu81hFWicHpDTqXmKHeRTbxUNEq/HuYC6mSVrDCdzD8335Ypr1UIv2xfaBQLwTY\njPRyYek/aBZr6Z9nxEy75kxG3iVar61sxCTurgEa3i5O7865uorrneAkIloIW7TD\no7lPzBJDozZKJ8Wlx5eb6g==\n-----END PRIVATE KEY-----\n";

// as per goolgle json
let clientEmail = "serviceacntforgdfrestapi@gdfrestapi.iam.gserviceaccount.com";
let config = {
  credentials: {
    private_key: privateKey,
    client_email: clientEmail
  }
}
const sessionClient = new dialogflow.SessionsClient(config);

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// The text query request.
const request = {
  session: sessionPath,
  queryInput: {
    text: {
      text: query,
      languageCode: languageCode,
    },
  },
};

// Send request and log result
sessionClient
  .detectIntent(request)
  .then(responses => {
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
}