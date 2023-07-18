<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="modelTitle" @ok="handleSubmit">
    <!-- <BasicForm @register="registerForm" /> -->
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:checkedKeys="roleCurrentAuthTree"
          :treeData="treeData"
          :fieldNames="{ title: 'sysMenuName', key: 'menuId' }"
          checkable
          @check="check"
          toolbar
          title="权限分配"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { grantFormSchema } from './role.data';
  import { getRoleList, getRoleAuthList, grantPermission } from '/@/api/system/role';
  import { BasicTree, TreeActionType, TreeItem } from '/@/components/Tree/index';
  import { toTreeData } from '@/utils/common';

  export default defineComponent({
    name: 'RoleModal',
    components: { BasicModal, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const submitData = ref<string[]>([]); //半选状态
      const roleCurrentAuthList = ref<string[]>([]);
      // 授权菜单树
      const treeData = ref<TreeItem[]>([]);
      // 角色当前权限树
      const roleCurrentAuthTree = ref<string[]>([]);
      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: grantFormSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });

        const roleAuthList = (await getRoleAuthList(data.record.id)) as any as TreeItem[];
        treeData.value = toTreeData(roleAuthList.parent);
        submitData.value = [];
        roleCurrentAuthTree.value = [];
        roleAuthList.child.map((item) => {
          // 过滤节点半选的情况，防止数据全部渲染
          if (item.sysMenuType !== 0 || item.sysMenuType !== 1) {
            roleCurrentAuthTree.value.push(item.menuId);
          }
        });

        setFieldsValue({
          ...data.record,
        });
      });

      // 勾选时将半选节点存储
      const check = (checkedKeys, e) => {
        submitData.value = e.halfCheckedKeys;
      };

      // const treeRef = toTreeData((await getMenuById()));
      const modelTitle = '角色授权';

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          const params = [];
          submitData.value = [...submitData.value, ...roleCurrentAuthTree.value];
          submitData.value.map((item) => {
            params.push({
              roleId: values.id,
              roleMenuType: 1,
              menuId: item,
            });
          });
          // if no permission
          if (submitData.value.length === 0) {
            params.push({
              roleId: values.id,
              roleMenuType: 1,
            });
          }
          // 角色授权
          await grantPermission(params);
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        check,
        registerModal,
        registerForm,
        modelTitle,
        handleSubmit,
        treeData,
        roleCurrentAuthList,
        roleCurrentAuthTree,
      };
    },
  });
</script>
