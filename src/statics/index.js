import faq from './Faq';
import about from "./About";

const staticText = {
    about: about,
    faq: faq,
    homeTabs: ['Newest', 'Last Activity', 'Nearing Deadline'],
    dashboardTabs: ['Ask For Help', 'FAQ and Problems'],
    raffleListTabs: [{label: 'All Raffles', value: 'all'}, {label: 'Active', value: 'active'},
        {label: 'Successful', value: 'succeed'}, {label: 'Failed', value: 'failed'}],
    navigations: [{title: 'Home', link: '/'}, {title: 'All Raffles', link: '/raffle/list'},
        {title: 'FAQ', link: '/faq'}, {title: 'About/Contact', link: '/about'}],
    // footers: [{title: 'All Raffles', link: '/raffle/list'}, {
    //     title: 'Support',
    //     link: '/support'
    // }, {title: 'About/Contact', link: '/about'}],
    privateLink: [
        {"link": 'https://github.com/ErgoRaffle', "title": "Github"},
        {"link": 'https://github.com/ErgoRaffle/raffle-documentation', "title": "Whitepaper"},
        {"link": 'https://github.com/ErgoRaffle', "title": "Raffle Beta"},
    ],
    publicLink: [
        {"link": 'https://t.me/ergoplatform', "title": "Telegram"},
        {"link": 'https://twitter.com/ergoplatformorg', "title": "Twitter"},
        {"link": 'https://discord.gg/ahktsCT9TM', "title": "Discord"},
        {"link": 'https://www.ergoforum.org/', "title": "Ergo Platform"},
        {"link": 'https://www.ergoforum.org/', "title": "Ergo Forum"},
    ],
    socials: {
        'Telegram': 'https://t.me/ergoplatform',
        'Twitter': 'https://twitter.com/ergoplatformorg',
        'Github': 'https://github.com/ErgoRaffle',
        'Discord': "https://discord.gg/ahktsCT9TM",
        'Whitepaper': "https://github.com/ErgoRaffle/raffle-documentation",
        'Ergo Forum': "https://www.ergoforum.org/",
        'Ergo Platform': "https://www.ergoforum.org/"
    },
    shareInfo: {
        'Telegram': (url) => (`https://t.me/share/url?url=${url}&text=Ergo Raffle`),
        'WhatsApp': (url) => (`whatsapp://send?text=${url}`),
        'Twitter': (url) => (`http://twitter.com/share?text=Ergo Raffle&url=${url}`)
    },
    PAGE_SIZE: 12,
    ERG_SCALE: 1000000000,
    DAY_CONVERSION_SCALE: 720,
    FILE_SIZE_LIMITATION: 150000,
    UPLOAD_API_URL: 'https://ergoutilsupload.azurewebsites.net/ipfs/',
    FILE_URL_PREVIEW: 'https://cloudflare-ipfs.com/ipfs/',
    FILE_TO_SEND_PREFIX: 'ipfs://',
    winnerStateType: 'winner',
    charityStateType: 'charity',
    ticketStateType: 'ticket',
    descriptionLimit: 250,
    deadlineLimit: 262800,
    donationTickets: [5, 10, 20, 30]
}

export default staticText;

export {
    faq,
    about
}
