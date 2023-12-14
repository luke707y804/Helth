import { EventBus } from 'quasar'
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  const bus = new EventBus<{
    'test': (arg1: number) => void;
}>()

  app.config.globalProperties.$bus = bus

})
