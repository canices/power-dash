import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { toTreeData } from '/@/utils/common';
import { getPostByDept } from '/@/api/system/post';
import { getRoleList, getRoleAuthList } from '/@/api/system/role';

export const columns : BasicColumn[] = [
  {
    title: '员工编号',
    dataIndex: 'id',
    fixed: 'left'
  },
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'nickName',
    width: 120,
  },
  {
    title: '性别',
    dataIndex: 'sex',
    customRender: ({ record }) => {
      // const status = record.sex;
      // const enable = ~~status === 0;
      // const color = enable ? 'green' : 'red';
      // const text = enable ? '男' : '女';
      // return h(Tag, { color: color }, () => text);
      return record.sex === 0 ? '男' : '女';
    },
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: '部门',
    dataIndex: 'deptName',
    width: 180,
  },
  {
    title: '岗位',
    dataIndex: 'postName',
    width: 180,
  },
  {
    title: '状态',
    width: 150,
    dataIndex: 'status',
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
];

export const searchFormSchema : FormSchema[] = [
  {
    field: 'account',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
];


export const userFormSchema : FormSchema[] = [
  {
    field: 'id',
    label: '员工编号',
    dynamicDisabled: true,
    component: 'Input',
    required: true,
    ifShow: ({ values }) => {
      return ~~values.id > 0
    },
  },
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    required: true,
  },
  {
    field: 'nickName',
    label: '昵称',
    component: 'Input',
    required: true,
  },
  {
    label: '性别',
    field: 'sex',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '男', value: 0 },
        { label: '女', value: 1 },
      ],
    },
    required: true,
  },
  {
    label: '联系方式',
    field: 'phone',
    component: 'Input',
    required: true,
    rules: [{
      validator: async (rule, value) => {
        if ((/^(([1][3,4,5,7,8,9]\d{9})|([0]\d{10,11})|(\d{7,8})|(\d{4}|\d{3})-(\d{7,8}))$/.test(value))
          || (/^\d{3}-\d{8}|\d{4}-\d{7}$/.test(value))) {
          return Promise.resolve;
        }
        return Promise.reject('联系方式格式错误！');
      },
      trigger: 'blur',
    }]
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
    rules: [{
      validator: async (rule, value) => {
        if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value))) {
          return Promise.reject('邮箱格式错误！');
        }
        return Promise.resolve;
      },
      trigger: 'blur',
    }]
  },
  {
    field: 'deptId',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
      onChange: async (e : any) => {
        console.log(e)
        // const tmp = await getPostByDept(e);
        // console.log('------------')
        // console.log(tmp.list)
        // postList = tmp.list
      },
    },
    required: true,
  },
  {
    field: 'postId',
    label: '岗位',
    component: 'ApiSelect',
    required: true,
    // componentProps: {
    // api: getPostByDept,
    // api: async () => {
    //   const tmp = await getPostByDept(deptId);
    //   return tmp.list;
    // },
    //   options: postList
    // },
    componentProps: ({ schema, formModel }) => {
      // console.log('form:', schema);
      // console.log('formModel:', formModel);
      return {
        api: async () => {
          // formModel.postName = ''
          const tmp = await getPostByDept(formModel.deptId)
          return tmp
        },
        labelField: 'postName',
        valueField: 'id',
      }
    },
    // labelField: 'postName',
    // valueField: 'id',
    // componentProps: ({ model }) => {
    //   console.log('-----------')
    //   console.log(model)
    // },
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '停用', value: 1 },
      ],
    },
    required: true,
  },
  {
    field: 'postConnId',
    label: '用户岗位关联ID',
    component: 'Input',
    // ifShow: false,
    show: false,
  },
];


export const grantFormSchema : FormSchema[] = [
  {
    field: 'id',
    label: '员工编号',
    dynamicDisabled: true,
    component: 'Input',
    required: true,
  },
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    required: true,
    dynamicDisabled: true,
  },
  // {
  //   field: 'roleId',
  //   label: '绑定角色',
  //   component: 'ApiSelect',
  //   required: true,
  //   componentProps: {
  //     api: async () => {
  //       const tmp = await getRoleList()
  //       console.log(tmp)
  //       return tmp.filter(item => item.id != 1)
  //     },
  //     labelField: 'sysRoleName',
  //     valueField: 'id',
  //   },
  // },
  {
    label: '',
    field: 'id',
    slot: 'role',
    component: 'Input',
  },
];
