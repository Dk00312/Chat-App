const Messages = require('../model/messageModel')


module.exports.addMessage = async(req, res, next) => {
    try{
        const {from , to, message} = req.body;
        const data = await Messages.create({
            message:{text:message},
            users:[from, to],
            sender:from
        })

        if(data) 
            return res.status(200).json({
                success:true,
                message:"Message Added successfully"
            })
        return res.status(400).json({
            success:false,
            message:"Can't add message to DB"
        })    
    }catch(err){
        console.log(err);
    }
}
module.exports.getAllMessage = async(req, res, next) => {
    try{
        const {from , to} = req.body;
        const messages = await Messages.find({users:{$all:[from, to]}}).sort({updatedAt:1});
        const projectMessages = messages.map((message)=>{
            return{

                fromSelf:message.sender.toString() === from,
                message:message.message.text,
            }
        })
        res.json(projectMessages);
        
    }catch(err){

    }
}