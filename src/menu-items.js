export const navigation = {
    items:[
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'lawyermanage',
                    title: 'Manage Lawyers',
                    type: 'item',
                    icon: 'feather icon-calendar',
                    url: '/lawyers'
                },
                {
                    id: 'subscriptionmanage',
                    title: 'Manage Subscriptions',
                    type: 'item',
                    icon: 'feather icon-calendar',
                    url: '/supscriptions'
                },
                {
                    id: 'support',
                    title: 'Support',
                    type: 'item',
                    icon: 'feather icon-calendar',
                    url: '/support'
                },
                {
                    id: 'content',
                    title: 'Manage Content',
                    type: 'item',
                    icon: 'feather icon-calendar',
                    url: '/content'
                },



            ]

        }

    ]
}

export default {
    items: [
        {
            id: 'navigation',
            title: 'Navigation',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'calendar',
                    title: 'Calendar',
                    type: 'item',
                    icon: 'feather icon-calendar',
                    url: '/calendar'
                },
                {
                    id: 'task',
                    title: 'Task',
                    type: 'item',
                    icon: 'feather icon-tasks',
                    url: '/'
                },
                {
                    id: 'matters',
                    title: 'Matters',
                    type: 'item',
                    icon: 'feather icon-server',
                    url: '/'
                },
                {
                    id: 'contacts',
                    title: 'Contact',
                    type: 'item',
                    icon: 'feather icon-server',
                    url: '/'
                },
                {
                    id: 'activities',
                    title: 'Activities',
                    type: 'item',
                    icon: 'feather icon-server',
                    url: '/'
                },
                {
                    id: 'billings',
                    title: 'Billings',
                    type: 'item',
                    icon: 'feather icon-server',
                    url: '/'
                },
                {
                    id: 'accounts',
                    title: 'Accounts',
                    type: 'item',
                    icon: 'feather icon-server',
                    url: '/'
                },
                {
                    id: 'documents',
                    title: 'Documents',
                    type: 'item',
                    icon: 'feather icon-file',
                    url: '/'
                },
                {
                    id: 'communication',
                    title: 'Communication ',
                    type: 'item',
                    icon: 'feather icon-server',
                    url: '/'
                },
                {
                    id: 'reports',
                    title: 'Reports',
                    type: 'item',
                    icon: 'feather icon-server',
                    url: '/'
                },
                {
                    id: 'settings',
                    title: 'Settings',
                    type: 'item',
                    icon: 'feather icon-settings',
                    url: '/'
                },
                {
                    id: 'help',
                    title: 'Help centre',
                    type: 'item',
                    icon: 'feather icon-server',
                    url: '/'
                }
            ]
        },
        // for test commit
        // {
        //     id: 'ui-element',
        //     title: 'UI ELEMENT',
        //     type: 'group',
        //     icon: 'icon-ui',
        //     children: [
        //         {
        //             id: 'basic',
        //             title: 'Component',
        //             type: 'collapse',
        //             icon: 'feather icon-box',
        //             children: [
        //                 {
        //                     id: 'button',
        //                     title: 'Button',
        //                     type: 'item',
        //                     url: '/basic/button'
        //                 },
        //                 {
        //                     id: 'badges',
        //                     title: 'Badges',
        //                     type: 'item',
        //                     url: '/basic/badges'
        //                 },
        //                 {
        //                     id: 'breadcrumb-pagination',
        //                     title: 'Breadcrumb & Pagination',
        //                     type: 'item',
        //                     url: '/basic/breadcrumb-paging'
        //                 },
        //                 {
        //                     id: 'collapse',
        //                     title: 'Collapse',
        //                     type: 'item',
        //                     url: '/basic/collapse'
        //                 },
        //                 {
        //                     id: 'tabs-pills',
        //                     title: 'Tabs & Pills',
        //                     type: 'item',
        //                     url: '/basic/tabs-pills'
        //                 },
        //                 {
        //                     id: 'typography',
        //                     title: 'Typography',
        //                     type: 'item',
        //                     url: '/basic/typography'
        //                 }
        //             ]
        //         }
        //     ]
        // },
        // {
        //     id: 'ui-forms',
        //     title: 'Forms & Tables',
        //     type: 'group',
        //     icon: 'icon-group',
        //     children: [
        //         {
        //             id: 'form-basic',
        //             title: 'Form Elements',
        //             type: 'item',
        //             url: '/forms/form-basic',
        //             icon: 'feather icon-file-text'
        //         },
        //         {
        //             id: 'bootstrap',
        //             title: 'Table',
        //             type: 'item',
        //             icon: 'feather icon-server',
        //             url: '/tables/bootstrap'
        //         }
        //     ]
        // },
        // {
        //     id: 'chart-maps',
        //     title: 'Chart & Maps',
        //     type: 'group',
        //     icon: 'icon-charts',
        //     children: [
        //         {
        //             id: 'charts',
        //             title: 'Charts',
        //             type: 'item',
        //             icon: 'feather icon-pie-chart',
        //             url: '/charts/nvd3'
        //         },
        //         {
        //             id: 'maps',
        //             title: 'Map',
        //             type: 'item',
        //             icon: 'feather icon-map',
        //             url: '/maps/google-map'
        //         }
        //     ]
        // },
        // {
        //     id: 'pages',
        //     title: 'Pages',
        //     type: 'group',
        //     icon: 'icon-pages',
        //     children: [
        //         {
        //             id: 'auth',
        //             title: 'Authentication',
        //             type: 'collapse',
        //             icon: 'feather icon-lock',
        //             badge: {
        //                 title: 'New',
        //                 type: 'label-danger'
        //             },
        //             children: [
        //                 {
        //                     id: 'signup-1',
        //                     title: 'Sign up',
        //                     type: 'item',
        //                     url: '/auth/signup-1',
        //                     target: true,
        //                     breadcrumbs: false
        //                 },
        //                 {
        //                     id: 'signin-1',
        //                     title: 'Sign in',
        //                     type: 'item',
        //                     url: '/auth/signin-1',
        //                     target: true,
        //                     breadcrumbs: false
        //                 }
        //             ]
        //         },

        //         {
        //             id: 'sample-page',
        //             title: 'Sample Page',
        //             type: 'item',
        //             url: '/sample-page',
        //             classes: 'nav-item',
        //             icon: 'feather icon-sidebar'
        //         },
        //         {
        //             id: 'docs',
        //             title: 'Documentation',
        //             type: 'item',
        //             url: '/docs',
        //             classes: 'nav-item',
        //             icon: 'feather icon-help-circle'
        //         },
        //         {
        //             id: 'menu-level',
        //             title: 'Menu Levels',
        //             type: 'collapse',
        //             icon: 'feather icon-menu',
        //             children: [
        //                 {
        //                     id: 'menu-level-1.1',
        //                     title: 'Menu Level 1.1',
        //                     type: 'item',
        //                     url: '#!',
        //                 },
        //                 {
        //                     id: 'menu-level-1.2',
        //                     title: 'Menu Level 2.2',
        //                     type: 'collapse',
        //                     children: [
        //                         {
        //                             id: 'menu-level-2.1',
        //                             title: 'Menu Level 2.1',
        //                             type: 'item',
        //                             url: '#',
        //                         },
        //                         {
        //                             id: 'menu-level-2.2',
        //                             title: 'Menu Level 2.2',
        //                             type: 'collapse',
        //                             children: [
        //                                 {
        //                                     id: 'menu-level-3.1',
        //                                     title: 'Menu Level 3.1',
        //                                     type: 'item',
        //                                     url: '#',
        //                                 },
        //                                 {
        //                                     id: 'menu-level-3.2',
        //                                     title: 'Menu Level 3.2',
        //                                     type: 'item',
        //                                     url: '#',
        //                                 }
        //                             ]
        //                         }
        //                     ]
        //                 }
        //             ]
        //         },
        //         {
        //             id: 'disabled-menu',
        //             title: 'Disabled Menu',
        //             type: 'item',
        //             url: '#',
        //             classes: 'nav-item disabled',
        //             icon: 'feather icon-power'
        //         },
        //         /*{
        //             id: 'buy-now',
        //             title: 'Buy Now',
        //             type: 'item',
        //             icon: 'feather icon-user',
        //             classes: 'nav-item',
        //             url: 'https://codedthemes.com',
        //             target: true,
        //             external: true,
        //             badge: {
        //                 title: 'v1.0',
        //                 type: 'label-primary'
        //             }
        //         }*/
        //     ]
        // }
    ]
}