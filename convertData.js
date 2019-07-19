const fs = require('fs')

const convertData = (contents) => {
    let lines = contents.split("\n");
    let metaData = lines.splice(0, 1)[0].split(",");
    let data = lines.map((l) => l.split(","));
    data = data.map((row) => {
        return {
            x: parseFloat(row[0]),
            y: parseFloat(row[1]),
            t: parseFloat(row[2]),
        }
    })
    let match = {
        team: metaData[0],
        matchNo: metaData[1],
        color: data[0].x < 20 ? 'red' : 'blue',
        data
    }
    return match
}

const filePath = process.argv[2]
if (!filePath) {
    console.error("Requires file path argument")
    process.exit(-1)
}

const contents = new String(fs.readFileSync(filePath))
const convertedData = JSON.stringify(convertData(contents))
const [name, _ ] = filePath.split(".")
fs.writeFileSync(`${name}.json`, convertedData)