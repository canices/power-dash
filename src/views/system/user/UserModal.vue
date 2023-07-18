<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, ref, computed, unref } from 'vue';
import { BasicModal, useModalInner } from '/@/components/Modal';
import { BasicForm, useForm } from '/@/components/Form/index';
import { userFormSchema } from './user.data';
import { increaseUser, modifyUser, } from '/@/api/system/user';
import { getDeptList } from '@/api/system/dept'
import { toTreeData } from '@/utils/common'

export default defineComponent({
  name: 'UserModal',
  components: { BasicModal, BasicForm },
  emits: ['success', 'register'],
  setup(_, { emit }) {
    const isUpdate = ref(true);
    const rowId = ref('');

    const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
      labelWidth: 100,
      baseColProps: { span: 24 },
      schemas: userFormSchema,
      showActionButtonGroup: false,
      actionColOptions: {
        span: 23,
      },
    });

    const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
      resetFields();
      setModalProps({ confirmLoading: false });
      
      
      isUpdate.value = !!data?.isUpdate;

      if (unref(isUpdate)) {
        rowId.value = data.record.id;
        setFieldsValue({
          ...data.record,
        });
      }

      const treeData = toTreeData((await getDeptList()).list);

      updateSchema([
        {
          field: 'deptId',
          componentProps: { treeData },
        },
      ]);
    });

    const getTitle = computed(() => (!unref(isUpdate) ? '新增账号' : '编辑账号'));

    async function handleSubmit() {
      try {
        const values = await validate();
        setModalProps({ confirmLoading: true });
        // TODO custom api
        console.log('values is: ')
        console.log(values);
        if (!unref(isUpdate)) {
          increaseUser(values).then(() => {
            closeModal();
            emit('success');
          })
        } else {
          modifyUser(values).then(() => {
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
