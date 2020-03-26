# Dialogflow-REST-API-Middleware
Instead of using Dialogflow's inbuilt integration, I am going to write my own middle-ware using Dialogflow REST API to interact with end user from different channels like Facebook messenger, Viber, Whatsapp etc.

## Setup Dialogflow For REST API Integration
[Reference Google Documentation](https://cloud.google.com/dialogflow/docs/quick/setup#authentication-and-access-control)

### Create Dialogflow Agent & Cloud Porject
- Go to Dialogflow console to create new Agent. Every dialoghflow agent must have Google Cloud Project.
- Now if you are not going to use Dialogflow Rest APi then you can go ahead and create Dialogflow agent with deafult configuration. It will create basic cloud project or your agent.
- But if you are going to use Dialogflow REST API then its recommonded to create Cloud Project using GCP console, enable required API and then create agent and use that project from dropdown.

### How To Enable REST API Access For Existing Dialogflow Agent
- Existing Dailogflow agent already have basic cloud project and service account.
- Now [Enable the Dialogflow V2 API For This Project](https://console.cloud.google.com/flows/enableapi?apiid=dialogflow.googleapis.com&_ga=2.121536335.639284585.1585221980-1017238779.1535439467)
- 

- Follow [this link](https://cloud.google.com/dialogflow/docs/quick/setup#authentication-and-access-control) to test authentication         using service account and text intect detection.
- Last step is where we install the "Install the Dialogflow client library" using command "npm install dialogflow" for Node.js.
- Before we can run any code to test the DIalogflow API we have to create an Agent on Dialogflow console and select the same project         that we have created following above link
- Important to note that project has to be same, as we have JSON key which API's are going to rely for authentication.

## Now lets test some code.

### detectTextIntent1() 
- In this method Dialogflow API will environment variable "GOOGLE_APPLICATION_CREDENTIALS" for authentication
- In 'detectTextIntent2' instead of using environment variable we are using required parameters(private_key, client_email) from JSON key
- To test it, uncomment the line "detectTextIntent1" in "detectTextIntent" function run the program
- Test url is http://localhost:9000/gdfRestApi/test/detectTextIntent

  ```
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

  ```
  Sample output from terminal
  ```
  ################## listening on port 9000 #################
  Testing detectTextIntent1
  detectTextIntent1()>  sessionId: a42533ba-0a69-4b66-8aaa-eca278b5436a
  detectTextIntent1()> Detected intent
  detectTextIntent1()>  Query: hello
  detectTextIntent1()>  Response: Greetings! How can I assist?
  detectTextIntent1()>  Intent: Default Welcome Intent
  ```
  
  ### detectTextIntent2() 
  - In this method instead of using environment variable we are using required parameters(private_key, client_email) from JSON key
  - In 'detectTextIntent1' Dialogflow API will environment variable "GOOGLE_APPLICATION_CREDENTIALS" for authentication *
  - To test it, uncomment the line "detectTextIntent2" in "detectTextIntent" function run the program
  - Test url is http://localhost:9000/gdfRestApi/test/detectTextIntent  

  ```
  function detectTextIntent2(projectId, sessionId, query, languageCode) {
  
  console.log("Testing detectTextIntent2");

  let privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCTNfx/\n-----END PRIVATE KEY-----\n";

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

  ```
  Sample output from terminal
  ```
  ################## listening on port 9000 #################
  Testing detectTextIntent2
  detectTextIntent2()> Detected intent
  detectTextIntent2()> Query: hello
  detectTextIntent2()> Response: Hello! How can I help you?
  detectTextIntent2()> Intent: Default Welcome Intent
  ```


