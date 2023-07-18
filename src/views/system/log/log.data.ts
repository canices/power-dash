import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';

export const loginLogColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    fixed: 'left',
    width: 50,
  },
  {
    title: '用户ID',
    dataIndex: 'userId',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '登录时间',
    dataIndex: 'loginTime',
  },
  {
    title: '登出时间',
    dataIndex: 'logoutTime',
  },
  {
    title: 'IP地址',
    dataIndex: 'ipAddress',
    width: 150,
  },
  {
    title: '登录结果',
    dataIndex: 'loginResult',
    width: 150,
  },
];

export const operateLogColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    fixed: 'left',
    width: 50,
  },
  {
    title: '用户ID',
    dataIndex: 'userId',
  },
  {
    title: '用户名',
    dataIndex: 'username',
  },
  {
    title: '模块标题',
    dataIndex: 'title',
  },
  {
    title: '业务类型',
    dataIndex: 'businessType',
  },
  {
    title: '方法名称',
    dataIndex: 'method',
  },
  {
    title: '请求方式',
    dataIndex: 'requestMethod',
  },
  {
    title: '请求URL',
    dataIndex: 'operUrl',
  },
  {
    title: '主机地址',
    dataIndex: 'operIp',
  },
  {
    title: '操作时间',
    dataIndex: 'operTime',
  },
];

export const loginSearchFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'InputNumber',
    colProps: { span: 4 },
  },
  {
    field: 'userId',
    label: '用户ID',
    component: 'InputNumber',
    colProps: { span: 4 },
  },
  {
    field: 'userName',
    label: '用户名',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'loginTime',
    label: '登录时间',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'logoutTIme',
    label: '登出时间',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'ipAddress',
    label: 'IP地址',
    component: 'Input',
    colProps: { span: 4 },
  }
];

export const operateSearchFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'InputNumber',
    colProps: { span: 4 },
  },
  {
    field: 'userId',
    label: '用户ID',
    component: 'InputNumber',
    colProps: { span: 4 },
  },
  {
    field: 'userName',
    label: '用户名',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'title',
    label: '模块标题',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'businessType',
    label: '业务类型',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'method',
    label: '方法名称',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'requestMethod',
    label: '请求方式',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'operUrl',
    label: '请求URL',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'operIp',
    label: '主机地址',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: 'operTime',
    label: '操作时间',
    component: 'Input',
    colProps: { span: 4 },
  },

];
