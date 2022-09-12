<template>
  <div>
    <div class="i-layout-page-header">
      <div class="i-layout-page-header">
        <span class="ivu-page-header-title">{{ $route.meta.title }}</span>
      </div>
    </div>
    <Card :bordered="false" dis-hover class="ivu-mt">
      <Form
        ref="formValidate"
        :model="formValidate"
        :label-width="labelWidth"
        :label-position="labelPosition"
        @submit.native.prevent
      >
        <!-- <Row type="flex" :gutter="24">
          <Col v-bind="grid">
            <FormItem label="状态：" label-for="status1">
              <Select v-model="status" placeholder="请选择" @on-change="userSearchs" clearable>
                <Option value="all">全部</Option>
                <Option value="1">开启</Option>
                <Option value="0">关闭</Option>
              </Select>
            </FormItem>
          </Col>
          <Col v-bind="grid">
            <FormItem label="搜索：" label-for="status2">
              <Input
                search
                enter-button
                placeholder="请输入账号"
                v-model="formValidate.name"
                @on-search="userSearchs"
              />
            </FormItem>
          </Col>
        </Row> -->
        <Row type="flex" v-if="total == 0">
          <Col v-bind="grid">
            <Button v-auth="['setting-system_admin-add']" type="primary" @click="add" icon="md-add">添加账号</Button>
          </Col>
        </Row>
      </Form>
      <Table
        :columns="columns1"
        :data="list"
        class="mt25"
        no-userFrom-text="暂无数据"
        no-filtered-userFrom-text="暂无筛选结果"
        :loading="loading"
        highlight-row
      >
        <template slot-scope="{ row, index }" slot="roles">
          <div v-if="row.roles.length !== 0">
            <Tag color="blue" v-for="(item, index) in row.roles.split(',')" :key="index" v-text="item"></Tag>
          </div>
        </template>
        <template slot-scope="{ row, index }" slot="status">
          <i-switch
            v-model="row.status"
            :value="row.status"
            :true-value="1"
            :false-value="0"
            @on-change="onchangeIsShow(row)"
            size="large"
          >
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <a @click="edit(row)">编辑</a>
          <Divider type="vertical" />
          <a @click="del(row, '删除账号', index)">删除</a>
        </template>
      </Table>
      <div class="acea-row row-right page">
        <Page
          :total="total"
          :current="formValidate.page"
          show-elevator
          show-total
          @on-change="pageChange"
          :page-size="formValidate.limit"
        />
      </div>
    </Card>
    		<Modal v-model="modals" scrollable :title="type == 0?'添加账号':'编辑账号'" :mask-closable="false" :closable="false">
			<Form ref="modalsdate" :model="modalsdate" :rules="type == 0 ? ruleValidate : editValidate" :label-width="50" label-position="right">
				<FormItem label="账号" prop="appid" >
					<div style="display: flex;">
						<Input type="text" v-model="modalsdate.appid" :disabled='type != 0'></Input>
					</div>
				</FormItem>
				<FormItem label="密码" prop="appsecret">
					<div style="display: flex;">
						<Input type="text" v-model="modalsdate.appsecret" class="input"></Input>
						<Button type="primary" @click="reset" class="reset">重置</Button>
					</div>
				</FormItem>
				<FormItem label="描述" prop="title">
					<div style="display: flex;">
						<Input type="textarea" v-model="modalsdate.title"></Input>
					</div>
				</FormItem>
			</Form>
			<div slot="footer">
				<Button v-if="modalsid == ''" type="primary" @click="ok('modalsdate')">确定</Button>
				<Button v-else type="primary" @click="oks('modalsdate')">确定</Button>
				<Button @click="cancel">取消</Button>
			</div>
		</Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { accountListApi, outSaveApi, outSavesApi, setShowApi } from '@/api/systemOutAccount';
