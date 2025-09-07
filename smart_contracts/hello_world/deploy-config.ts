import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { MemoryGameFactory } from '../artifacts/hello_world/MemoryGameClient'

// Below is a showcase of various deployment options you can use in TypeScript Client
export async function deploy() {
  console.log('=== Deploying HelloWorld ===')

  const algorand = AlgorandClient.fromEnvironment()
  const deployer = await algorand.account.fromEnvironment('DEPLOYER')

  const factory = algorand.client.getTypedAppFactory(MemoryGameFactory, {
    defaultSender: deployer.addr,
  })

  const { appClient, result } = await factory.deploy({ onUpdate: 'append', onSchemaBreak: 'append' })

  // If app was just created fund the app account
  if (['create', 'replace'].includes(result.operationPerformed)) {
    await algorand.send.payment({
      amount: (1).algo(),
      sender: deployer.addr,
      receiver: appClient.appAddress,
    })
  }

 const method = 'hello'  
 const response = await appClient.send.guess({
  args:{
    num: 3
  }
 })
  console.log(
    `Called ${method} on ${appClient.appClient.appName} (${appClient.appClient.appId})  ${response.return}`,
  )
}