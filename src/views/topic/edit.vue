<!-- 编辑课时 -->
<template>
	<div>
		<el-form label-position="left" label-width="80px" >   
		<!-- 选择章节 -->
			<el-form-item label="章节">
				<el-select
					v-model="topic.chapterId"
					filterable
					default-first-option
					no-data-text="无章节,请先添加章节"
					placeholder="选择章节">
					<el-option
					  v-for="item in chapterList"
					  :key="item.id"
					  :label="item.name"
					  :value="item.id">
					</el-option>
				  </el-select>
			</el-form-item>
			<el-form-item label="标题">
				<el-input v-model="topic.title" placeholder="1.1 JavaScript发展史"></el-input>
			</el-form-item>
			<el-form-item label="类型">
				<el-radio v-model="type" label="0">视频</el-radio>
				<el-radio v-model="type" label="1">文章</el-radio>
			</el-form-item>
			<el-form-item label="视频" v-show="type === '0'">
				<el-upload
				    action="/upload/video"
					:limit="1"
					:before-upload="beforeAvatarUpload"
				    :on-success="handleSuccess"
					:on-exceed ="handleExceed">
				    <el-button size="small" type="primary">点击上传</el-button>
				    </el-upload>
			</el-form-item>
			<el-form-item label="内容" v-show="type === '1'">
				<!-- MarkDown编辑器 -->
				<MarkDown @func="markdownChanged" :mdstr="topic.contentMD" :htmlstr="topic.content" ref="markdown"></MarkDown>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click = "submit()">添加课时</el-button>
			</el-form-item>
		</el-form> 
	</div>
</template>

<script>
	import {req_saveTopic,req_getTopicInfo,req_getChapterList} from "../../api/api.js";
	import MarkDown from "../../components/MarkDown.vue";
	export default{
		components:{MarkDown},
		data(){
			return{
				type:'0',
				courseId:0,
				/**
				 * 章节列表
				 */
				chapterList:[],
				topic:{
					id			:0,
					courseId	:0,
					chapterId	:"",
					sort		:0,
					title		:"",
					content		:"",
					videoUrl	:""
				}
			}
		},
		methods:{
			/**
			 * 上传视频前，校验视频格式和大小
			 * @param {Object} file
			 */
			beforeAvatarUpload(file) {
				console.log("file.type",file.type);
				const isJPG = file.type === 'video/mp4';
				const isLt2M = file.size / 1024 / 1024 < 200;

				if (!isJPG) {
				  this.$message.error('上传视频只能是 MP4 格式!');
				}
				if (!isLt2M) {
				  this.$message.error('上传视频大小不能超过 200MB!');
				}
				return isJPG && isLt2M;
			  },
			//上传视频成功
			handleSuccess(response,file,fileList){
			    if(response.success == 0){
			        console.log(response);
					this.topic.videoUrl = response.data;
			    }
			},
			/**
			 * 超出上传最大个数（限制只能上传一个视频）
			 * @param {Object} file
			 * @param {Object} fileList
			 */
			handleExceed(file,fileList){
				this.$message({
				  message: "每个课时只能上传一个视频",
				  type: 'error'
				});
			},
			/**
			 * 保存课时
			 */
			submit(){
				if(this.topic.chapterId == ''){
					this.$notify.error({
						title:"Failed",
						message: "请选择章节"
					});
					return;
				}
				this.topic.courseId = this.courseId;
				let id = this.topic.id;
				let courseId = this.courseId;
				req_saveTopic(this.topic).then(response => {
				  console.log("Topic Saved，Response:",response);
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$notify.error({
						title:"Failed",
						message: message
				    });
				  } else {
				    this.$notify.success({
						title:"Success",
						essage: id==0?"添加课时成功":"修改课时成功"
				    });
					this.$router.push({ path: '/TopicList', query: { courseId:courseId }});
				  }
				});
			},
			/**
			 * 获取课时详情
			 */
			getTopicInfo(){
				req_getTopicInfo(this.topic.id).then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$notify.error({
						title:"Failed",
						message: message
				    });
				  } else {
				    this.topic = data;
					if(this.topic.contentMD){
						this.type = "1";
						//将课程内容回显在 MarkDown 编辑器中
						this.$refs.markdown.load(this.topic.contentMD,this.topic.content);
					}
				  }
				});
			},
			/**
			 * 获取章节列表
			 */
			getChapterList(){
				req_getChapterList(this.courseId).then(response => {
				  //解析接口应答的json串
				  let { data, message, success } = response;
				  //应答不成功，提示错误信息
				  if (success !== 0) {
				    this.$notify.warning({
					  title:'warning',
				      message: message
				    });
				  } else {
				    this.chapterList = data;
				  }
				});
			},
			markdownChanged(content,html){
				this.topic.contentMD = content;
				this.topic.content = html;
			}
		},mounted(){	
			if(this.$route.query.courseId){
				this.courseId  = this.$route.query.courseId;
				console.log("topicEdit",this.courseId);
			}
			if(this.$route.query.id){
				this.topic.id  = this.$route.query.id;
				this.getTopicInfo();
			}
			this.getChapterList();
    
		}
	}
	
</script>

<style scoped>
</style>
