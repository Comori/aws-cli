import core from '@actions/core'
import github from '@actions/github'
import glob from '@actions/glob'

run()

async function run(){
    try {
        // The `who-to-greet` input is defined in action metadata file
        const awsSecretAccessKey = core.getInput('aws-access-key-id', { required: true })
        core.info(`Hello, ${awsSecretAccessKey}!`)

        const globber = await glob.create(core.getInput('files'))

        for await (const file of globber.globGenerator()) {
            core.info(`file---${file}`)
        }
        
    
        // Get the current time and set as an output
        const time = new Date().toTimeString()
        core.setOutput('time', time)
    
        // Output the payload for debugging
        core.info(
          `The event payload: ${JSON.stringify(github.context.payload, null, 2)}`
        )
      } catch (error) {
        // Fail the workflow step if an error occurs
        core.setFailed(error.message)
      }
}