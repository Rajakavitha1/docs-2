---
sidebar_position: 0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Start workflow execution
Starts a workflow and returns the **ID** if the started workflow.

The API returns immediately without the waiting for workflow to be completed.
## Input Request

|Parameter|Description|
|---|---|
|name|Name of the workflow|
|version|Workflow version. **optional**|
|input|Map of Key and Value given as the input to the workflow|
|correlationId|User supplied correlation id which can be used to query the workflow execution later|
|priority|Priority of the workflow.  0 is the default priority, which executes workflows in FIFO.  Valid values are between 0-99 inclusive|
|taskToDomain|See **Using Task Domains** for more information. **optional**|
|workflowDef|Entire workflow definition.  Used for executing ephemeral workflow definitions.  **optional**|

## Response
A string representing the id of the workflow execution.

## SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java
    public abstract CompletableFuture<WorkflowRun>
        executeWorkflow(StartWorkflowRequest request, String waitUntilTask);
```
</TabItem>

  <TabItem value="Golang" label="Golang">

```go
    func (e *WorkflowExecutor) StartWorkflow(startWorkflowRequest *model.StartWorkflowRequest)
        (workflowId string, err error)
```
  </TabItem>
  <TabItem value="Python" label="Python">

```javascript
workflow_id = workflow_executor.start_workflow(
        start_workflow_request=StartWorkflowRequest(name="workflow", input={})
    )
```

  </TabItem>
  <TabItem value="CSharp" label="CSharp">
      This is a banana 🍌
  </TabItem>
  <TabItem value="Javascript" label="Javascript">
        This is a banana 🍌
    </TabItem>
     <TabItem value="Clojure" label="Clojure">
        This is a banana 🍌
    </TabItem>
</Tabs>

