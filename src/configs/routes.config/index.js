import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'app',
        path: '/app',
        component: React.lazy(() => import('views/dashboard')),
        authority: [],
    },
    {
        key: 'wallets',
        path: '/app/wallets',
        component: React.lazy(() => import('views/wallets')),
        authority: [],
    },
    {
        key: 'wallets',
        path: '/app/wallets/:id',
        component: React.lazy(() => import('views/wallets/show')),
        authority: [],
    },
    {
        key: 'transactions',
        path: '/app/transactions',
        component: React.lazy(() => import('views/wallets/transactions')),
        authority: [],
    },
    {
        key: 'settings',
        path: '/app/account/settings/:tab',
        component: React.lazy(() => import('views/account/Settings')),
        authority: [],
        meta: {
            header: 'Paramètres',
            headerContainer: true,
        },
    },
]
