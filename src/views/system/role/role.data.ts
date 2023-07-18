import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import Icon from '@/components/Icon/Icon.vue';
import { Tag } from 'ant-design-vue';
import { getRoleList, modifyRole, } from '/@/api/system/role';
import { toTreeData, toApiTreeSelect } from '@/utils/common';

export const columns : BasicColumn[] = [
  // {
  //   title: '角色id',
  //   dataIndex: 'id',
  //   width: 200,
  // },
  {
    title: '角色名称',
    dataIndex: 'sysRoleName',
    width: 200,
  },
  {
    title: '角色描述',
    dataIndex: 'sysRoleDesc',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
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
    field: 'sysRoleName',
    label: '角色名称',
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

export const formSchema : FormSchema[] = [
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
    field: 'sysRoleName',
    label: '角色名称',
    component: 'Input',
    required: true,
  },

  {
    field: 'parentId',
    label: '上级角色',
    component: 'ApiTreeSelect',
    componentProps: {
      api: async () => {
        const temp = toTreeData((await getRoleList()))
        toApiTreeSelect(temp)
        return temp
      },
    },
    required: true,
  },

  {
    field: 'sysRoleDesc',
    label: '角色描述',
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
        { label: '禁用', value: 1 },
      ],
    },
  },

];

export const grantFormSchema : FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    field: 'sysRoleName',
    label: '角色名称',
    component: 'Input',
    dynamicDisabled: true,
  },
  {
    label: ' ',
    field: 'menuId',
    slot: 'menu',
    component: 'Input',
  },

];
