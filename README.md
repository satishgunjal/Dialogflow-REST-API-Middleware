# Dialogflow-REST-API-Middleware
Instead of using Dialogflow's inbuilt integration, I am going to write my own middle-ware using Dialogflow REST API to interact with end user from different channels like Facebook messenger, Viber, Whatsapp etc.

## Setup Dialogflow For REST API Integration
[Reference Google Documentation](https://cloud.google.com/dialogflow/docs/quick/setup#authentication-and-access-control)

### Create Dialogflow Agent & Cloud Porject
- Go to Dialogflow console to create new Agent. Every dialoghflow agent must have Google Cloud Project.
- Now 
- But 

### How To Enable REST API Access For Existing Dialogflow Agent
- Existing Dailogflow agent already have basic cloud project and service account.
  <img src="images/Existing-Dialogflow-Agent.PNG" width="500">
- Now to enable the Dialogflow V2 API for this project [Click Here](https://console.cloud.google.com/flows/enableapi?apiid=dialogflow.googleapis.com&_ga=2.121536335.639284585.1585221980-1017238779.1535439467)
- Now click on the service account link, it will take you service accounts page for this project.
- Click on the hamburger icon and create key for above service account. Select JSON type.

### How To Enable REST API Access For New Dialogflow Agent
If you are going to use Dialogflow REST API then its recommonded to create Cloud Project using GCP console, enable required API and then create agent and use that project from dropdown.

#### Create a project
- In the Cloud Console, on the project selector page, select or create a Cloud project.
- [Go to the project selector page](https://console.cloud.google.com/projectselector2/home/dashboard?_ga=2.125736141.639284585.1585221980-1017238779.1535439467)

#### Enable billing
- You can skip this step if you are only using the Dialogflow Standard Edition.

#### Enable the API
  - You must enable the Dialogflow API for your project. [Enable the Dialogflow V2 API](https://console.cloud.google.com/flows/enableapi?apiid=dialogflow.googleapis.com&_ga=2.24483069.639284585.1585221980-1017238779.1535439467)

#### Set up authentication
- Any client application that uses the API must be authenticated and granted access to the requested resources.
- It is recommended that you use service accounts for authentication and access control. A service account provides credentials for applications, as opposed to end-users. Service accounts are owned by projects, and you can create many service accounts for a project. For more information, see [Service accounts](https://cloud.google.com/docs/authentication#service_accounts)
- For the purpose of trying the Dialogflow API, you can use the Project > Owner role, which grants the service account full access to the project
- Steps are as below..
  1. In the Cloud Console, go to the [Create service account key page](https://console.cloud.google.com/apis/credentials/serviceaccountkey?_ga=2.25779322.639284585.1585221980-1017238779.1535439467)
  2. From the Service account list, select New service account.
  3. In the Service account name field, enter a name
  4. From the Role list, select Project > Owner
  5. Click Create. A JSON file that contains your key downloads to your computer
  
#### Use the service account key file in your environment
- Provide authentication credentials to your application code by setting the environment variable GOOGLE_APPLICATION_CREDENTIALS
- [Link for section](https://cloud.google.com/dialogflow/docs/quick/setup#auth-env)
- Note: If setting environment variable doesent work, you can refer section "detectTextIntent2()" to test it without environment variable

#### Install and initialize the Cloud SDK
- Cloud SDK is a set of tools that you can use to manage resources and applications hosted on GCP. This includes the gcloud command line tool
- [Install and initialize the Cloud SDK](https://cloud.google.com/sdk/docs)

#### Test the SDK and authentication
- If you have set up authentication in previous steps, you can use the gcloud tool to test your authentication environment. Execute the following command and verify that no error occurs and that credentials are returned:
 ```
 gcloud auth application-default print-access-token
 ```
- Note: If above command dont work for you then you wont be able to detectTextIntent1(). But detectTextIntent2() will work.
 
 #### Install the latest Google Cloud Client Libraries
- For Node.js use command "npm install dialogflow" 

 #### Create Dialogflow Agent
- For Node.js use command "npm install dialogflow" 



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