export default {
  name: 'systemOut',
  data() {
    return {
      grid: {
        xl: 7,
        lg: 7,
        md: 12,
        sm: 24,
        xs: 24,
      },
      total: 0,
      loading: false,
      roleData: {
        status1: '',
      },
      formValidate: {
        roles: '',
        status: '',
        name: '',
        page: 1, // 当前页
        limit: 20, // 每页显示条数
      },
      status: '',
      list: [],
      columns1: [
        {
          title: '账号',
          key: 'appid',
          minWidth: 150,
        },
        {
          title: '描述',
          key: 'title',
          minWidth: 250,
        },
        {
          title: '添加时间',
          key: 'add_time',
          minWidth: 180,
        },
        {
          title: '最后登录时间',
          key: 'last_time',
          minWidth: 180,
        },
        {
          title: '最后登录ip',
          key: 'ip',
          minWidth: 180,
        },
        {
          title: '状态',
          slot: 'status',
          minWidth: 90,
        },
        {
          title: '操作',
          key: 'action',
          slot: 'action',
          fixed: 'right',
          minWidth: 120,
        },
      ],
      FromData: null,
      modalTitleSs: '',
      ids: Number,
      modals: false,
      modalsid: '',
      type: 0,
      modalsdate:{
        appid: "",
        appsecret: '',
        title: ''
      },
      ruleValidate: {
        appid: [
         { required: true, message: '请输入正确的账号 (4到30位之间)', trigger: 'blur', min:4, max:30}
        ],
        appsecret: [
          { required: true, message: '请输入正确的密码 (6到32位之间)', trigger: 'blur', min:6, max:32 }
        ],
        title: [
          {message: '请输入正确的描述 (不能多于200位数)', trigger: 'blur', max:200 }
        ]
      },
      editValidate: {
        appsecret: [
          { required: false, message: '请输入正确的密码 (6到32位之间)', trigger: 'blur', min:6, max:32 }
        ]
      },
    };
  },
  computed: {
    ...mapState('media', ['isMobile']),
    labelWidth() {
      return this.isMobile ? undefined : 50;
    },
    labelPosition() {
      return this.isMobile ? 'top' : 'left';
    },
  },
  created() {
    this.getList();
  },
  methods: {
    // 开启状态
    onchangeIsShow(row) {
      let data = {
        id: row.id,
        status: row.status,
      };
      setShowApi(data)
        .then(async (res) => {
          this.$Message.success(res.msg);
        })
        .catch((res) => {
          this.$Message.error(res.msg);
        });
    },
    // 请求列表
    submitFail() {
      this.getList();
    },
    // 列表
    getList() {
      this.loading = true;
      this.formValidate.roles = this.formValidate.roles || '';
      accountListApi(this.formValidate)
        .then(async (res) => {
          this.total = res.data.count;
          this.list = res.data.list;
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
          this.$Message.error(res.msg);
        });
    },
    pageChange(index) {
      this.formValidate.page = index;
      this.getList();
    },
    // 添加
    add() {
      this.modals = true
      this.type = 0
    },
    // 编辑
    edit(row) {
      this.modals = true
      this.modalsdate.appid = row.appid
      this.modalsdate.title = row.title
      this.modalsid = row.id
      this.type = 1
    },
    // 删除
    del(row, tit, num) {
      let delfromData = {
        title: tit,
        num: num,
        url: `setting/system_out_account/${row.id}`,
        method: 'DELETE',
        ids: '',
      };
      this.$modalSure(delfromData)
        .then((res) => {
          this.$Message.success(res.msg);
          this.list.splice(num, 1);
        })
        .catch((res) => {
          this.$Message.error(res.msg);
        });
    },
    // 搜索
    userSearchs() {
      this.formValidate.status = this.status === 'all' ? '' : this.status;
      this.formValidate.page = 1;
      this.list = [];
      this.getList();
    },
    ok(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          outSaveApi(this.modalsdate).then(res=>{
            this.modalsdate = {
              appid: "",
              appsecret: '',
              title: ''
            }
            this.modals = false,
            this.$Message.success(res.msg);
            this.modalsid = ''
            this.getList()
          }).catch(err=>{
            this.$Message.error(err.msg);
          })
        } else {
          this.$Message.warning("请完善数据");
        }
      });
    },
    oks(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          delete this.modalsdate.appid
          outSavesApi(this.modalsid,this.modalsdate).then(res=>{
            this.modalsdate = {
              appid: "",
              appsecret: '',
              title: ''
            }
            this.modals = false,
            this.$Message.success(res.msg);
            this.modalsid = ''
            this.getList()
          }).catch(err=>{
            this.$Message.error(err.msg);
          })
        } else {
          this.$Message.warning("请完善数据");
        }
      });
    },
    cancel(){
      this.modalsid = ''
      this.modalsdate = {
        appid: "",
        appsecret: '',
        title: ''
      }
      this.modals = false
    },
    reset(){
      let len = 16
      let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' 
      let maxPos = chars.length
      let pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos))
      }
      this.modalsdate.appsecret =  pwd
    },
  },
};
</script>

<style scoped>
  .reset {
    margin-left: 10px;
  }
</style>
