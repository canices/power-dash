<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增员工</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="[
              {
                icon: 'ant-design:contacts-outlined',
                tooltip: '用户绑定角色',
                onClick: handleGrant.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑用户资料',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除此账号',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]" />
        </template>
      </template>
    </BasicTable>
    <UserModal @register="registerModal" @success="handleSuccess" />
    <UserDrawer @register="registerDrawer" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';

import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { getUserList, deleteUser } from '/@/api/system/user';
import { PageWrapper } from '/@/components/Page';
import DeptTree from './DeptTree.vue';

import { useModal } from '/@/components/Modal';
import UserModal from './UserModal.vue';
import { useDrawer } from '/@/components/Drawer';
import UserDrawer from './UserDrawer.vue';
import { columns, searchFormSchema } from './user.data';

export default defineComponent({
  name: '用户管理',
  components: { BasicTable, PageWrapper, DeptTree, UserModal, TableAction, UserDrawer },
  setup() {
    const [registerModal, { openModal }] = useModal();
    const [registerDrawer, { openDrawer }] = useDrawer();
    const searchInfo = reactive<Recordable>({});
    const [registerTable, { reload, updateTableDataRecord }] = useTable({
      title: '账号列表',
      api: getUserList,
      // api: async (p: number) => {
      //   const tmp = await getUserList(p);
      //   return tmp
      // },
      columns,
      pagination: { pageSize: 10 },
      showIndexColumn: false,
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
        autoSubmitOnEnter: true,
      },
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      actionColumn: {
        width: 120,
        title: '操作',
        dataIndex: 'action',
        // slots: { customRender: 'action' },
      },
    });

    function handleCreate() {
      openModal(true, {
        isUpdate: false,
      });
    }

    function handleEdit(record : Recordable) {
      console.log(record);
      openModal(true, {
        record,
        isUpdate: true,
      });
    }

    function handleDelete(record : Recordable) {
      deleteUser(record.id).then(() => {
        reload();
      });
    }

    function handleSuccess() {
      reload();
    }

    function handleSelect(deptId = 0) {
      searchInfo.deptId = deptId;
      reload();
    }

    function handleGrant(record : Recordable) {
      openDrawer(true, {
        record
      });
    }

    return {
      registerTable,
      registerModal,
      registerDrawer,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      handleSelect,
      handleGrant,
      searchInfo,
    };
  },
});
</script>
