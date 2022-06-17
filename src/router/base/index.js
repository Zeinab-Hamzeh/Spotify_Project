const base = {
    path: '',
    component: () =>
        import ('@/layouts/full-layout/FullLayout'),
    redirect: { name: 'Login' },
    children: [{
            path: '/',
            name: 'Login',
            component: () =>
                import ('@/views/login/Login'),
            meta: {
                title: 'LOGIN',
                rule: 'isPublic'
            }
        },
        {
            path: '/search',
            name: 'Search',
            component: () =>
                import ('@/views/search/Search'),
            meta: {
                title: 'SEARCH',
                rule: 'isPublic'
            }
        },
        {
            path: '/albums/:id',
            name: 'Albums',
            component: () =>
                import ('@/views/albums/Albums'),
            meta: {
                title: 'ALBUMS',
                rule: 'isPublic'
            }
        }



    ]
}

export default base