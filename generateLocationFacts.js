const fs = require('fs')
const generateRules = (path) => {
    const json = JSON.parse(fs.readFileSync(path))
    json.data.filter(step => step.t).map(step => {
        console.log(`location(frc${json.team.replace("#", "")}, ${step.t}, ${step.x}, ${step.y}).`)
    })
}





const filePaths = process.argv.slice(2)
if (filePaths.length === 0) {
    console.error("Requires at least one file path argument")
    process.exit(-1)
}
filePaths.map( p => generateRules(p))