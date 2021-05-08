// 防止重复提交指令
export const preventreclick = {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        setTimeout(() => {
          el.disabled = true
        }, 0)
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 3000)
      }
    })
  }
}
