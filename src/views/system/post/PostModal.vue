<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './post.data';
  import { increasePost, modifyPost } from '@/api/system/post';
  import { getDeptList } from '@/api/system/dept';
  import { toTreeData } from '@/utils/common';

  export default defineComponent({
    name: 'PostModal',
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
        
        const treeData = toTreeData((await getDeptList()).list);
        console.log('-----------------')
        console.log(treeData)
        updateSchema({
          field: 'deptId',
          componentProps: { treeData },
        });
        
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增岗位' : '编辑岗位'));

      async function handleSubmit() {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // TODO custom api
          console.log(values);
          // 新增
          if(!unref(isUpdate)) {
            increasePost(values).then(() => {
              closeModal();
              emit('success');
            })
          } else {
            modifyPost(values).then(() => {
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
