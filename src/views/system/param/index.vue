<template>
  <div>
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button type="primary" @click="handleCreate"> 新增参数 </a-button>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <TableAction :actions="[
                {
                  icon: 'clarity:note-edit-line',
                  onClick: handleEdit.bind(null, record),
                },
                {
                  icon: 'ant-design:delete-outlined',
                  color: 'error',
                  popConfirm: {
                    title: '是否确认删除',
                    confirm: handleDelete.bind(null, record),
                  },
                },
              ]" />
          </template>
        </template>
      </BasicTable>
    <ParamModal @register="registerModal" @success="handleSuccess" />
  </div>

</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import ParamModal from './ParamModal.vue';
import { getParamList, deleteParam } from '@/api/system/param';
import { columns, searchFormSchema } from './param.data'
import { useModal } from '/@/components/Modal';

export default defineComponent({
  components: { BasicTable, ParamModal, TableAction },

  setup() {
    const [registerModal, { openModal }] = useModal();
    const [registerTable, { reload }] = useTable({
      title: '参数管理',
      api: async (p) => {
        const tmp = await getParamList(p);
        return tmp;
      },
      columns,
      pagination: { pageSize: 10 },
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      showIndexColumn: false,
      striped: true,
      useSearchForm: true,
      bordered: true,
      canResize: false,
    });

    function handleCreate() {
      openModal(true, {
        isUpdate: false,
      });
    }

    function handleEdit(record) {
      openModal(true, {
        record,
        isUpdate: true,
      });
    }

    function handleDelete(record) {
      deleteParam(record.id).then((res) => {
        reload();
      });
    }

    function handleSuccess() {
      reload();
    }

    return {
      registerTable,
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
    };
  },
});
</script>
