import { generateControllerAndRoutes } from "./generateController";

export const generateModel = (data: any, ModelName: String) => {
        const imports = `const mongoose = require("mongoose")
const express = require('express');
const router = express.Router();

`
        const captialize = `${ModelName.charAt(0).toUpperCase()}${ModelName.slice(1)}`
        const exports = `const ${captialize} = mongoose.model('${captialize}',${ModelName}Schema};`
        let properties = '';

        Object.entries(data).forEach(([key, value]: any) => {
                let property = `\n      ${value.name.toLowerCase()}: {`;

                switch (value.type) {
                        case 'Array':
                                property += `\n          type: Array,`;
                                property += `\n          default: [],`;
                                break;
                        default:
                                property += `\n          type: mongoose.Schema.Types.${value.type},`;
                                if (value.default.has) {
                                        property += `\n          default: "${value.default.value},"`;
                                }
                                property += `\n          required: ${value.required},`;
                                if (value.type !== 'Array') {
                                        property += `\n          unique: ${value.unique},`;
                                }
                                if (value.type === 'String') {
                                        if (value.maxlength > 0) {
                                                property += `\n          maxlength: ${value.maxlength},`;
                                        }
                                        if (value.minlength > 0) {
                                                property += `\n          minlength: ${value.minlength},`;
                                        }
                                }
                                break;
                }

                properties += property + '\n      },';
        });

        const declare = `const ${ModelName.toLowerCase()}Schema = new mongoose.Schema({${properties}\n    }, {timestamps: true});`
        const controllerCode = generateControllerAndRoutes(captialize)
        const code = `${imports} \n ${declare}\n ${exports} \n${controllerCode}`
        return code
}
