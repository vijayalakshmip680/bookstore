const jwt=require('jsonwebtoken')


const createToken=(userData)=>{
    // payload to sign in to the token
    
    // const payload=userData

    const { password, ...payload } = userData;


    // Sign the token with a secret key to generate the token

    const token=jwt.sign(payload,process.env.SECRET,{
        // expiresIn:'10s'
        expiresIn:'5h'
    })

    return token
}

module.exports=createToken