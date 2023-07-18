import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    fixed: 'left',
    width: 50,
  },
  {
    title: '字典名称',
    dataIndex: 'sysDictName',
    width: 150,
  },
  {
    title: '字典代码',
    dataIndex: 'sysDictCode',
  },
  {
    title: '字典值',
    dataIndex: 'sysDictValue',
  },
  {
    title: '字典显示值',
    dataIndex: 'sysDictDisplayValue',
    width: 150,
  },
  {
    title: '字典是否默认',
    width: 150,
    dataIndex: 'sysDictIsDefault',
  },
  {
    title: '字典描述',
    width: 150,
    dataIndex: 'sysDictDesc',
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
  {
    title: '操作',
    width: 130,
    key: 'action',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'sysDictName',
    label: '字典名称',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'sysDictCode',
    label: '字典代码',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'sysDictValue',
    label: '字典值',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'sysDictIsDefault',
    label: '字典是否默认',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 0 },
        { label: '停用', value: 1 },
      ],
    },
    colProps: { span: 4 },
  },
  {
    field: 'sysDictDes',
    label: '字典描述',
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
    label: 'ID',
    component: 'Input',
    dynamicDisabled: true,
    ifShow: ({ values }) => {
      return ~~values.id > 0
    },
    
  },
  {
    field: 'sysDictName',
    label: '字典名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'sysDictCode',
    label: '字典代码',
    // dynamicDisabled: true,
    dynamicDisabled: ({ values }) => {
      console.log(values.hasOwnProperty('mode'))
      return values.mode === 'edit' ? true : false;
    },
    component: 'Input',
    required: true,
  },
  {
    field: 'sysDictValue',
    label: '字典值',
    component: 'Input',
    required: true,
  },
  {
    field: 'sysDictDisplayValue',
    label: '字典显示值',
    component: 'Input',
    required: true,
  },
  {
    field: 'sysDictIsDefault',
    label: '字典是否默认',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '是', value: 0 },
        { label: '否', value: 1 },
      ],
    },
    required: true,
  },
  {
    field: 'sysDictDesc',
    label: '字典描述',
    component: 'Input',
    required: true,
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
    field: 'mode',
    label: '模式',
    component: 'Input',
    show: false
  },
];
