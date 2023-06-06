//copyRight.js
const fs = require('fs')

class myPlugin {
    // constructor(filePath) {
    //
    // }
    apply(compiler){
        compiler.hooks.done.tap('WriteFileName',(stats)=>{
            const fileNames = Object.keys(stats.compilation.assets)
            const fileNamesStr = fileNames.join('\n')
            fs.writeFile('./src/output.md',fileNamesStr,err => {
                if(err){
                    console.log(err)
                }
                else {
                    console.log('OK')
                }

            })
        })
    }



}

module.exports = myPlugin;