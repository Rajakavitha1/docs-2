/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    docs: [
        {
            type: 'doc',
            id: 'what-is-orkes-conductor',
            className: 'leftMenuHeader',
        },
        {
            type: 'doc',
            id: 'get-orkes-conductor',
            className: 'leftMenuHeader',
        },
        {
            type: 'category',
            label: 'Getting Started',
            link: {
                type: 'generated-index',
                title: 'Getting Started',
                description: 'Learn about the most important Orkes Conductor concepts!',
                slug: '/category/getting-started',
                keywords: ['getting-started', 'installation']
            },
            items: ['getting-started/step1', 'getting-started/step2', 'getting-started/step3', 'getting-started/step4', 'getting-started/step5'],
            collapsible: true,
            collapsed: false,
            className: 'leftMenuHeader',
        },
        {
            type: 'category',
            label: 'Developer Guides',
            link: {
                type: 'generated-index',
                title: 'Developer Guides',
                description: 'Guides for important Orkes Conductor features!',
                slug: '/category/developer-guides',
                keywords: ['guides', 'features', 'developer-guides']
            },
            items: [
                'guides/passing-data-task-to-task',
                'guides/unit-tests',
                'guides/integration-with-cicd',
                'guides/scheduling-workflows',
                'guides/webhooks',
                'guides/conductor-clients',
                'guides/write-as-code',
                'guides/debugging',
                'guides/scaling-workers',
            ],
            collapsible: true,
            collapsed: false,
            className: 'leftMenuHeader',
        },
        {
            type: 'doc',
            id: 'access-control-security',
            className: 'leftMenuHeader',
        },
        {
            type: 'doc',
            id: 'orchestrating-human-tasks',
            className: 'leftMenuHeader',
        },
        {
            type: 'doc',
            id: 'metrics-and-observability',
            className: 'leftMenuHeader',
        },
        {
            type: 'doc',
            id: 'system-integrations',
            className: 'leftMenuHeader',
        },
        {
            type: 'category',
            label: 'Reference Docs',
            link: {
                type: 'generated-index',
                title: 'Reference Docs',
                description: 'Reference documentation for Orkes Conductor',
                slug: '/category/ref-docs',
                keywords: ['reference', 'apis', 'operators', 'api', 'tasks', 'system', 'system-tasks']
            },
            items: [
                {
                    type: 'category',
                    label: 'Operators',
                    link: {
                        type: 'generated-index',
                        title: 'Operators',
                        description: 'Reference documentation for Orkes Conductor - Operators',
                        slug: '/category/ref-docs/operators',
                        keywords: ['reference', 'apis', 'operators', 'api', 'tasks', 'system', 'system-tasks']
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/operators',
                        }]
                },
                {
                    type: 'category',
                    label: 'System Tasks',
                    link: {
                        type: 'generated-index',
                        title: 'System Tasks',
                        description: 'Reference documentation for Orkes Conductor - System Tasks',
                        slug: '/category/ref-docs/system-tasks',
                        keywords: ['reference', 'apis', 'operators', 'api', 'tasks', 'system', 'system-tasks']
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/system-tasks',
                        }]
                },
                {
                    type: 'category',
                    label: 'API Reference',
                    link: {
                        type: 'generated-index',
                        title: 'API Reference',
                        description: 'Reference documentation for Orkes Conductor - APIs',
                        slug: '/category/ref-docs/api',
                        keywords: ['reference', 'apis', 'operators', 'api', 'tasks', 'system', 'system-tasks']
                    },
                    items: [
                        {
                            type: 'autogenerated',
                            dirName: 'reference-docs/api',
                        }]
                },
            ],
            collapsible: true,
            collapsed: true,
            className: 'leftMenuHeader',
        },
    ]
};

module.exports = sidebars;
