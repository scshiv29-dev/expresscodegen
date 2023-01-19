export const generateModel = (data: any, ModelName: String) => {
        const imports = `const mongoose = require("mongoose")`
        const exports = `module.exports = { ${ModelName.charAt(0).toUpperCase()}${ModelName.slice(1)}, ${ModelName.toLowerCase()}Schema };`
        var dd = ""
        data.forEach((elemet: any) => {
                const tt = dd
                var t = `\n             ${elemet.name.toLowerCase()}:{`
                if (elemet.type !== "Array") {
                        t = t + ` 
                        type:${elemet.type},`
                } else {
                        t = t + `
                        type:Array,
                        default:[],`
                }
                t = t + `
                        required:${elemet.required},`
                if (elemet.type !== "Array") {
                        t = t + `
                        unique:${elemet.unique},`
                }


                if (elemet.maxlength) {
                        t.concat(`maxlength:${elemet.maxlength},`)
                }


                dd = tt + t
        })
        console.log("dd", dd);

        const declare = `const ${ModelName.toLowerCase()}Schema = new mongoose.Schema({\n               ${dd}},
                        {timestamps:true})`
        const code = `${imports} \n ${declare}\n ${exports}`
        return code
}

