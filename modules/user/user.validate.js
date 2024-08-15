import joi from 'joi'

export const registration  = joi.object({

    name:joi.string().min(0).max(20).required(),
    email: joi.string().required().email(),
    password:joi.string().required().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)).min(3),
    repassword:joi.string().required().valid(joi.ref('password'))
}).required()
export const login_schema  = joi.object({

    email: joi.string().required().email(),
    password:joi.string().required(),
}).required()

export const forget_schema = joi.object({

    email: joi.string().required().email(),
}).required()

export const resetPassword_schema = joi.object({

    forgetcode: joi.string().required().length(5),
    Newpassword:joi.string().required().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)).min(3),
    repassword:joi.string().required().valid(joi.ref('Newpassword'))

}).required()

export const upgradeUserSchema = joi.object({
    role:joi.string().valid('Admin','suberAdmin').required(),
    email: joi.string().required().email(),

})

export  const deleteuserSchema =joi.object({
    email: joi.string().required().email(),
    
})