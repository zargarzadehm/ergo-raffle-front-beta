const staticText = {
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris odio faucibus nunc nullam egestas sit non egestas. Feugiatvitae, sed pharetra integer eget est pellentesque. Vel dictum elit, nibh leo consequat, euismod etiam eu. Nullam cursus orci ac vitae nunc fringilla. Purus convallis fringilla hac amet orci tincidunt. Nulla nulla viverra tempor volutpat placerat morbi amet eu leo. Viverra non, sit imperdiet ac felis dictum vitae proin quam. Non quis egestas semper ultrices. Et at nisi enim viverra sed. Tempor sit arcu nunc sed diam alique',
    homeFooterText: 'A raffle is a crowdfunding service that aims to enable anyone to raise enough money needed for a project. The project can be a direct donation to a charity, an academic or business plan, or anything else the creator can convince people to part with their hard-earned ERG for. As an added bonus, after finishing the raffle, a lottery takes place, and a lucky participant wins the raffle reward.',
    faq: [{ question: 'q 1', answer: 'answer 1' }, { question: 'q 2', answer: 'answer 2' }, { question: 'q 3', answer: 'answer 3' }, { question: 'q 4', answer: 'answer 4' }, { question: 'q 5', answer: 'answer 5' }],
    homeTabs: ['Newest Raffles', 'Top Raffles', 'Near To DeadLines'],
    dashboardTabs: ['Ask For Help', 'FAQ and Problems'],
    supportTabs: ['Active Raffles', 'Raffles', 'FAQ and problems'],
    raffleListTabs: [{label: 'All Raffles', value: 'all'}, {label: 'Active', value: 'active'}, {label: 'Successful', value: 'succeed'}, {label: 'Failed', value: 'failed'}],
    navigations: [{ title: 'Home', link: '/' }, { title: 'All Raffles', link: '/raffle/list' }, { title: 'FAQ', link: '/faq' }, { title: 'About/Contact', link: '/about' }],
    footers: [{ title: 'All Raffles', link: '/raffle/list' }, { title: 'Support', link: '/support' }, { title: 'About/Contact', link: '/about' }],
    socials: { 'Telegram': 'https://t.me/ergoplatform', 'Twitter': 'https://twitter.com/ergoplatformorg', 'Github': 'https://github.com/ErgoRaffle', 'Discord': "https://discord.gg/ahktsCT9TM", 'Whitepaper': "https://github.com/ErgoRaffle/raffle-documentation", 'Ergo Forum': "https://www.ergoforum.org/", 'Ergo Platform': "https://www.ergoforum.org/" },
    PAGE_SIZE: 12,
    ERG_SCALE: 1000000000,
    DAY_CONVERSION_SCALE: 720,
    FILE_SIZE_LIMITATION: 200000,
    UPLOAD_API_URL: 'https://ergoutilsupload.azurewebsites.net/ipfs/',
    FILE_URL_PREVIEW: 'https://cloudflare-ipfs.com/ipfs/',
    FILE_TO_SEND_PREFIX: 'ipfs://',
    winnerStateType: 'winner',
    charityStateType: 'charity',
    ticketStateType: 'ticket'
}

export default staticText;