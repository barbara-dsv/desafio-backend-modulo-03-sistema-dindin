const joi = require('joi')

const schemaUsuario = joi.object({
    nome: joi.string().pattern(/.*\S.*/).required().messages({
        'string.pattern.base': 'O campo nome quando preenchido não pode ser encaminhado vazio.',
        'any.required': 'O campo nome é obrigatório',
        'any.empty': 'O campo nome é obrigatório'
    }),
    email: joi.string().pattern(/.*\S.*/).email().required().messages({
        'string.email': 'O campo email precisa ter um formato válido',
        'any.required': 'O campo email é obrigatório',
        'string.empty': 'O campo email é obrigatório',
        'string.pattern.base': 'O campo email quando preenchido não pode ser encaminhado vazio.',
    }),
    senha: joi.string().min(5).pattern(/.*\S.*/).required().messages({
        'any.required': 'O campo senha é obrigatório',
        'string.empty': 'O campo senha é obrigatório',
        'string.min': 'A senha precisa conter, no mínimo, 5 caracteres',
        'string.pattern.base': 'O campo senha quando preenchido não pode ser encaminhado vazio.',
    })
})

module.exports = schemaUsuario