---
sidebar_position: 1
---

# Overview

There are four primitives that are used with Conductor.

## [Tasks](tasks-and-workers.md#Conductor-Tasks)
Tasks are the basic logical unit of work. They have defined inputs and outputs, do a specific activity and return an execution status of success or failure. 

Conceptually, Conductor is oblivious to the actual work a task does, and similarly the task is oblivious to the state of the execution of the overall application which it expects Conductor to manage and ensure high levels of reliability.

The actual execution of a Task can happen in multiple ways:
* **[External Tasks](tasks-and-workers.md#Conductor-Tasks):** This category is where the task is run external to Conductor as a microservice (e.g. in a container managed through Kubernetes in a public cloud) or it can run as a serverless function at a cloud provider. You can also have your task execute as part of a monolith that you have in your on-premise datacenter. As long as it can connect to Conductor server through REST of gRPC, it will work! 
* **[System Tasks](system-tasks.md)** This category of tasks runs within the Conductor server. A good example is the [HTTP System Task](../../reference-docs/system-tasks/http-task.md) which makes an outbound call (internal or Internet routed) to a HTTP service  and returns the results from that call. When you use System Tasks, you do not need to worry about provisioning, deploying and managing the application code for your tasks. 
> Note: The current Conductor nomenclature includes [Operators](operators.md) in the Tasks category. In this documentation, for clarity purposes, we treat them as a separate primitive of Conductor
## [Operators](operators.md)
Operators allows you to wire up your workflows to capture the business logic in an intuitive and flexible way. Specific examples include [SWITCH](../../reference-docs/switch-task.md), [FORK](../../reference-docs/fork-task.md) and [JOIN](../../reference-docs/join-task.md) operators. Leveraging these operators gives you programmability that is also visual and easy to manage. Compare this with embedding your business logic deep in codebases that are distributed among many modules, languages and versions - and having to scramble for hours to understand how logic flows in your application, for example during a live-site issue!

## [Workflows](workflows.md)
A workflow is the central entity that wires up different tasks and operators to represent an application's business logic. It specifies which tasks to schedule when, how their results are combined and how failure scenarios are handled. 

The execution of a workflow that is defined in Conductor involves not only executing the tasks, but also doing so with high levels of reliability at scale. This is possible because Conductor keeps tracks of the execution status for each invocation of a workflow, even when millions of them are running. If a Task is not responding or is failing, Conductor will retry the execution at the specific point, potentially with a different Task Worker.  

Workflows in Conductor are also highly durable. You can have a workflow that stays waiting for as long as needed *(think weeks, months, years)* in a specific point in the execution for a long time *(e.g. monthly subscription billing that happens on the 1st of every month)*.

Conductor's workflows are defined using JSON and results in a visual and intuitive graph representation of the application's components, relationships and flows. This abstraction of business logic is key to making developers & teams more empowered in multiple ways. 
* Developers can move fast by easily adding new tasks or logic flows to a workflow and let Conductor ensure high levels of reliability, scalability and durability.
* A new team member can be easily ramped up since these workflow definitions inherently serve as easy to understand documentation of the applications a team owns
* During livesite issues, a DevOps engineer can quickly see which workflow execution is failing, pinpoint the exact task having issues and get actionable information about what happened and which specific worker instance the problem code was running. This reduces debugging time for critical issues from hours or days to minutes



## [Workers](tasks-and-workers.md#Conductor-Workers)
Workers are the external entities that host and run the code for a Task that is defined in Conductor. 

To create a task, you can use the language you prefer - we have [SDKs](/content/docs/how-tos/sdks) to make this easy (more languages are coming on a regular basis). Once the tasks' implementation code is written, it is deployed, and will poll the Conductor server to see if there are any tasks queued for execution. If there are any, Conductor will allocate that for a Worker to execute and will wait for it to respond back with the result. In the event of a failure or a non-response from a Worker, Conductor will retry or gracefully fail in accordance with the behavior the task creator has specified. 

There are multiple ways in which you can run a Worker
* **Microservices:** The most common way a worker is implemented by Conductor users is by building a microservice to do that and deploying it as a container. This option allows you to have granularity in your application development, scale your tasks independently, and contain the blast radius of any task level failures.
* **Serverless Functions:** Your Task code can be written as a stateless and serverless function that can be hosted with a serverless provider such as [AWS Lambda](https://aws.amazon.com/lambda/), [Azure Functions](https://azure.microsoft.com/en-us/services/functions/), [Google Cloud Functions](https://cloud.google.com/functions) etc. Choosing this option to run your Tasks allows you to not have to spend time and resources managing a server footprint
* **Monolith:** Many applications run as part of a monolith that encompasses other applications or even entirely different business lines. Conductor fully supports executing workers in these stacks. This gives developers the flexibility to have parts of their application running in microservices and others in a monolith. Customers have used this flexibility to plan and execute their microservices isolation strategy (sometimes along with a cloud migration strategy) and also for their ongoing hybrid operational strategy which different parts of their business logic lie in different parts of their backend ecosystem.

## Further Reading
* [Tasks](tasks-and-workers.md#tasks)
* [Workers](tasks-and-workers.md#workers)
* [System Tasks](system-tasks.md)
* [Operators](operators.md)
* [Workflows](workflows.md)



