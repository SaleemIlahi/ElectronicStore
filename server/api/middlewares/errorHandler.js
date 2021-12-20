
exports.errorHandler = (err,req,res,next) => {
    
    const codeStatus = err.status || 500
    const codeMessage =  err.message || 'Internal Server Error'
    
    res.status(codeStatus).json({
        error: {
            status: codeStatus,
            message: codeMessage,
        }
    })
}