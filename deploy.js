const hre = require('hardhat')

async function main() {
  const [deployer] = await hre.ethers.getSigners()
  console.log('Deploying with:', deployer.address)

  const SOT = await hre.ethers.getContractFactory('StressOffsetToken')
  const sot = await SOT.deploy()
  await sot.waitForDeployment()
  console.log('SOT deployed:', await sot.getAddress())

  const POC = await hre.ethers.getContractFactory('ProofOfCareNFT')
  const poc = await POC.deploy()
  await poc.waitForDeployment()
  console.log('POC deployed:', await poc.getAddress())
}

main().catch((e) => {
  console.error(e)
  process.exitCode = 1
})
