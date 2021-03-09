const config = require('../config.json')
let {
    LcdClient,
    setupAuthExtension,
    setupBankExtension,
    setupDistributionExtension,
    setupGovExtension,
    setupMintExtension,
    setupSlashingExtension,
    setupStakingExtension,
    setupSupplyExtension,
} = require("@cosmjs/launchpad");

let {
    getDataProvidersPool
} = require('./oracleCustomRequests.js')

let {
    getParams,
    getCurrentRate
} = require('./coinswapRequests')

async function main() {

    const client = LcdClient.withExtensions(
        {apiUrl: config.api},
        setupAuthExtension,
        setupBankExtension,
        setupDistributionExtension,
        setupGovExtension,
        setupMintExtension,
        setupSlashingExtension,
        setupStakingExtension,
        setupSupplyExtension,
    );

    // Example queries
    //const balances = await client.bank.balances(myAddress);
    console.log('Distribution parameters: ', await client.distribution.parameters());
    console.log('Gov proposals: ', await client.gov.proposals());
    console.log('Mint inflation: ', await client.mint.inflation());
    console.log('Slashing signingInfos: ', await client.slashing.signingInfos());
    console.log('Staking redelegations: ', await client.staking.redelegations());
    console.log('Supply totalAll: ', await client.supply.totalAll());
    console.log('Fee pool:', await client.distribution.communityPool())
    console.log('Data providers pool', (await getDataProvidersPool()).data)
    console.log('Current rate', (await getCurrentRate()).data)
    console.log('Coinswap params', (await getParams()).data)
}

main()