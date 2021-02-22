// External Dependancies
const boom = require('boom')
const axios = require('axios')
const { Contract, providers, utils } = require('ethers')

const ether = new providers.InfuraProvider(null, '4aee4574ac174e1790b63e51620836fa')

// Get Data Models
const Catx = require('../models/Catx')
const Snapshot = require('../models/Snapshot')

const getBalance = async (account, contractAddress) => {
  const minABI = [
    {
      constant: true,
      inputs: [{ name: '_owner', type: 'address' }],
      name: 'balanceOf',
      outputs: [{ name: 'balance', type: 'uint256' }],
      type: 'function'
    }
  ]
  const contract = new Contract(contractAddress, minABI, ether)
  const balance = await contract.balanceOf(account)
  return utils.formatEther(balance)
}

// Get all catx holders
exports.getCatx = async (req, reply) => {
  try {
    const catx = await Catx.find({})
    return catx
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single catx holder by address
exports.getSingleCatx = async (req, reply) => {
  try {
    const address = req.params.address
    snapshot = await Snapshot.find({ address: address.toLowerCase() })
    return snapshot
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new catx holder to opt-out
exports.addCatx = async (req, reply) => {
  try {
    const catx = new Catx(req.body)
    snapshot = await Snapshot.find({ address: catx.address.toLowerCase() })
    existingCatx = await Catx.find({ address: catx.address })
    if (snapshot.length && !existingCatx.length) {
      catx.save()
      axios.post('https://canary.discord.com/api/webhooks/813412983354687498/SjaXBXC2h3vtdkXbMBgKLpSHR6I0pFKl6NnWuCqMD8EzCjm4k0h7eb0NPqaNZZkNqyjc', {
        embeds: [
          {
            title: 'Opt-out',
            color: 44287,
            fields: [
              {
                name: 'Address',
                value: snapshot[0].address,
                inline: true
              },
              {
                name: 'Amount',
                value: snapshot[0].balance,
                inline: true
              }
            ]
          }
        ],
        username: 'CATX Hodl Bounty',
        avatar_url: 'https://cdn.discordapp.com/attachments/212265914031144960/780759182499643432/cat-logo.png'
      })
    }
    return snapshot
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Checks all addresses to see if they maintained their balance
exports.checkAddresses = async (req, reply) => {
  try {
    snapshot = await Snapshot.find({ maintained: true })
    snapshot.forEach(holder => {
      getBalance(holder.address, '0xc7743bf0b300ec041e704cc34d4f43050942099e')
        .then(async (amount) => {
          if (parseFloat(amount) < Math.floor(holder.balance)) {
            await Snapshot.findOneAndUpdate({ address: holder.address }, { maintained: false })
          }
        }).catch({})
    })
    return { success: true }
  } catch (err) {
    throw boom.boomify(err)
  }
}
