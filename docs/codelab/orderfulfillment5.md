# Dealing with workflow failure
# Order Fulfillment Codelab part 5

You're running order fulfillment at Bob's Widgets, and when you started, it was 100% manual.  

* In parts 1-3 of the codelab, you got a shipping workflow up and running. 
* In part 4, you added a HTTP task to automatically reorder widgets - so that the warehouse inventory is replenished once a week.


## Trouble in Inventory land

Your new workflow has been up and running all week. You've shipped out 5,201 widgets, and it all seems to be going great.  

Then, on Friday afternoon, you get an email from the supplier, confirming your order - but for only 3,000 widgets.  

What could have gone wrong!?!

## Examining for issues

In your Conductor panel, you can search for all workflow executions for the Bob's widget workflow.  All of the workflows completed (as seen in the rightmost column below):

<p align="center"><img src="/content/img/codelab/of5_execution.png" alt="conductor execution workflow list" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

You roll up your sleeves and begin looking at individual workflows to find the error.  When you open an  order, and look at the ```workflow input/output pab``` you want to see data like this:


<p align="center"><img src="/content/img/codelab/of5_goodwf.png" alt="a good successful workflow" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>


We see that the output includes the address, and the output from the HTTP_task from the supplier confirming that an order for 1 widget was placed.  But, as you continue to hunt, you find workflows that look like this:

<p align="center"><img src="/content/img/codelab/of5_badwf.png" alt="a nad successful workflow" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

As far as Conductor is concerned - a response came back from the HTTP Task, so the workflow was successful.  But, from an inventory replenishment status, this is not ok.

## why did the order fail?

Seeing as this is a 3rd party API - there are lots of reasons that a failure might occur. In the REST API that was built to model the ```appendOrder``` endpoint, we have added a 10% failure rate to the code:

```javascript
    var failure = 0.1;
    var response="";
    if(Math.random() < failure){
        //order failed
        response = "Order failed.";
    }
    else{
        response = "Success!" + count + " " +item +"(s) added to your order."
    }
```

Hopefully, any API used in a production Conductor workflow will behave better than this one, but a high error rate makes this easier to test. 

## Adding a error flow

To ensure that orders are correctly placed, we need to parse the output from the HTTP_Task, and if the order is successfully placed, the workflow can continue as it does today. However, if the HTTP task returns with an error, we need to know this, so that we can fix the order manually.

We know that a 'good' response from the API reads: ```Success![number] widgets ordered```, while a 'bad' response reads ```Order failed.```

## Adding a Switch task

