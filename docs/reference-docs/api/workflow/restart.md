---
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Restart workflow execution
Restart a workflow execution from the beginning with the same input.
When called on a workflow that is not in a terminal status, this operation has no effect.
If useLatestDefinition is set, the restarted workflow fetches the latest definition from the metadata store

## Properties

## API
POST /workflow/{workflowId}/restart

## Client SDK Methods

<Tabs>
<TabItem value="Java" label="Java">

```java

```

</TabItem>
<TabItem value="Golang" label="Golang">

```go
func (e *WorkflowExecutor) Restart(workflowId string, useLatestDefinition bool) error
```

</TabItem>
<TabItem value="Python" label="Python">

```python

```

</TabItem>
<TabItem value="CSharp" label="CSharp">

```csharp

```

</TabItem>
<TabItem value="Javascript" label="Javascript">

```javascript

```

</TabItem>
<TabItem value="Clojure" label="Clojure">

```clojure

```

</TabItem>
</Tabs>