import React from "react";

const faq = [
    {
        question: 'What is a raffle?',
        answer: (
            <div>
                A raffle is a crowdfunding service that aims to enable anyone to raise enough money
                needed for a project. The project can be a direct donation to a charity, an academic
                or business plan, or anything else the creator can convince people to part with their hard-earned ERG
                for.
                <br/>
                As an added bonus, after finishing the raffle, a lottery takes place, and a lucky participant wins the
                raffle reward.
                <br/>
                The probability of winning the raffle reward is proportional to the participation;
                the more donations to the crowdfunding campaign, the more chance of winning the prize!
                <br/>
                This raffle service is based on the Ergo network and raises Ergs for the projects.
                Other raffle settings are adaptable and can be customized by the raffle creator.
            </div>
        )
    }, {
        question: 'How to create a new raffle?',
        answer: (
            <div>
                This service is open for anyone who wants to start a legal crowdfunding campaign!
                <br/>
                To start a new raffle, visit the "Create Raffle" page and fill in the specified information,
                including a description, price, funding goal, raffle deadline, and a winner reward percentage.
                <br/>
                An address is then created based on the provided information, and you pay a small network fee to
                start the raffle. The proxy contract working behind the scenes for the raffle creation guarantees
                that the raffle is created with your specified information. In case of any issues, you can refund your
                creation fee before the raffle is created.
                <br/>
            </div>
        )
    }, {
        question: 'How to participate in a raffle?',
        answer: (
            <div>
                Anyone can participate in the active raffles by buying tickets. The raffle creator sets the ticket
                price, and the number of tickets you purchase will determine your chance of winning the prize pool.
                However, there is no benefit to splitting your orders to try and garner a higher chance of winning and
                it is best to buy at once.
                <br/>
                You set the wallet address and specify the number of tickets you want to buy on the raffle page. An
                address is generated to which you send funds to complete your order.
                <b> Please pay close attention to the wallet address you've set </b>
                as any rewards will also be sent to this address if you win the raffle. Or in the case of an
                unsuccessful raffle or any problems, refunds will also be sent to this address.
            </div>
        )
    }, {
        question: 'How do raffles finish?',
        answer: (
            <div>
                Each raffle has a deadline set based on the network height and a goal set by the raffle creator for
                raised funds. If the raffle can raise enough money within the deadline, it will be marked as successful
                and funded. At the same time, the raffle prize-pool winner will also be announced and rewarded.
                <br/>
                If the raffle can not raise enough money within the deadline, the raffle is unsuccessful, and all
                donators will be refunded. You are free to submit again with improvements or based on feedback from the
                community.
            </div>
        )
    }, {
        question: 'What are raffle fees?',
        answer: (
            <div>
                There are three types of fees within raffles. A raffle creation fee, a raffle donation fee, and a
                service fee. The first two fees are just network transaction fees; we do not charge any more for the
                service than facilitating the raffle creation and donation.
                <br/>
                Currently, 5% of the total raised money by a successful raffle is paid as a service fee.
                <br/>
                It is worth mentioning that the service is fully decentralized; anyone can join the raffle or mark a
                raffle as successful or unsuccessful and take the needed actions. However, this service is designed such
                that anyone with any amount of knowledge can use it. The service uses proxy contracts for its
                activities; an advanced user can use this service through raw scripts and reduce the proxy transaction
                fees. You can read more technical details on the documentation page.
            </div>
        )
    }
]

export default faq
