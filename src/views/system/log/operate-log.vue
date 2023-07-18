<template>
  <div>
    <BasicTable @register="registerTable">
    </BasicTable>
  </div>
  
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { BasicTable, useTable } from '/@/components/Table';
import { getOperateLogList } from '@/api/system/log';
import { operateLogColumns, operateSearchFormSchema } from './log.data'

export default defineComponent({
  components: { BasicTable },

  setup() {;
    const [registerTable, { reload }] = useTable({
      title: '操作日志查询',
      api: async (p) => {
        const tmp = await getOperateLogList(p);
        return tmp;
      },
      columns: operateLogColumns,
      pagination: { pageSize: 10 },
      formConfig: {
        labelWidth: 120,
        schemas: operateSearchFormSchema,
      },
      showIndexColumn: false,
      striped: true,
      useSearchForm: true,
      bordered: true,
      canResize: false,
    });

    return {
      registerTable
    };
  },
});
</script>
