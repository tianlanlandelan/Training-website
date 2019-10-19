const testData={
	//leaderboard1 使用的得分数据
	scores1:[
		  	{
		  		id:1,
		  		sort:1,
		  		portrait:"../static/img/icon.png",
		  		name:"Peter Mandelson1",
		  		score:100,
		  		width:100
		  	},
		  	{
		  		id:2,
		  		sort:2,
		  		portrait:"../static/img/icon.png",
		  		name:"Peter Mandelson2",
		  		score:80,
		  		width:80
		  	},
		  	{
		  		id:3,
		  		sort:3,
		  		portrait:"../static/img/icon.png",
		  		name:"Peter Mandelson3",
		  		score:75,
		  		width:75
		  	},
		  	{
		  		id:4,
		  		sort:4,
		  		portrait:"../static/img/icon.png",
		  		name:"Peter Mandelson4",
		  		score:60,
		  		width:60
		  	},{
		  		id:5,
		  		sort:5,
		  		portrait:"../static/img/icon.png",
		  		name:"Peter Mandelson5",
		  		score:50,
		  		width:50
		  	}
		  ]
	,
	currentTopic : [{
			id:2001,
			sort:0,
			title:"Subtopic 5",
			status:2  //0:不能开始学习  1:可以学习 2:已学习
		},{
			id:2002,
			sort:1,
			title:"Subtopic 6",
			status:1
		},{
			id:2003,
			sort:2,
			title:"Subtopic 7",
			status:0
		},{
			id:2004,
			sort:3,
			title:"Subtopic 8",
			status:0
		}
	]
	,
	topics:[
	  	{
	  		id:1,
	  		title:"Topic 1",
	  		status:2,  // 0:尚未开始学习 1:学习中  2:已学完本节课所有课程
	  		subtopics:[{
	  			id:1001,
	  			sort:0,//子课程在课程中的排序
	  			title:"Subtopic 1",
	  			status:2  //0:不能开始学习  1:可以学习 2:已学习
	  		},{
	  			id:1002,
	  			sort:1,
	  			title:"Subtopic 2",
	  			status:2
	  		},{
	  			id:1003,
	  			sort:2,
	  			title:"Subtopic 3",
	  			status:2
	  		},{
	  			id:1004,
	  			sort:3,
	  			title:"Subtopic 4",
	  			status:2
	  		}
	  		]
	  	},
	  	{
	  	id:1001,
	  	title:"Topic 1",
	  	status:1,  // 0:尚未开始学习 1:学习中  2:已学完本节课所有课程
	  	subtopics:[{
	  		id:2001,
	  		sort:0,
	  		title:"Subtopic 5",
	  		status:2  //0:不能开始学习  1:可以学习 2:已学习
	  	},{
	  		id:2002,
	  		sort:1,
	  		title:"Subtopic 6",
	  		status:1
	  	},{
	  		id:2003,
	  		sort:2,
	  		title:"Subtopic 7",
	  		status:0
	  	},{
	  		id:2004,
	  		sort:3,
	  		title:"Subtopic 8",
	  		status:0
	  	}
	  	]
	  },
	  {
	  	id:1002,
	  	title:"Topic 3",
	  	status:0,
	  	subtopics:[{
	  		id:3001,
	  		sort:0,
	  		title:"Subtopic 9",
	  		status:0
	  	},{
	  		id:3002,
	  		sort:1,
	  		title:"Subtopic 10",
	  		status:0
	  	},{
	  		id:3003,
	  		sort:2,
	  		title:"Subtopic 11",
	  		status:0
	  	},{
	  		id:3004,
	  		sort:3,
	  		title:"Subtopic 12",
	  		status:0
	  	}
	  	]
	  }]
	,//TODO 这里应该放问题对象，包含该问题的答案，用户得分在前端计算 
	options:[{
		id:1,
		text:"You want to do some quick calculations.",
		title:"A"
	},{
		id:2,
		text:"For your new bussiness,you want to develop a database-driven website.",
		title:"B"
	},{
		id:3,
		text:"You boss asks you to clean and analyze the results of the latest satisfaction survey.",
		title:"C"
	},{
		id:4,
		text:"All of the above.",
		title:"D"
	}
	]
	,//用户对于一个问题的回答 
	answer:{
		id:1,
		userId:10,
		questionId:100,
		option:"C"
	}
	
}
const user={
	id:0,
	type:1,
	sid: '',
	email: '',
	password: '',
	code:'',
	firstName:'',
	lastName:'',
	avatarId:0,
	//初始化时赋值为true，此时用户尚未输入内容，不提示错误
	sidChecked:true,
	emailChecked:true,
	passChecked:true,
	//没有输入用户名时，提交按钮是禁用状态
	nameChecked:false,
	checkSid(){
	   if(this.sid == "" || !this.sid.startsWith("u")){
	   		this.sidChecked = false;
	   }else{
	   		this.sidChecked = true;
	   }
	   return this.sidChecked;
	},
	checkEmail(){
		if(this.email == "" || !this.email.endsWith("edu") || this.email.indexOf("@") < 0 ){
		   this.emailChecked = false;
		}else{
			this.emailChecked =  true;
		}
		return this.emailChecked;
	},
	checkPassword(){
		if(this.password == "" || this.password.length < 6){
			this.passChecked = false;
		}else{
			this.passChecked = true;
		}
		return this.passChecked;
	},
	checkUserName(){
		if(this.firstName == "" || this.lastName == ""){
			this.nameChecked = false;		   
		}else{
			this.nameChecked = true;
		}
		return this.nameChecked;
	}
}

const topic = {
	id:0,
	sort:0,
	title:"",
	content:"",
	videoTitle:"",
	videoUrl:"",
	createTime:"",
	init(){
		this.id=0,
		this.sort=0,
		this.title="",
		this.content="",
		this.videoTitle="",
		this.videoUrl="",
		this.createTime=""
	}
}

const exercise = {
	id:0,
	topicId:0,
	sort:0,
	title:"",
	content:"",
	img:"",
	question:"",
	optionA:"",
	optionB:"",
	optionC:"",
	optionD:"",
	answer:"",
	toString(){
		return "ExerciseInfo{" +
                "id=" + this.id +
                ", topicId=" + this.topicId +
                ", sort=" + this.sort +
                ", title='" + this.title + '\'' +
                ", content='" + this.content + '\'' +
                ", img='" + this.img + '\'' +
                ", question='" + this.question + '\'' +
                ", optionA='" + this.optionA + '\'' +
                ", optionB='" + this.optionB + '\'' +
                ", optionC='" + this.optionC + '\'' +
                ", optionD='" + this.optionD + '\'' +
                ", answer='" + this.answer + '\'' +
                '}';
	},
	init(){
		this.id=0,
		this.topicId=0,
		this.sort=0,
		this.title="",
		this.content="",
		this.img="",
		this.question="",
		this.optionA="",
		this.optionB="",
		this.optionC="",
		this.optionD="",
		this.answer=""
	}
}


const utils = {
	/**
	 * 获取url 中的带的查询参数
	 * @param {Object} name
	 */
	getParameter(name) {
		var query = window.location.search;
		var iLen = name.length;
		var iStart = query.indexOf(name);
		if(iStart == -1)
			return "";
		var iEnd = query.indexOf("&", iStart);
		if(iEnd != -1){
			return query.substring(iStart + iLen + 1,iEnd);
		}else{
			return query.substring(iStart + iLen + 1);
		}	
	}
}
export {
	testData,user,topic,exercise,utils
}