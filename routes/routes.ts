
export type NavigationLink = {
    id: number;
    title: string;
    link: string;
    requiredLogin: boolean;
};

export const navigationLinks: Array<NavigationLink> = [
    {
        id: 1,
        title: "Главная",
        link: '/',
        requiredLogin: false,
    },
    {
        id: 2,
        title: "Курсы",
        link: '/courses',
        requiredLogin: false,
    },
    {
        id: 3,
        title: "О нас",
        link: '/about',
        requiredLogin: false,
    },
    {
        id: 4,
        title: "Команда",
        link: '/team',
        requiredLogin: false,
    },
    {
        id: 5,
        title: "Цены",
        link: '/prices',
        requiredLogin: false
    },
    {
        id: 6,
        title: "Блог",
        link: '/blog',
        requiredLogin: false
    },
    {
        id: 7,
        title: "Контакты",
        link: '/contacs',
        requiredLogin: false
    },
    {
        id: 8,
        title: "Войти",
        link: '/login',
        requiredLogin: false
    },
    {
        id: 9,
        title: "Зарегестрироваться",
        link: '/register',
        requiredLogin: false,
    },
    {
        id: 10,
        title: "Выйти",
        link: '/signout',
        requiredLogin: true,
    },
]