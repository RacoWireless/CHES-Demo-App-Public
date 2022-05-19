

/**
 * AWS COGNITO CREDENTIALS
 */
const CogintoConstant = {
    COGINTO_ISSUER: `https://cognito-idp.${process.env.AWSREGION}.amazonaws.com/${process.env.AWS_COGNITO_USER_POOL_ID}`,
    URL: `https://cognito-idp.${process.env.AWSREGION}.amazonaws.com/${process.env.AWS_COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
    TOKEN_USE: {
        ACCESS: "access",
        ID: "id"
    }
}
module.exports = CogintoConstant