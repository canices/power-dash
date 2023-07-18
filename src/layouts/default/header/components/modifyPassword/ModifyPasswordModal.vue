<template>
  <BasicModal :footer="null" :title="t('layout.header.modifyPassword')" v-bind="$attrs" :class="prefixCls"
    @register="register">
    <div>
      <BasicForm @register="registerForm" />
      <div :class="`${prefixCls}__footer`">
        <a-button type="primary" block class="mt-2" @click="handleModifyPassword">
          {{ t('layout.header.confirmButton') }}
        </a-button>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';
import { useDesign } from '/@/hooks/web/useDesign';
import { BasicModal, useModalInner } from '/@/components/Modal/index';
import { BasicForm, useForm } from '/@/components/Form/index';
import { useUserStore } from '/@/store/modules/user';
import headerImg from '/@/assets/images/header.jpg';
import { modifyPassword } from '@/api/system/user';
import { message } from 'ant-design-vue';

export default defineComponent({
  name: 'ModifyPasswordModal',
  components: { BasicModal, BasicForm },

  setup() {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[a-zA-Z\d!@#$%^&*.]{8,16}$/;
    const { t } = useI18n();
    const { prefixCls } = useDesign('header-lock-modal');
    const userStore = useUserStore();

    const getRealName = computed(() => userStore.getUserInfo?.realName);
    const [register, { closeModal }] = useModalInner();

    const [registerForm, { validateFields, resetFields }] = useForm({
      showActionButtonGroup: false,
      schemas: [
        {
          field: 'oldPassword',
          label: t('layout.header.currentPassword') + '：',
          colProps: {
            span: 24,
          },
          component: 'InputPassword',
          required: true,
        },
        {
          field: 'newPassword',
          label: t('layout.header.newPassword') + '：' + '\u2000\u2000',
          colProps: {
            span: 24,
          },
          component: 'StrengthMeter',
          required: true,
        },
        {
          field: 'rePassword',
          label: t('layout.header.confirmPassword') + '：',
          colProps: {
            span: 24,
          },
          component: 'InputPassword',
          required: true,
        },
      ],
    });

    async function handleModifyPassword() {
      const values = (await validateFields()) as any;
      const params = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        rePassword: values.rePassword
      }
      // validate
      if (params.newPassword !== params.rePassword) {
        message.error('两次密码输入不一致！')
      } else if ((!(passwordRegex.test(params.oldPassword))) || (!(passwordRegex.test(params.newPassword))) || (!(passwordRegex.test(params.rePassword)))) {
        message.error('密码必须为8-16个字符，且是字母（大+小写）+数字+特殊符号(例如!@#)的组合')
      } else {
        await modifyPassword(params)
        closeModal();
        await resetFields();
      }
    }

    const avatar = computed(() => {
      const { avatar } = userStore.getUserInfo;
      return avatar || headerImg;
    });

    return {
      t,
      prefixCls,
      getRealName,
      register,
      registerForm,
      handleModifyPassword,
      avatar,
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-header-lock-modal';

.@{prefix-cls} {
  &__entry {
    position: relative;
    //height: 240px;
    padding: 130px 30px 30px;
    border-radius: 10px;
  }

  &__header {
    position: absolute;
    top: 0;
    left: calc(50% - 45px);
    width: auto;
    text-align: center;

    &-img {
      width: 70px;
      border-radius: 50%;
    }

    &-name {
      margin-top: 5px;
    }
  }

  &__footer {
    text-align: center;
  }
}
</style>
