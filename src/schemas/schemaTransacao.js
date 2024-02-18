const joi = require('joi')

const shcemaTransacao = joi.object({
    descricao: joi.string().pattern(/.*\S.*/).required().messages({
        'string.pattern.base': 'O campo descricao quando preenchido não pode ser encaminhado vazio.',
        'any.required': 'O campo descricao é obrigatório',
        'any.empty': 'O campo descricao é obrigatório'
    }),
    valor: joi.number().integer().required().greater(0).messages({
        'number.greater': 'O campo valor deve possuir um valor maior do que 0 (zero).',
        'number.base': 'O campo valor deve ser preenchido com um valor numérico.',
        'any.required': 'O campo valor é obrigatório.'
    }),
    categoria_id: joi.number().greater(0).integer().required().messages({
        'number.greater': 'O campo categoria_id deve possuir um valor maior do que 0 (zero).',
        'number.base': 'O campo categoria_id deve ser preenchido com um valor numérico.',
        'any.required': 'O campo categoria_id é obrigatório.'
    }),
    tipo: joi.string().valid('entrada', 'saída').insensitive().pattern(/.*\S.*/).required().messages({
        'string.pattern.base': 'O campo tipo quando preenchido não pode ser encaminhado vazio.',
        'any.required': 'O campo tipo é obrigatório',
        'any.empty': 'O campo tipo é obrigatório',
        'any.only': 'o campo tipo deve ser somente "entrada" ou "saída"'
    })
})

module.exports = shcemaTransacao