A [Switch task](https://orkes.io/content/docs/reference-docs/switch-task) takes in a value, and can choose which case the workflow should follow.  There is a default case (in this workflow, we'll assume that a order will be placed), and then the alternative case is when the output reads "Order Failed"


```json
{
  "name": "order_checking",
  "taskReferenceName": "switch_task",
  "inputParameters": {
    "switchCaseValue": "${reorder_widgets_ref.output.response.body}"
  },
  "type": "SWITCH",
  "evaluatorType": "value-param",
  "expression": "switchCaseValue",
  "defaultCase": [
    {
      <success path>
    }
  ],
  "decisionCases": {
    "Order failed.": [
      {
        <failure path>
      }
    ]
  }
}
```

In this workflow, the switch case is at the end of the workflow, so we'll insert 2 [terminate tasks](https://orkes.io/content/docs/reference-docs/terminate-task0): one for the default case, and one for the failure case.

A terminate task does exactly what it sounds like - it ends the workflow.  We'll end the 'good' path with a ```COMPLETED``` result, and end the 'bad' path with a ```FAILED``` state. our completed switch now looks like:

```JSON
{
      "name": "order_checking",
      "taskReferenceName": "switch_task",
      "inputParameters": {
        "switchCaseValue": "${reorder_widgets_ref.output.response.body}"
      },
      "type": "SWITCH",
      "decisionCases": {
        "Order failed.": [
          {
            "name": "terminate_fail",
            "taskReferenceName": "terminate_fail",
            "inputParameters": {
              "terminationStatus": "FAILED",
              "workflowOutput": {
                "address": "${widget_shipping.output.fullAddress}",
                "tracking": "${widget_shipping.output.trackingNumber}",
                "reorder": "${reorder_widgets_ref.output.response.body}"
              }
            },
            "type": "TERMINATE",
            "decisionCases": {},
            "defaultCase": [],
            "forkTasks": [],
            "startDelay": 0,
            "joinOn": [],
            "optional": false,
            "defaultExclusiveJoinTask": [],
            "asyncComplete": false,
            "loopOver": []
          }
        ]
      },
      "defaultCase": [
        {
          "name": "terminate_success",
          "taskReferenceName": "terminate_success",
          "inputParameters": {
            "terminationStatus": "COMPLETED",
            "workflowOutput": {
              "address": "${widget_shipping.output.fullAddress}",
              "tracking": "${widget_shipping.output.trackingNumber}",
              "reorder": "${reorder_widgets_ref.output.response.body}"
            }
          },
          "type": "TERMINATE",
          "decisionCases": {},
          "defaultCase": [],
          "forkTasks": [],
          "startDelay": 0,
          "joinOn": [],
          "optional": false,
          "defaultExclusiveJoinTask": [],
          "asyncComplete": false,
          "loopOver": []
        }
      ],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopOver": [],
      "evaluatorType": "value-param",
      "expression": "switchCaseValue"
    }
```

When you run a number of workflow executions, you'll now see ~10% of them failing:

<p align="center"><img src="/content/img/codelab/of5_listofworkflows.png" alt="list of workflows with failures" width="800" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Comparing a successful and failed workflow, the difference is in the switch task.  When an Order fails, the workflow now fails:

<p align="center"><img src="/content/img/codelab/of5_faileddiagram.png" alt="a diagram of a failed workflow" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

## Failing the workflow

While it is now a lot easier to *find* failed workflow executions, we need to automate a failure workflow, so that we are alerted whenever a workflow fails.

## Failure workflow

We'll create a second workflow that will be run whenever there the ```Bobs_widget_fulfillment``` workflow fails. For simplicity, let's name this new workflow ```shipping_failure```.  To get this workflow to run whenever the main workflow fails, we'll add a new parameter to the parent workflow JSON:

```
"failureWorkflow": "shipping_failure"
```

This tells Conductor to run this workflow whenever there is a failure.

Now, we'll define this second workflow.  When the main workflow fails, we want to be alerted right away, so we created a [Slack bot](https://api.slack.com/authentication/basics) that sends a message to a specific Slack channel whenever the workflow fails.  In the definition below, we hide the bot token in the url, and in the message, we attach the failed workflowId and the reason for failure.  

```JSON
{
  "updateTime": 1648491832650,
  "name": "shipping_failure",
  "description": "workflow for failures with Bobs widget workflow",
  "version": 1,
  "tasks": [
    {
      "name": "slack_message",
      "taskReferenceName": "send_slack_message",
      "inputParameters": {
        "http_request": {
          "headers": {
            "Content-type": "application/json"
          },
          "uri": "https://hooks.slack.com/services/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",
          "method": "POST",
          "body": {
            "text": "workflow: ${workflow.input.workflowId} failed. ${workflow.input.reason}"
          },
          "connectionTimeOut": 5000,
          "readTimeOut": 5000
        }
      },
      "type": "HTTP",
      "decisionCases": {},
      "defaultCase": [],
      "forkTasks": [],
      "startDelay": 0,
      "joinOn": [],
      "optional": false,
      "defaultExclusiveJoinTask": [],
      "asyncComplete": false,
      "loopOver": [],
      "retryCount": 3
    }
  ],
  "inputParameters": [],
  "outputParameters": {},
  "schemaVersion": 2,
  "restartable": true,
  "workflowStatusListenerEnabled": false,
  "ownerEmail": "doug.sillars@orkes.io",
  "timeoutPolicy": "ALERT_ONLY",
  "timeoutSeconds": 0,
  "variables": {},
  "inputTemplate": {}
}
```

Now, we have instrumented our Workflow to tell us when there is a failure- in rder to reduce the number of surprises:

<p align="center"><img src="/content/img/codelab/of5_failurebot.png" alt="slack message indicating workflow failure" width="400" style={{paddingBottom: 40, paddingTop: 40}} /></p>

Now that we have some notification of workflow failures, we can continue with our automation of our shipping workflow.  At this point, we're going to make a bigger change to the workflow - adding additional inputs that might break the current workflow.  So we'll create a new version of the workflow.
