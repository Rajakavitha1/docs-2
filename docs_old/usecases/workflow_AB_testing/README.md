# A/B Testing Workers

We have built two workflows to enable A/B testing of workers in your workflow. To A/B test a worker, two versions of the worker must be running. Using [task to domain](https://orkes.io/content/docs/codelab/taskToDomain), traffic can be divided between the workers as desired. Both examples use JavaScript to generate a random number that decides which task to run. The SWITCH task version is easier to visualize, whereas the INLINE task is faster to implement.


## [A/B with switch task](https://github.com/conductor-sdk/conductor-examples/blob/main/workflow_AB_testing/AB_switch.json)

|[Try it in Orkes Playground](https://play.orkes.io/workflowDef/AB_with_dynamic_task)|
|---| 

<img src="https://orkes.io/content/img/tasktodomain_abtest.jpg" alt="Switch task AB testing" width="250" style={{paddingBottom: 40, paddingTop: 40}} />

## [A/B with inline task](https://github.com/conductor-sdk/conductor-examples/blob/main/workflow_AB_testing/AB_inline.json)


|[Try it in Orkes Playground](https://play.orkes.io/workflowDef/AB_with_inline_task)|
|---| 

<img src="https://orkes.io/content/img/tasktodomain_abtestinline.jpg" alt="Inline task AB testing" width="250" style={{paddingBottom: 40, paddingTop: 40}} />

Have a look at our [Task To Domain codelab](https://orkes.io/content/docs/codelab/taskToDomain#ab-testing-of-workflows) to know more about this!