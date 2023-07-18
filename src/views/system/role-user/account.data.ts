import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { toTreeData } from '@/utils/common'

export const columns: BasicColumn[] = [
  {
    title: '员工编号',
    dataIndex: 'userId',
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

export const searchFormSchema: FormSchema[] = [
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

export const accountFormSchema: FormSchema[] = [
  {
    field: 'userId',
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
    component: 'InputNumber',
    required: true,
  },
  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
  },
  {
    field: 'deptName',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'postName',
    label: '岗位',
    component: 'Input',
    required: true,
  },
];
