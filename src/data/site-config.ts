export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
    active?: boolean;
};

export type Hero = {
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    website: string;
    logo?: Image;
    title: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
    website: 'https://dev-voyage.blog',
    title: 'Dev Voyage',
    subtitle: 'The Software Craftsman Voyage of DDC',
    description: 'Building elegant solutions at scale with React, and cloud technologies',
    image: {
        src: '/profile-image.jpg',
        alt: 'DDC - Software Engineer'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Blog',
            href: '/blog'
        }
    ],
    footerNavLinks: [
        {
            text: 'About',
            href: '/about',
        }
    ],
    socialLinks: [
        {
            text: 'GitHub',
            href: 'https://github.com/ddc22'
        },
        {
            text: 'Twitter',
            href: 'https://twitter.com/DDC1842468'
        }
    ],
    hero: {
        title: '',
        text: "I'm a **Full Stack Engineer** with a passion for creating elegant, scalable solutions. My journey spans from aviation systems and retail POS platforms to WordPress.com growth initiatives and AI-powered marketing tools. I specialize in **React/Redux** ecosystems with **TypeScript** on the frontend and **Java/Spring** on the backend, with recent work in serverless architectures and event-driven systems. I believe great software combines technical excellence with intuitive user experiences, always focusing on solving real business problems. Check out some of my work on <a href='https://github.com/ddc22'>GitHub</a> or connect with me on <a href='https://twitter.com/DDC1842468'>Twitter</a>.",
        image: {
            src: '/hero.jpeg',
            alt: 'Software engineer at work'
        },
        actions: [
            {
                text: 'View Projects',
                href: '/projects'
            },
            {
                text: 'Get in Touch',
                href: '/contact'
            }
        ]
    },
    subscribe: {
        title: 'Subscribe to My Tech Newsletter',
        text: 'Occasional updates on frontend architecture, React patterns, and cloud solutions.',
        formUrl: '#newsletter-signup'
    },
    postsPerPage: 6,
    projectsPerPage: 6
};

export default siteConfig;