import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    fixed: 'left',
    width: 200,
  },
  {
    title: '参数名称',
    dataIndex: 'sysParamName',
    width: 150,
  },
  {
    title: '参数代码',
    dataIndex: 'sysParamCode',
  },
  {
    title: '参数值',
    dataIndex: 'sysParamValue',
    width: 150,
  },
  {
    title: '参数默认值',
    width: 150,
    dataIndex: 'sysParamDefault',
  },
  {
    title: '参数描述',
    width: 150,
    dataIndex: 'sysParamDes',
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
    field: 'sysParamName',
    label: '参数名称',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'sysParamCode',
    label: '参数代码',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'sysParamValue',
    label: '参数值',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'sysParamDes',
    label: '参数描述',
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
    field: 'sysParamName',
    label: '参数名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'sysParamCode',
    label: '参数代码',
    component: 'Input',
    required: true,
  },
  {
    field: 'sysParamValue',
    label: '参数值',
    component: 'Input',
    required: true,
  },
  {
    field: 'sysParamDefault',
    label: '参数默认值',
    component: 'Input',
    required: true,
  },
  {
    field: 'sysParamDes',
    label: '参数描述',
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
];
