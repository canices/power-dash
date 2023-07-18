import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns = [
  {
    title: '岗位编号',
    dataIndex: 'id',
    fixed: 'left',
    // width: 200,
  },
  {
    title: '岗位名称',
    dataIndex: 'postName',
    // width: 150,
  },
  {
    title: '岗位代码',
    dataIndex: 'postCode',
    // width: 150,
  },
  {
    title: '状态',
    // width: 150,
    dataIndex: 'status',
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable ? '启用' : '停用';
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '排序',
    dataIndex: 'orderNum',
    // width: 50,
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
  {
    title: '操作',
    width: 120,
    key: 'action',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '岗位编号',
    component: 'InputNumber',
    colProps: { span: 4 },
  },
  {
    field: 'postName',
    label: '岗位名称',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'postCode',
    label: '岗位代码',
    component: 'Input',
    colProps: { span: 4 },
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
    colProps: { span: 4 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '岗位编号',
    component: 'Input',
    dynamicDisabled: true,
    ifShow: ({ values }) => {
      return ~~values.id > 0
    },
  },
  {
    field: 'deptId',
    label: '所在部门',
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
    label: '岗位名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'postCode',
    label: '岗位代码',
    // dynamicDisabled: true,
    component: 'Input',
    required: true,
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
    field: 'orderNum',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
  },
];
