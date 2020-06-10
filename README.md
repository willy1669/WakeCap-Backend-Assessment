# Nodejs Backend Challenge
​
## Objectives
​
The purpose of completing this test is to show us how you approach and solve a problem. 
​
- **State your assumptions.**  Anywhere you feel that the requirements are unclear please make
an assumption and document that assumption.
- **Describe Trade-offs.** When you are making a decision about using one design/approach vs. another
try to make a quick note about why you made the choice you did.
- **Provide tests.**  You should provide unit tests for the code that you write.
​
​
## Requirements
- Wakecap is an IoT company that has a product works on letting helmets of the works produces all data needed to track their movement and measure their productivity as well. The solution provides a lot of report to the sites' admins and allow them to track their works efficiently.
- The structure of each site is as following:
  - Client (Al Futtaim for example)
  - Al Futtaim has multiple sites (Like City Center)
  - Every Site has it's own related workers
​
- For each site, there is a specific configuration:
  - Timezone (Used to manage the timing of the tracked workers against UTC)
  - Starting hour (Used to figure out the time the workers start their daily operation)
  - Ending hour (Used to figure out the time the workers end their daily operation)
  - Late threshold (The configurable value where every worker exceeds will be considered as late attendant)
  - Total Inactive hours (The hours that the worker spent in the site leaving the helmet away, or not moving from his place for 5 minutes)
  
- The site admin need daily report contains:
  - Show a summary of absent workers
  - Show a summary of late workers
  - Total active hours for workers
  - Total inactive hours for workers
​
- The report should be generated every midnight depends on site's different 9timezone.
  
- We receive every 3 minutes new location update from our assets
    ````
    {
        "coordinates" : {
            "coordinates" : [ 
                55.1404609680176, 
                25.0615882873535
            ],
            "_id" : ObjectId("5daddacc03feb33cb822ac23"),
            "type" : "Point"
        },
        is_active: true,
        "duration" : 180,
        "worker_id" : "24"
    }
    ````
    - coordinates: His location when this message is sent from the device 
    - is_active we have sensor detect if the worker is working or not
    - duration: number of seconds between sending this message and the pervious message.
    
## Technologies
 - Node.js 
 - Mongoose
 - Testing [Mocha](https://mochajs.org) and [Chai](http://chaijs.com)
 - Docker 
​
 
## Criteria
​
* Use following [coding style guide](https://github.com/airbnb/javascript)
* Efficient MongoDB queries and indexes
* Mongoose schemas and models
* [JSDoc](https://jsdoc.app/) for documenting JavaScript code
