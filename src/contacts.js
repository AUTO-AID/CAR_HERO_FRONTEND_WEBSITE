import { useTranslation } from "react-i18next";

export const faqData = (t) => t("contact_faq", { returnObjects: true });


export const teamData = [
    {
        name: "team1.name1",
        role: "team1.role1",
        desc: "team1.desc1",
        img: "https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        name: "team1.name2",
        role: "team1.role2",
        desc: "team1.desc2",
        img: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=2574&auto=format&fit=crop"
    },
    {
        name: "team1.name3",
        role: "team1.role3",
        desc: "team1.desc3",
        img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=2572&auto=format&fit=crop"
    }
];


export const featureData = [
    {
        icon: 'CarIcon',
        title: '24/7 Road Assistance',
        description: "Our mechanics are available 24/7 to help you on the road and ensure you're never stranded.",
        highlighted: true,
    },
    {
        icon: 'TrophyIcon',
        title: 'Member to Member Service',
        description: 'Buy and sell used certified cars safely with our trusted community of members.',
    },
    {
        icon: 'WrenchIcon',
        title: 'Complete Services',
        description: 'We offer all maintenance and repair services wherever you are — simple, fast, and reliable.',
    },
    {
        icon: 'BadgeIcon',
        title: 'Certified Mechanics',
        description: 'Our professional and certified mechanics provide trusted, high-quality service.',
    },
    {
        icon: 'TagIcon',
        title: 'Affordable Pricing',
        description: 'Get the same top-tier service at a lower cost. No hidden fees, just honest work.',
    },
    {
        icon: 'SupportIcon',
        title: 'Support Guarantee',
        description: 'We ensure quality and safety with every service. Our support team is always ready.',
    },
];