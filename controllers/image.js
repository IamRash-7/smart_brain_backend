const Clarifai=require('clarifai');

const app = new Clarifai.App({apiKey: 'dd21874e86244ac0b515f436abd82dd4'});


const handleApi=(req,res)=>{
app.models
  .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
  .then(data=>{
  	res.json(data);
  })
  .catch(err=>res.status(400).json("API not found"))
}

const handleImage=(req,res,db)=>{
	const {id}=req.body;
	db('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0]);
	})
	.catch(err=>res.status(400).json('Unable to get'))
}

module.exports={
	handleImage:handleImage,
	handleApi:handleApi
}