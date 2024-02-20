import {
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'

const navigationConfig = [
    {
        key: 'app',
        path: '/app',
        title: 'Tableau de bord',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'wallets',
        path: '/app/wallets',
        title: 'Portefeuilles',
        translateKey: 'nav.wallets',
        icon: 'wallet',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'deposit',
        path: '/app/deposit',
        title: 'Dépôt',
        translateKey: 'nav.deposit',
        icon: 'deposit',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'deposit',
        path: '/app/withdrawal',
        title: 'Retrait',
        translateKey: 'nav.withdrawal',
        icon: 'withdrawal',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'transactions',
        path: '/app/transactions',
        title: 'Transactions',
        translateKey: 'nav.transactions',
        icon: 'transactions',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'help',
        path: '/app/help',
        title: "Centre d'assistance",
        translateKey: 'nav.help',
        icon: 'help',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'settings',
        path: '/app/account/settings/profile',
        title: "Paramètres",
        translateKey: 'nav.setting',
        icon: 'setting',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    }
]

export default navigationConfig
