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
exports.detectTextIntent  = function () {
    try{

        let projectId = "gdfrestapi";
        let sessionId = uuid.v4();
        let query = "hello";
        let languageCode= 'en-US';
        //Uncomment the method you want test with
        //detectTextIntent1(projectId);
        detectTextIntent2(projectId, sessionId, query, languageCode)
    }
    catch(e){
        console.log(e);
    } 
}

/**
 * Note: In this method Dialogflow API will environment variable "GOOGLE_APPLICATION_CREDENTIALS" for authentication
 * In 'detectTextIntent2' instead of using environment variable we are using required parameters(private_key, client_email) from JSON key
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function detectTextIntent1(projectId = 'gdfrestapi') {
    
    console.log("Testing detectTextIntent1");
    // A unique identifier for the given session
    const sessionId = uuid.v4();
    console.log(`detectTextIntent1()>  sessionId: ${sessionId}`);
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
        console.log('detectTextIntent1()> Detected intent');
        const result = responses[0].queryResult;
        console.log(`detectTextIntent1()>  Query: ${result.queryText}`);
        console.log(`detectTextIntent1()>  Response: ${result.fulfillmentText}`);
        if (result.intent) {
            console.log(`detectTextIntent1()>  Intent: ${result.intent.displayName}`);
        } else {
            console.log(`detectTextIntent1()>  No intent matched.`);
        }
    }
    catch(e){
        console.log(e);
    }
    
  }

/**
 * Note: In this method instead of using environment variable we are using required parameters(private_key, client_email) from JSON key
 * In 'detectTextIntent1' Dialogflow API will environment variable "GOOGLE_APPLICATION_CREDENTIALS" for authentication *  
 * @param {*} projectId 
 * @param {*} sessionId 
 * @param {*} query 
 * @param {*} languageCode 
 */
function detectTextIntent2(projectId, sessionId, query, languageCode) {
  
  console.log("Testing detectTextIntent2");

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
      console.log('detectTextIntent2()> Detected intent');
      const result = responses[0].queryResult;
      console.log(`detectTextIntent2()> Query: ${result.queryText}`);
      console.log(`detectTextIntent2()> Response: ${result.fulfillmentText}`);
      if (result.intent) {
        console.log(`detectTextIntent2()> Intent: ${result.intent.displayName}`);
      } else {
        console.log(`detectTextIntent2()> No intent matched.`);
      }
    })
    .catch(err => {
      console.error('detectTextIntent2()> ERROR:', err);
    });
}