<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增角色 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:branches-outlined',
                onClick: handleGrant.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <RoleDrawer @register="registerDrawer" @success="handleSuccess" />
    <RoleModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { getRoleList, deleteRole } from '/@/api/system/role';
  import { columns, searchFormSchema } from './role.data';
  import { toTreeData } from '@/utils/common';
  import { useModal } from '/@/components/Modal';
  import RoleDrawer from './RoleDrawer.vue';
  import RoleModal from './RoleModal.vue';

  export default defineComponent({
    name: 'RoleManagement',
    components: { TableAction, BasicTable, RoleDrawer, RoleModal },
    setup() {
      const [registerModal, { openModal }] = useModal();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '角色列表',
        api: async (p) => {
          return toTreeData((await getRoleList(p)).filter((item) => item.id !== '1'));
        },
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        isTreeTable: true,
        useSearchForm: true,
        showTableSetting: true,
        pagination: false,
        bordered: true,
        showIndexColumn: false,
        canResize: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      function handleCreate() {
        openDrawer(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }
      
      function handleGrant(record: Recordable) {
        openModal(true, {
          record
        });
      }

      function handleDelete(record: Recordable) {
        deleteRole(record.id).then(() => {
          reload()
        })
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerModal,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleGrant,
        handleDelete,
        handleSuccess,
      };
    },
  });
</script>

<style></style>
