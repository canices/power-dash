<template>
  <div>
    <BasicTable @register="registerTable">
    </BasicTable>
  </div>
  
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { BasicTable, useTable } from '/@/components/Table';
import { getLoginLogList } from '@/api/system/log';
import { loginLogColumns, loginSearchFormSchema } from './log.data'

export default defineComponent({
  components: { BasicTable },

  setup() {;
    const [registerTable, { reload }] = useTable({
      title: '登陆日志查询',
      api: async (p) => {
        const tmp = await getLoginLogList(p);
        return tmp;
      },
      columns: loginLogColumns,
      pagination: { pageSize: 10 },
      formConfig: {
        labelWidth: 120,
        schemas: loginSearchFormSchema,
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
