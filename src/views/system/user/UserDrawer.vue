<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" showFooter :title="title" width="50%" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #role="{ model, field }">
        <BasicTree v-model:checkedKeys="roleCurrentAuthTree" :treeData="treeData" clickRowToExpand
          :fieldNames="{ title: 'sysRoleName', key: 'id' }" checkable toolbar title="角色绑定"
          ref="treeRef" />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
import { defineComponent, ref, unref } from 'vue';
import { BasicForm, useForm } from '/@/components/Form/index';
import { grantFormSchema } from './user.data';
import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
import { toTreeData, findSimilarParts, filterParentNodes } from '@/utils/common';
import { getAllMenuList, modifyMenu } from '/@/api/system/menu';
import { getRoleList, AssociationRole, getRoleListByUserId } from '/@/api/system/role';
import { BasicTree, TreeActionType, TreeItem } from '/@/components/Tree/index';
import { useMessage } from '/@/hooks/web/useMessage';

export default defineComponent({
  name: 'UserDrawer',
  components: { BasicDrawer, BasicForm, BasicTree },
  emits: ['success', 'register'],
  setup(_, { emit }) {

    const treeRef = ref<Nullable<TreeActionType>>(null);


    const { notification } = useMessage();

    // 授权菜单树
    const treeData = ref<TreeItem[]>([]);
    // 角色当前权限树
    const roleCurrentAuthTree = ref<string[]>([])
    // 临时存放当前用户能够赋权的角色列表
    const tempCurrentRoleList = ref<string[]>([])
    // 临时存放处理过后的返回数据
    // const tempRequestData = ref<string[]>([])

    const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
      labelWidth: 100,
      schemas: grantFormSchema,
      showActionButtonGroup: false,
      baseColProps: { lg: 12, md: 24 },
    });

    const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
      resetFields();
      setDrawerProps({ confirmLoading: false });
      const roleAuthList = (await getRoleListByUserId(data.record.id)) as any as TreeItem[];
      treeData.value = toTreeData(roleAuthList.parent.filter(item => item.id !== '1'))
      roleCurrentAuthTree.value = []
      roleAuthList.child.map(item => {
        roleCurrentAuthTree.value.push(item.id)
      })

      tempCurrentRoleList.value = roleAuthList.parent


      setFieldsValue({
        ...data.record,
      });
      // const userRoleData = await getRoleAuthList(data.record.userId);
      // console.log(userRoleData)
      // const tmp = userRoleData.child
      // console.log(tmp)
      // updateSchema({
      //   field: 'userRole',
      //   componentProps: { tmp },
      // });
    });

    // 勾选时处理请求数据
    // const check = (checkedKeys, e) => {
    //   console.log('----------=======')
    //   console.log(checkedKeys)
    //   console.log('------------------')
    //   console.log(e)
    //   tempRequestData.value = filterParentNodes(tempCurrentRoleList.value, checkedKeys)
    // };

    const title = '员工-角色绑定'

    function getTree() {
      const tree = unref(treeRef);
      if (!tree) {
        throw new Error('tree is null!');
      }
      return tree;
    }

    async function handleSubmit() {
      try {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });
        // TODO custom api
        console.log('values is');
        console.log(values);
        
        // if no roleData
        if (getTree().getCheckedKeys().length === 0) {
          notification.warning({
            message: '警告',
            description: '操作错误，用户绑定的角色数量不能为0（至少要有1个）！',
          });
          return
        }
        const tempRequestData = filterParentNodes(tempCurrentRoleList.value, getTree().getCheckedKeys())
        const params = []
        
        tempRequestData.forEach(item => {
          params.push({
            userId: values.id,
            roleId: item,
          })
        })
        
        AssociationRole(params).then(() => {
          closeDrawer();
          emit('success');
        });
      } finally {
        setDrawerProps({ confirmLoading: false });
      }
    }

    return {
      registerDrawer,
      registerForm,
      title,
      handleSubmit,
      treeData,
      roleCurrentAuthTree,
      treeRef,
    };
  },
});
</script>
