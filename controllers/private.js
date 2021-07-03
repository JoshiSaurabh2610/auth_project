export const getPrivateData = (req,res,next)=>{
    res.status(200).json({
        sucess:true,
        data: "You got access to Private Routes"
    })
}
