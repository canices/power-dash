import { h } from 'vue';
import Icon from '@/components/Icon/Icon.vue';
import { Tag } from 'ant-design-vue';

export const columns = [
  {
    title: '菜单名称',
    dataIndex: 'sysMenuName',
    width: 200,
    key: 'sysMenuName',
    fixed: 'left',
  },
  {
    title: 'ID',
    dataIndex: 'id',
    // fixed: 'left',
    width: 200,
    key: 'id',
  },
  {
    title: '图标',
    dataIndex: 'sysMenuIcon',
    customRender: ({ record }) => {
      return h(Icon, { icon: record.sysMenuIcon });
    },
    key: 'sysMenuIcon',
  },
  {
    title: '权限标识',
    dataIndex: 'sysMenuCode',
    width: 150,
    key: 'sysMenuCode',
  },
  {
    title: '路由地址',
    dataIndex: 'sysMenuUrl',
    width: 150,
    key: 'sysMenuUrl',
  },
  {
    title: '组件',
    width: 150,
    dataIndex: 'sysMenuComponent',
    key: 'sysMenuComponent',
  },
  {
    title: '排序',
    width: 150,
    dataIndex: 'sysMenuOrder',
    key: 'sysMenuOrder',
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
  // {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     key: 'name',
  //   },
  //   {
  //     title: 'Age',
  //     dataIndex: 'age',
  //     key: 'age',
  //     width: '12%',
  //   },
  //   {
  //     title: 'Address',
  //     dataIndex: 'address',
  //     width: '30%',
  //     key: 'address',
  //   },
]


// export function getAllMenuList() {
//   return defHttp.get({ url: Api.GetAllMenuList });
// }

const isDir = (type : number) => type === 0;
const isMenu = (type : number) => type === 1 || type === 3;
const isButton = (type : number) => type === 2;

export const searchFormSchema : FormSchema[] = [
  {
    field: 'sysMenuName',
    label: '菜单名称',
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

export const formSchema = [
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
    field: 'sysMenuType',
    label: '菜单类型',
    component: 'RadioButtonGroup',
    // defaultValue: 0,
    componentProps: {
      options: [
        { label: '目录', value: 0 },
        { label: '菜单', value: 1 },
        { label: '按钮', value: 2 },
        // { label: '外链（内嵌）', value: 3 },
        { label: '外链', value: 4 },
      ],
    },
    colProps: { lg: 24, md: 24 },
    required: true,
  },
  {
    field: 'sysMenuName',
    label: '菜单名称',
    component: 'Input',
    required: true,
  },

  {
    field: 'parentId',
    label: '上级菜单',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'sysMenuName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },

  {
    field: 'sysMenuOrder',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'sysMenuIcon',
    label: '图标',
    component: 'IconPicker',
    required: true,
    ifShow: ({ values }) => !isButton(values.sysMenuType),
  },

  {
    field: 'sysMenuUrl',
    label: '路由地址',
    component: 'Input',
    required: true,
    ifShow: ({ values }) => {
       return (!isButton(values.sysMenuType) && !isDir(values.sysMenuType))
    }
  },
  {
    field: 'sysMenuComponent',
    label: '组件路径',
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.sysMenuType),
    required: true,
  },
  {
    field: 'sysMenuCode',
    label: '权限标识',
    component: 'Input',
    required: true,
    // ifShow: ({ values }) => {
    //   console.log('---------------------')
    //   console.log(values)
    //   return !isDir(values.sysMenuType)
    // }
    // ifShow: ({ values }) => !isDir(values.sysMenuType),
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
  
  // {
  //   field: 'isExt',
  //   label: '是否外链',
  //   component: 'RadioButtonGroup',
  //   defaultValue: '0',
  //   componentProps: {
  //     options: [
  //       { label: '否', value: '0' },
  //       { label: '是', value: '1' },
  //     ],
  //   },
  //   ifShow: ({ values }) => !isButton(values.type),
  // },

  // {
  //   field: 'keepalive',
  //   label: '是否缓存',
  //   component: 'RadioButtonGroup',
  //   defaultValue: '0',
  //   componentProps: {
  //     options: [
  //       { label: '否', value: '0' },
  //       { label: '是', value: '1' },
  //     ],
  //   },
  //   ifShow: ({ values }) => isMenu(values.type),
  // },

  {
    field: 'display',
    label: '是否显示',
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '是', value: 0 },
        { label: '否', value: 1 },
      ],
    },
    ifShow: ({ values }) => !isButton(values.type),
  },
];
