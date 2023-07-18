<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './dept.data';
  import { toTreeData } from '@/utils/common';
  // import { getDeptList } from '/@/api/demo/system';
  import { getDeptList, increaseDept, modifyDept } from '@/api/system/dept';

  export default defineComponent({
    name: 'DeptModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        baseColProps: { span: 24 },
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
        // const treeData = await getDeptList();
        // const treeData = toTreeData((await getDeptList()).list);
        // updateSchema({
        //   field: 'parentId',
        //   componentProps: { treeData },
        // });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增部门' : '编辑部门'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          console.log('type is');
          console.log(!unref(isUpdate));
          // 新增
          if(!unref(isUpdate)) {
            increaseDept(values).then((res) => {
              console.log('increase backend response:');
              console.log(res);
              closeModal();
              emit('success');
            })
          } else {
            modifyDept(values).then((res) => {
              console.log('modify backend response:');
              console.log(res);
              closeModal();
              emit('success');
            });
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
