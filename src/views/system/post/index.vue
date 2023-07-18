<template>
  <div>
    <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
      <DeptTree class="w-1/4 xl:w-1/5" @select="handleSelect" />
    <BasicTable @register="registerTable" class="w-3/4 xl:w-4/5"  :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增岗位 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction :actions="[
                {
                  icon: 'clarity:note-edit-line',
                  tooltip: '编辑岗位信息',
                  onClick: handleEdit.bind(null, record),
                },
                {
                  icon: 'ant-design:delete-outlined',
                  tooltip: '删除岗位',
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
    <PostModal @register="registerModal" @success="handleSuccess" />
    </PageWrapper>
  </div>
  
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { BasicTable, useTable, TableAction } from '/@/components/Table';
import { PageWrapper } from '/@/components/Page';
import PostModal from './PostModal.vue';
import { getPostList, deletePost } from '@/api/system/post';
import { columns, searchFormSchema } from './post.data'
import { useModal } from '/@/components/Modal';
import DeptTree from './DeptTree.vue';

export default defineComponent({
  components: { BasicTable, PostModal, TableAction, DeptTree, PageWrapper },

  setup() {
    const searchInfo = reactive<Recordable>({});
    const [registerModal, { openModal }] = useModal();
    const [registerTable, { reload }] = useTable({
      title: '岗位管理',
      api: getPostList,
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
      deletePost(record.id).then(() => {
        reload();
      });
    }

    function handleSuccess() {
      reload();
    }
    
    function handleSelect(deptId) {
      searchInfo.deptId = deptId;
      reload();
    }

    return {
      registerTable,
      registerModal,
      handleCreate,
      handleEdit,
      handleDelete,
      handleSuccess,
      handleSelect,
      searchInfo,
    };
  },
});
</script>
