import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { toTreeData, toApiTreeSelect } from '@/utils/common';
  import { getDeptList } from '@/api/system/dept';
  
export const columns: BasicColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 160,
    // align: 'left',
    ifShow: false
  },
  {
    title: '部门名称',
    dataIndex: 'deptName',
    width: 150,
    fixed: 'left'
  },
  {
    title: '负责人',
    dataIndex: 'leader',
    width: 150,
  },
  {
    title: '部门电话',
    dataIndex: 'phone',
    width: 150,
  },
  {
    title: '部门邮箱',
    dataIndex: 'email',
    width: 150,
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
    key: 'status',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 150,
  },
  {
    title: '排序',
    width: 150,
    dataIndex: 'orderNum',
    key: 'orderNum',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '部门名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '停用', value: 1 },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    dynamicDisabled: true,
    ifShow: ({ values }) => {
      // return !(typeof values.id === 'undefined' || values.id === null);
      return ~~values.id > 0
    },
  },
  {
    field: 'deptName',
    label: '部门名称',
    component: 'Input',
    required: true,
  },
  // {
  //   field: 'parentId',
  //   label: '上级菜单',
  //   component: 'TreeSelect',
  //   componentProps: {
  //     fieldNames: {
  //       label: 'deptName',
  //       key: 'id',
  //       value: 'id',
  //     },
  //     getPopupContainer: () => document.body,
  //   },
  //   required: true,
  // },
  {
    field: 'parentId',
    label: '上级部门',
    component: 'ApiTreeSelect',
    componentProps: {
      api: async () => {
        const temp = toTreeData(((await getDeptList()).list))
        toApiTreeSelect(temp, 'dept');
        return temp
      },
    },
    required: true,
  },

  {
    field: 'leader',
    label: '负责人',
    component: 'Input',
    required: true,
  },
  {
    field: 'phone',
    label: '部门电话',
    component: 'InputNumber',
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
    field: 'email',
    label: '邮箱',
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
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '停用', value: 1 },
      ],
    },
    required: true,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    field: 'orderNum',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
];
